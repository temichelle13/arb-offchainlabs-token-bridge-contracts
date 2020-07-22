package test

import (
	"context"
	"crypto/ecdsa"
	"errors"
	"fmt"
	"log"
	"math/big"
	"math/rand"
	"net"
	"os"
	"testing"
	"time"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/core/types"

	goarbitrum "github.com/offchainlabs/arbitrum/packages/arb-provider-go"
	"github.com/offchainlabs/arbitrum/packages/arb-tx-aggregator/aggregator"
	"github.com/offchainlabs/arbitrum/packages/arb-util/arbos"
	"github.com/offchainlabs/arbitrum/packages/arb-util/common"
	"github.com/offchainlabs/arbitrum/packages/arb-validator-core/arbbridge"
	"github.com/offchainlabs/arbitrum/packages/arb-validator-core/ethbridge"
	"github.com/offchainlabs/arbitrum/packages/arb-validator-core/ethutils"
	"github.com/offchainlabs/arbitrum/packages/arb-validator-core/test"
	"github.com/offchainlabs/arbitrum/packages/arb-validator-core/utils"
	"github.com/offchainlabs/arbitrum/packages/arb-validator-core/valprotocol"
	"github.com/offchainlabs/arbitrum/packages/arb-validator/chainlistener"
	"github.com/offchainlabs/arbitrum/packages/arb-validator/loader"
	"github.com/offchainlabs/arbitrum/packages/arb-validator/rollupmanager"
)

var db = "./testman"
var contract = arbos.Path()

/********************************************/
/*    Validators                            */
/********************************************/
func setupValidators(
	client ethutils.EthClient,
	pks []*ecdsa.PrivateKey,
) (common.Address, []arbbridge.ArbAuthClient, error) {
	if len(pks) < 1 {
		panic("must have at least 1 pks")
	}
	seed := time.Now().UnixNano()
	// seed := int64(1559616168133477000)
	rand.Seed(seed)

	clients := make([]arbbridge.ArbAuthClient, 0, len(pks))
	var auth *bind.TransactOpts
	for i, pk := range pks {
		if i == 0 {
			auth = bind.NewKeyedTransactor(pk)
		}
		clients = append(clients, ethbridge.NewEthAuthClient(client, bind.NewKeyedTransactor(pk)))
	}

	ctx := context.Background()

	rollupAddress, err := func() (common.Address, error) {
		config := valprotocol.ChainParams{
			StakeRequirement:        big.NewInt(10),
			GracePeriod:             common.TimeTicks{Val: big.NewInt(13000 * 2)},
			MaxExecutionSteps:       10000000000,
			ArbGasSpeedLimitPerTick: 200000,
		}

		factoryAddr, err := ethbridge.DeployRollupFactory(auth, client)
		if err != nil {
			return common.Address{}, err
		}

		factory, err := clients[0].NewArbFactory(common.NewAddressFromEth(factoryAddr))
		if err != nil {
			return common.Address{}, err
		}

		mach, err := loader.LoadMachineFromFile(contract, false, "cpp")
		if err != nil {
			return common.Address{}, err
		}

		rollupAddress, _, err := factory.CreateRollup(
			ctx,
			mach.Hash(),
			config,
			clients[0].Address(),
		)
		return rollupAddress, err
	}()
	if err != nil {
		return common.Address{}, nil, err
	}

	managers := make([]*rollupmanager.Manager, 0, len(clients))
	for _, client := range clients[1:] {
		rollupActor, err := client.NewRollup(rollupAddress)
		if err != nil {
			return common.Address{}, nil, err
		}

		dbName := db + client.Address().String()

		if err := os.RemoveAll(dbName); err != nil {
			log.Fatal(err)
		}

		manager, err := rollupmanager.CreateManager(
			ctx,
			rollupAddress,
			rollupmanager.NewStressTestClient(client, time.Second*15),
			contract,
			dbName,
		)
		if err != nil {
			return common.Address{}, nil, err
		}

		manager.AddListener(&chainlistener.AnnouncerListener{Prefix: "validator " + client.Address().String() + ": "})

		validatorListener := chainlistener.NewValidatorChainListener(
			context.Background(),
			rollupAddress,
			rollupActor,
		)
		err = validatorListener.AddStaker(client)
		if err != nil {
			return common.Address{}, nil, err
		}
		manager.AddListener(validatorListener)
		managers = append(managers, manager)
	}

	return rollupAddress, clients, nil
}

func launchAggregator(client arbbridge.ArbAuthClient, rollupAddress common.Address) error {
	go func() {
		if err := aggregator.LaunchAggregator(
			context.Background(),
			client,
			rollupAddress,
			contract,
			db+client.Address().String(),
			"1235",
			utils.RPCFlags{},
		); err != nil {
			log.Fatal(err)
		}
	}()

	ticker := time.NewTicker(time.Second)
waitloop:
	for {
		select {
		case <-ticker.C:
			conn, err := net.DialTimeout(
				"tcp",
				net.JoinHostPort("127.0.0.1", "1235"),
				time.Second,
			)
			if err != nil || conn == nil {
				continue
			}
			if err := conn.Close(); err != nil {
				return err
			}
			// Wait for the validator to catch up to head
			time.Sleep(time.Second * 2)
			break waitloop
		case <-time.After(time.Second * 5):
			return errors.New("couldn't connect to rpc")
		}
	}
	return nil
}

type ListenerError struct {
	ListenerName string
	Err          error
}

func startFibTestEventListener(
	fibonacci *Fibonacci,
	ch chan interface{},
	t *testing.T,
) {
	go func() {
		evCh := make(chan *FibonacciTestEvent, 2)
		start := uint64(0)
		watch := &bind.WatchOpts{
			Context: context.Background(),
			Start:   &start,
		}
		sub, err := fibonacci.WatchTestEvent(watch, evCh)
		if err != nil {
			t.Errorf("WatchTestEvent error %v", err)
			return
		}
		defer sub.Unsubscribe()
		errChan := sub.Err()
		for {
			select {
			case ev, ok := <-evCh:
				if ok {
					ch <- ev
				} else {
					ch <- &ListenerError{
						"FibonacciTestEvent ",
						errors.New("channel closed"),
					}
					return
				}
			case err, ok := <-errChan:
				if ok {
					ch <- &ListenerError{
						"FibonacciTestEvent error:",
						err,
					}
				} else {
					ch <- &ListenerError{
						"FibonacciTestEvent ",
						errors.New("error channel closed"),
					}
					return
				}
			}
		}
	}()
}

func waitForReceipt(
	client *goarbitrum.ArbConnection,
	tx *types.Transaction,
	timeout time.Duration,
) (*types.Receipt, error) {
	ticker := time.NewTicker(timeout)
	for {
		select {
		case <-ticker.C:
			return nil, fmt.Errorf("timed out waiting for receipt for tx %v", tx.Hash())
		default:
		}
		receipt, err := client.TransactionReceipt(
			context.Background(),
			tx.Hash(),
		)
		if err != nil {
			if err.Error() == "not found" {
				continue
			}
			log.Println("GetMessageResult error:", err)
			return nil, err
		}
		return receipt, nil
	}
}

func TestFib(t *testing.T) {
	client, pks := test.SimulatedBackend()
	go func() {
		t := time.NewTicker(time.Second * 2)
		for range t.C {
			client.Commit()
		}
	}()

	rollupAddress, validatorClients, err := setupValidators(client, pks[2:4])
	if err != nil {
		t.Fatalf("Validator setup error %v", err)
	}

	defer func() {
		for _, client := range validatorClients {
			if err := os.RemoveAll(db + client.Address().String()); err != nil {
				log.Fatal(err)
			}
		}
	}()

	if err := launchAggregator(
		ethbridge.NewEthAuthClient(client, bind.NewKeyedTransactor(pks[1])),
		rollupAddress,
	); err != nil {
		t.Fatal(err)
	}

	pk := pks[0]
	arbclient := goarbitrum.Dial(
		"http://localhost:1235",
		pk,
		rollupAddress,
	)

	auth := bind.NewKeyedTransactor(pk)
	_, tx, _, err := DeployFibonacci(auth, arbclient)
	if err != nil {
		t.Fatal("DeployFibonacci failed", err)
	}

	receipt, err := waitForReceipt(
		arbclient,
		tx,
		time.Second*20,
	)
	if err != nil {
		t.Fatal("DeployFibonacci receipt error", err)
	}
	if receipt.Status != 1 {
		t.Fatal("tx deploying fib failed")
	}

	t.Log("Fib contract is at", receipt.ContractAddress.Hex())

	fib, err := NewFibonacci(receipt.ContractAddress, arbclient)
	if err != nil {
		t.Fatal("connect fib failed", err)
	}

	//Wrap the Token contract instance into a session
	session := &FibonacciSession{
		Contract: fib,
		CallOpts: bind.CallOpts{
			From:    auth.From,
			Pending: true,
		},
		TransactOpts: *auth,
	}

	fibsize := 15
	fibnum := 11

	tx, err = session.GenerateFib(big.NewInt(int64(fibsize)))
	if err != nil {
		t.Fatal("GenerateFib error", err)
	}
	receipt, err = waitForReceipt(
		arbclient,
		tx,
		time.Second*20,
	)
	if err != nil {
		t.Fatal("GenerateFib receipt error", err)
	}
	if receipt.Status != 1 {
		t.Fatal("tx generating numbers failed")
	}

	fibval, err := session.GetFib(big.NewInt(int64(fibnum)))
	if err != nil {
		t.Fatal("GetFib error", err)
	}
	if fibval.Cmp(big.NewInt(144)) != 0 { // 11th fibanocci number
		t.Fatalf(
			"GetFib error - expected %v got %v",
			big.NewInt(int64(144)),
			fibval,
		)
	}

	t.Run("TestEvent", func(t *testing.T) {
		eventChan := make(chan interface{}, 2)
		startFibTestEventListener(session.Contract, eventChan, t)
		testEventRcvd := false

		fibsize := 15
		time.Sleep(5 * time.Second)
		_, err := session.GenerateFib(big.NewInt(int64(fibsize)))
		if err != nil {
			t.Errorf("GenerateFib error %v", err)
			return
		}

	Loop:
		for ev := range eventChan {
			switch event := ev.(type) {
			case *FibonacciTestEvent:
				testEventRcvd = true
				break Loop
			case ListenerError:
				t.Errorf("errorEvent %v %v", event.ListenerName, event.Err)
				break Loop
			default:
				t.Error("eventLoop: unknown event type", ev)
				break Loop
			}
		}
		if testEventRcvd != true {
			t.Error("eventLoop: FibonacciTestEvent not received")
		}
	})
}
