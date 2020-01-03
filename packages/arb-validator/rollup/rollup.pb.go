// Code generated by protoc-gen-go. DO NOT EDIT.
// source: rollup.proto

package rollup

import (
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type ChainBuf struct {
	ContractAddress      string           `protobuf:"bytes,1,opt,name=contractAddress,proto3" json:"contractAddress,omitempty"`
	VmParams             *ChainParamsBuf  `protobuf:"bytes,2,opt,name=vmParams,proto3" json:"vmParams,omitempty"`
	PendingInbox         *PendingInboxBuf `protobuf:"bytes,3,opt,name=pendingInbox,proto3" json:"pendingInbox,omitempty"`
	Nodes                []*NodeBuf       `protobuf:"bytes,4,rep,name=nodes,proto3" json:"nodes,omitempty"`
	LatestConfirmedHash  string           `protobuf:"bytes,5,opt,name=latestConfirmedHash,proto3" json:"latestConfirmedHash,omitempty"`
	LeafHashes           []string         `protobuf:"bytes,6,rep,name=leafHashes,proto3" json:"leafHashes,omitempty"`
	Stakers              []*StakerBuf     `protobuf:"bytes,7,rep,name=stakers,proto3" json:"stakers,omitempty"`
	Challenges           []*ChallengeBuf  `protobuf:"bytes,8,rep,name=challenges,proto3" json:"challenges,omitempty"`
	XXX_NoUnkeyedLiteral struct{}         `json:"-"`
	XXX_unrecognized     []byte           `json:"-"`
	XXX_sizecache        int32            `json:"-"`
}

func (m *ChainBuf) Reset()         { *m = ChainBuf{} }
func (m *ChainBuf) String() string { return proto.CompactTextString(m) }
func (*ChainBuf) ProtoMessage()    {}
func (*ChainBuf) Descriptor() ([]byte, []int) {
	return fileDescriptor_037f188b50610c79, []int{0}
}

func (m *ChainBuf) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ChainBuf.Unmarshal(m, b)
}
func (m *ChainBuf) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ChainBuf.Marshal(b, m, deterministic)
}
func (m *ChainBuf) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ChainBuf.Merge(m, src)
}
func (m *ChainBuf) XXX_Size() int {
	return xxx_messageInfo_ChainBuf.Size(m)
}
func (m *ChainBuf) XXX_DiscardUnknown() {
	xxx_messageInfo_ChainBuf.DiscardUnknown(m)
}

var xxx_messageInfo_ChainBuf proto.InternalMessageInfo

func (m *ChainBuf) GetContractAddress() string {
	if m != nil {
		return m.ContractAddress
	}
	return ""
}

func (m *ChainBuf) GetVmParams() *ChainParamsBuf {
	if m != nil {
		return m.VmParams
	}
	return nil
}

func (m *ChainBuf) GetPendingInbox() *PendingInboxBuf {
	if m != nil {
		return m.PendingInbox
	}
	return nil
}

func (m *ChainBuf) GetNodes() []*NodeBuf {
	if m != nil {
		return m.Nodes
	}
	return nil
}

func (m *ChainBuf) GetLatestConfirmedHash() string {
	if m != nil {
		return m.LatestConfirmedHash
	}
	return ""
}

func (m *ChainBuf) GetLeafHashes() []string {
	if m != nil {
		return m.LeafHashes
	}
	return nil
}

func (m *ChainBuf) GetStakers() []*StakerBuf {
	if m != nil {
		return m.Stakers
	}
	return nil
}

func (m *ChainBuf) GetChallenges() []*ChallengeBuf {
	if m != nil {
		return m.Challenges
	}
	return nil
}

type ChainParamsBuf struct {
	StakeRequirement     string         `protobuf:"bytes,1,opt,name=stakeRequirement,proto3" json:"stakeRequirement,omitempty"`
	GracePeriod          *RollupTimeBuf `protobuf:"bytes,2,opt,name=gracePeriod,proto3" json:"gracePeriod,omitempty"`
	MaxExecutionSteps    uint32         `protobuf:"varint,3,opt,name=maxExecutionSteps,proto3" json:"maxExecutionSteps,omitempty"`
	XXX_NoUnkeyedLiteral struct{}       `json:"-"`
	XXX_unrecognized     []byte         `json:"-"`
	XXX_sizecache        int32          `json:"-"`
}

func (m *ChainParamsBuf) Reset()         { *m = ChainParamsBuf{} }
func (m *ChainParamsBuf) String() string { return proto.CompactTextString(m) }
func (*ChainParamsBuf) ProtoMessage()    {}
func (*ChainParamsBuf) Descriptor() ([]byte, []int) {
	return fileDescriptor_037f188b50610c79, []int{1}
}

func (m *ChainParamsBuf) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ChainParamsBuf.Unmarshal(m, b)
}
func (m *ChainParamsBuf) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ChainParamsBuf.Marshal(b, m, deterministic)
}
func (m *ChainParamsBuf) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ChainParamsBuf.Merge(m, src)
}
func (m *ChainParamsBuf) XXX_Size() int {
	return xxx_messageInfo_ChainParamsBuf.Size(m)
}
func (m *ChainParamsBuf) XXX_DiscardUnknown() {
	xxx_messageInfo_ChainParamsBuf.DiscardUnknown(m)
}

var xxx_messageInfo_ChainParamsBuf proto.InternalMessageInfo

func (m *ChainParamsBuf) GetStakeRequirement() string {
	if m != nil {
		return m.StakeRequirement
	}
	return ""
}

func (m *ChainParamsBuf) GetGracePeriod() *RollupTimeBuf {
	if m != nil {
		return m.GracePeriod
	}
	return nil
}

func (m *ChainParamsBuf) GetMaxExecutionSteps() uint32 {
	if m != nil {
		return m.MaxExecutionSteps
	}
	return 0
}

type NodeBuf struct {
	Hash                 string             `protobuf:"bytes,1,opt,name=hash,proto3" json:"hash,omitempty"`
	DisputableNode       *DisputableNodeBuf `protobuf:"bytes,2,opt,name=disputableNode,proto3" json:"disputableNode,omitempty"`
	MachineHash          string             `protobuf:"bytes,3,opt,name=machineHash,proto3" json:"machineHash,omitempty"`
	PendingTopHash       string             `protobuf:"bytes,4,opt,name=pendingTopHash,proto3" json:"pendingTopHash,omitempty"`
	LinkType             uint32             `protobuf:"varint,5,opt,name=linkType,proto3" json:"linkType,omitempty"`
	PrevHash             string             `protobuf:"bytes,6,opt,name=prevHash,proto3" json:"prevHash,omitempty"`
	XXX_NoUnkeyedLiteral struct{}           `json:"-"`
	XXX_unrecognized     []byte             `json:"-"`
	XXX_sizecache        int32              `json:"-"`
}

func (m *NodeBuf) Reset()         { *m = NodeBuf{} }
func (m *NodeBuf) String() string { return proto.CompactTextString(m) }
func (*NodeBuf) ProtoMessage()    {}
func (*NodeBuf) Descriptor() ([]byte, []int) {
	return fileDescriptor_037f188b50610c79, []int{2}
}

func (m *NodeBuf) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_NodeBuf.Unmarshal(m, b)
}
func (m *NodeBuf) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_NodeBuf.Marshal(b, m, deterministic)
}
func (m *NodeBuf) XXX_Merge(src proto.Message) {
	xxx_messageInfo_NodeBuf.Merge(m, src)
}
func (m *NodeBuf) XXX_Size() int {
	return xxx_messageInfo_NodeBuf.Size(m)
}
func (m *NodeBuf) XXX_DiscardUnknown() {
	xxx_messageInfo_NodeBuf.DiscardUnknown(m)
}

var xxx_messageInfo_NodeBuf proto.InternalMessageInfo

func (m *NodeBuf) GetHash() string {
	if m != nil {
		return m.Hash
	}
	return ""
}

func (m *NodeBuf) GetDisputableNode() *DisputableNodeBuf {
	if m != nil {
		return m.DisputableNode
	}
	return nil
}

func (m *NodeBuf) GetMachineHash() string {
	if m != nil {
		return m.MachineHash
	}
	return ""
}

func (m *NodeBuf) GetPendingTopHash() string {
	if m != nil {
		return m.PendingTopHash
	}
	return ""
}

func (m *NodeBuf) GetLinkType() uint32 {
	if m != nil {
		return m.LinkType
	}
	return 0
}

func (m *NodeBuf) GetPrevHash() string {
	if m != nil {
		return m.PrevHash
	}
	return ""
}

type StakerBuf struct {
	Address              string         `protobuf:"bytes,1,opt,name=address,proto3" json:"address,omitempty"`
	Location             string         `protobuf:"bytes,2,opt,name=location,proto3" json:"location,omitempty"`
	CreationTime         *RollupTimeBuf `protobuf:"bytes,3,opt,name=creationTime,proto3" json:"creationTime,omitempty"`
	ChallengeAddr        string         `protobuf:"bytes,4,opt,name=challengeAddr,proto3" json:"challengeAddr,omitempty"`
	XXX_NoUnkeyedLiteral struct{}       `json:"-"`
	XXX_unrecognized     []byte         `json:"-"`
	XXX_sizecache        int32          `json:"-"`
}

func (m *StakerBuf) Reset()         { *m = StakerBuf{} }
func (m *StakerBuf) String() string { return proto.CompactTextString(m) }
func (*StakerBuf) ProtoMessage()    {}
func (*StakerBuf) Descriptor() ([]byte, []int) {
	return fileDescriptor_037f188b50610c79, []int{3}
}

func (m *StakerBuf) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_StakerBuf.Unmarshal(m, b)
}
func (m *StakerBuf) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_StakerBuf.Marshal(b, m, deterministic)
}
func (m *StakerBuf) XXX_Merge(src proto.Message) {
	xxx_messageInfo_StakerBuf.Merge(m, src)
}
func (m *StakerBuf) XXX_Size() int {
	return xxx_messageInfo_StakerBuf.Size(m)
}
func (m *StakerBuf) XXX_DiscardUnknown() {
	xxx_messageInfo_StakerBuf.DiscardUnknown(m)
}

var xxx_messageInfo_StakerBuf proto.InternalMessageInfo

func (m *StakerBuf) GetAddress() string {
	if m != nil {
		return m.Address
	}
	return ""
}

func (m *StakerBuf) GetLocation() string {
	if m != nil {
		return m.Location
	}
	return ""
}

func (m *StakerBuf) GetCreationTime() *RollupTimeBuf {
	if m != nil {
		return m.CreationTime
	}
	return nil
}

func (m *StakerBuf) GetChallengeAddr() string {
	if m != nil {
		return m.ChallengeAddr
	}
	return ""
}

type ChallengeBuf struct {
	Contract             string   `protobuf:"bytes,1,opt,name=contract,proto3" json:"contract,omitempty"`
	Asserter             string   `protobuf:"bytes,2,opt,name=asserter,proto3" json:"asserter,omitempty"`
	Challenger           string   `protobuf:"bytes,3,opt,name=challenger,proto3" json:"challenger,omitempty"`
	Kind                 uint32   `protobuf:"varint,4,opt,name=kind,proto3" json:"kind,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *ChallengeBuf) Reset()         { *m = ChallengeBuf{} }
func (m *ChallengeBuf) String() string { return proto.CompactTextString(m) }
func (*ChallengeBuf) ProtoMessage()    {}
func (*ChallengeBuf) Descriptor() ([]byte, []int) {
	return fileDescriptor_037f188b50610c79, []int{4}
}

func (m *ChallengeBuf) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ChallengeBuf.Unmarshal(m, b)
}
func (m *ChallengeBuf) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ChallengeBuf.Marshal(b, m, deterministic)
}
func (m *ChallengeBuf) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ChallengeBuf.Merge(m, src)
}
func (m *ChallengeBuf) XXX_Size() int {
	return xxx_messageInfo_ChallengeBuf.Size(m)
}
func (m *ChallengeBuf) XXX_DiscardUnknown() {
	xxx_messageInfo_ChallengeBuf.DiscardUnknown(m)
}

var xxx_messageInfo_ChallengeBuf proto.InternalMessageInfo

func (m *ChallengeBuf) GetContract() string {
	if m != nil {
		return m.Contract
	}
	return ""
}

func (m *ChallengeBuf) GetAsserter() string {
	if m != nil {
		return m.Asserter
	}
	return ""
}

func (m *ChallengeBuf) GetChallenger() string {
	if m != nil {
		return m.Challenger
	}
	return ""
}

func (m *ChallengeBuf) GetKind() uint32 {
	if m != nil {
		return m.Kind
	}
	return 0
}

type DisputableNodeBuf struct {
	Hash                 string         `protobuf:"bytes,1,opt,name=hash,proto3" json:"hash,omitempty"`
	Deadline             *RollupTimeBuf `protobuf:"bytes,2,opt,name=deadline,proto3" json:"deadline,omitempty"`
	PendingTop           string         `protobuf:"bytes,3,opt,name=pendingTop,proto3" json:"pendingTop,omitempty"`
	XXX_NoUnkeyedLiteral struct{}       `json:"-"`
	XXX_unrecognized     []byte         `json:"-"`
	XXX_sizecache        int32          `json:"-"`
}

func (m *DisputableNodeBuf) Reset()         { *m = DisputableNodeBuf{} }
func (m *DisputableNodeBuf) String() string { return proto.CompactTextString(m) }
func (*DisputableNodeBuf) ProtoMessage()    {}
func (*DisputableNodeBuf) Descriptor() ([]byte, []int) {
	return fileDescriptor_037f188b50610c79, []int{5}
}

func (m *DisputableNodeBuf) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_DisputableNodeBuf.Unmarshal(m, b)
}
func (m *DisputableNodeBuf) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_DisputableNodeBuf.Marshal(b, m, deterministic)
}
func (m *DisputableNodeBuf) XXX_Merge(src proto.Message) {
	xxx_messageInfo_DisputableNodeBuf.Merge(m, src)
}
func (m *DisputableNodeBuf) XXX_Size() int {
	return xxx_messageInfo_DisputableNodeBuf.Size(m)
}
func (m *DisputableNodeBuf) XXX_DiscardUnknown() {
	xxx_messageInfo_DisputableNodeBuf.DiscardUnknown(m)
}

var xxx_messageInfo_DisputableNodeBuf proto.InternalMessageInfo

func (m *DisputableNodeBuf) GetHash() string {
	if m != nil {
		return m.Hash
	}
	return ""
}

func (m *DisputableNodeBuf) GetDeadline() *RollupTimeBuf {
	if m != nil {
		return m.Deadline
	}
	return nil
}

func (m *DisputableNodeBuf) GetPendingTop() string {
	if m != nil {
		return m.PendingTop
	}
	return ""
}

type PendingInboxBuf struct {
	Items                []string `protobuf:"bytes,1,rep,name=items,proto3" json:"items,omitempty"`
	HashOfRest           string   `protobuf:"bytes,2,opt,name=hashOfRest,proto3" json:"hashOfRest,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *PendingInboxBuf) Reset()         { *m = PendingInboxBuf{} }
func (m *PendingInboxBuf) String() string { return proto.CompactTextString(m) }
func (*PendingInboxBuf) ProtoMessage()    {}
func (*PendingInboxBuf) Descriptor() ([]byte, []int) {
	return fileDescriptor_037f188b50610c79, []int{6}
}

func (m *PendingInboxBuf) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_PendingInboxBuf.Unmarshal(m, b)
}
func (m *PendingInboxBuf) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_PendingInboxBuf.Marshal(b, m, deterministic)
}
func (m *PendingInboxBuf) XXX_Merge(src proto.Message) {
	xxx_messageInfo_PendingInboxBuf.Merge(m, src)
}
func (m *PendingInboxBuf) XXX_Size() int {
	return xxx_messageInfo_PendingInboxBuf.Size(m)
}
func (m *PendingInboxBuf) XXX_DiscardUnknown() {
	xxx_messageInfo_PendingInboxBuf.DiscardUnknown(m)
}

var xxx_messageInfo_PendingInboxBuf proto.InternalMessageInfo

func (m *PendingInboxBuf) GetItems() []string {
	if m != nil {
		return m.Items
	}
	return nil
}

func (m *PendingInboxBuf) GetHashOfRest() string {
	if m != nil {
		return m.HashOfRest
	}
	return ""
}

type RollupTimeBuf struct {
	Val                  string   `protobuf:"bytes,1,opt,name=val,proto3" json:"val,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *RollupTimeBuf) Reset()         { *m = RollupTimeBuf{} }
func (m *RollupTimeBuf) String() string { return proto.CompactTextString(m) }
func (*RollupTimeBuf) ProtoMessage()    {}
func (*RollupTimeBuf) Descriptor() ([]byte, []int) {
	return fileDescriptor_037f188b50610c79, []int{7}
}

func (m *RollupTimeBuf) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_RollupTimeBuf.Unmarshal(m, b)
}
func (m *RollupTimeBuf) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_RollupTimeBuf.Marshal(b, m, deterministic)
}
func (m *RollupTimeBuf) XXX_Merge(src proto.Message) {
	xxx_messageInfo_RollupTimeBuf.Merge(m, src)
}
func (m *RollupTimeBuf) XXX_Size() int {
	return xxx_messageInfo_RollupTimeBuf.Size(m)
}
func (m *RollupTimeBuf) XXX_DiscardUnknown() {
	xxx_messageInfo_RollupTimeBuf.DiscardUnknown(m)
}

var xxx_messageInfo_RollupTimeBuf proto.InternalMessageInfo

func (m *RollupTimeBuf) GetVal() string {
	if m != nil {
		return m.Val
	}
	return ""
}

func init() {
	proto.RegisterType((*ChainBuf)(nil), "rollup.ChainBuf")
	proto.RegisterType((*ChainParamsBuf)(nil), "rollup.ChainParamsBuf")
	proto.RegisterType((*NodeBuf)(nil), "rollup.NodeBuf")
	proto.RegisterType((*StakerBuf)(nil), "rollup.StakerBuf")
	proto.RegisterType((*ChallengeBuf)(nil), "rollup.ChallengeBuf")
	proto.RegisterType((*DisputableNodeBuf)(nil), "rollup.DisputableNodeBuf")
	proto.RegisterType((*PendingInboxBuf)(nil), "rollup.PendingInboxBuf")
	proto.RegisterType((*RollupTimeBuf)(nil), "rollup.RollupTimeBuf")
}

func init() { proto.RegisterFile("rollup.proto", fileDescriptor_037f188b50610c79) }

var fileDescriptor_037f188b50610c79 = []byte{
	// 659 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x7c, 0x54, 0x4b, 0x6f, 0xd3, 0x40,
	0x10, 0x56, 0x48, 0x9b, 0xc7, 0x24, 0xe9, 0x63, 0x29, 0x60, 0x38, 0xa0, 0x60, 0x01, 0x8a, 0x78,
	0x34, 0x50, 0x90, 0x10, 0x42, 0x42, 0xb4, 0x05, 0x01, 0x17, 0xa8, 0xdc, 0x9e, 0xb8, 0x6d, 0xec,
	0x71, 0xbc, 0x8a, 0xbd, 0x6b, 0x76, 0xd7, 0x51, 0xe9, 0x8d, 0xbf, 0x02, 0xff, 0x8c, 0x5f, 0x82,
	0x76, 0xfd, 0xa8, 0x9d, 0x14, 0x4e, 0xde, 0x99, 0xf9, 0x66, 0xf6, 0xdb, 0xf9, 0x66, 0x0c, 0x43,
	0x29, 0xe2, 0x38, 0x4b, 0xf7, 0x53, 0x29, 0xb4, 0x20, 0x9d, 0xdc, 0x72, 0x7f, 0xb6, 0xa1, 0x77,
	0x1c, 0x51, 0xc6, 0x8f, 0xb2, 0x90, 0x4c, 0x60, 0xdb, 0x17, 0x5c, 0x4b, 0xea, 0xeb, 0xc3, 0x20,
	0x90, 0xa8, 0x94, 0xd3, 0x1a, 0xb7, 0x26, 0x7d, 0x6f, 0xd5, 0x4d, 0x0e, 0xa0, 0xb7, 0x4c, 0x4e,
	0xa8, 0xa4, 0x89, 0x72, 0xae, 0x8d, 0x5b, 0x93, 0xc1, 0xc1, 0xcd, 0xfd, 0xa2, 0xbe, 0xad, 0x96,
	0x87, 0x8e, 0xb2, 0xd0, 0xab, 0x70, 0xe4, 0x0d, 0x0c, 0x53, 0xe4, 0x01, 0xe3, 0xf3, 0xcf, 0x7c,
	0x26, 0xce, 0x9d, 0xb6, 0xcd, 0xbb, 0x55, 0xe6, 0x9d, 0xd4, 0x62, 0x26, 0xb1, 0x01, 0x26, 0x0f,
	0x60, 0x93, 0x8b, 0x00, 0x95, 0xb3, 0x31, 0x6e, 0x4f, 0x06, 0x07, 0xdb, 0x65, 0xd6, 0x17, 0x11,
	0xa0, 0x41, 0xe7, 0x51, 0xf2, 0x0c, 0xae, 0xc7, 0x54, 0xa3, 0xd2, 0xc7, 0x82, 0x87, 0x4c, 0x26,
	0x18, 0x7c, 0xa2, 0x2a, 0x72, 0x36, 0xed, 0x2b, 0xae, 0x0a, 0x91, 0xbb, 0x00, 0x31, 0xd2, 0xd0,
	0x9c, 0x51, 0x39, 0x9d, 0x71, 0x7b, 0xd2, 0xf7, 0x6a, 0x1e, 0xf2, 0x18, 0xba, 0x4a, 0xd3, 0x05,
	0x4a, 0xe5, 0x74, 0xed, 0xd5, 0xbb, 0xe5, 0xd5, 0xa7, 0xd6, 0x6d, 0x2e, 0x2f, 0x11, 0xe4, 0x25,
	0x80, 0x1f, 0xd1, 0x38, 0x46, 0x3e, 0x47, 0xe5, 0xf4, 0x2c, 0x7e, 0xaf, 0xd6, 0x98, 0x3c, 0x62,
	0x52, 0x6a, 0x38, 0xf7, 0x77, 0x0b, 0xb6, 0x9a, 0x5d, 0x23, 0x8f, 0x60, 0xc7, 0xd6, 0xf4, 0xf0,
	0x7b, 0xc6, 0x24, 0x26, 0xc8, 0x75, 0x21, 0xc5, 0x9a, 0x9f, 0xbc, 0x82, 0xc1, 0x5c, 0x52, 0x1f,
	0x4f, 0x50, 0x32, 0x11, 0x14, 0x72, 0xdc, 0x28, 0x6f, 0xf5, 0xec, 0xe7, 0x8c, 0x25, 0xf6, 0xda,
	0x3a, 0x92, 0x3c, 0x81, 0xdd, 0x84, 0x9e, 0x7f, 0x38, 0x47, 0x3f, 0xd3, 0x4c, 0xf0, 0x53, 0x8d,
	0xa9, 0xb2, 0xaa, 0x8c, 0xbc, 0xf5, 0x80, 0xfb, 0xa7, 0x05, 0xdd, 0xa2, 0xdb, 0x84, 0xc0, 0x46,
	0x64, 0xfa, 0x9a, 0x53, 0xb2, 0x67, 0x72, 0x08, 0x5b, 0x01, 0x53, 0x69, 0xa6, 0xe9, 0x2c, 0x46,
	0x03, 0x2c, 0x98, 0xdc, 0x2e, 0x99, 0xbc, 0x6f, 0x44, 0x0d, 0x9b, 0x95, 0x04, 0x32, 0x86, 0x41,
	0x42, 0xfd, 0x88, 0x71, 0xb4, 0xaa, 0xb5, 0x6d, 0xf5, 0xba, 0x8b, 0x3c, 0x84, 0xad, 0x62, 0x2c,
	0xce, 0x44, 0x6a, 0x41, 0x1b, 0x16, 0xb4, 0xe2, 0x25, 0x77, 0xa0, 0x17, 0x33, 0xbe, 0x38, 0xfb,
	0x91, 0xa2, 0x15, 0x7f, 0xe4, 0x55, 0xb6, 0x89, 0xa5, 0x12, 0x97, 0x36, 0xbb, 0x63, 0xb3, 0x2b,
	0xdb, 0xfd, 0xd5, 0x82, 0x7e, 0xa5, 0x2b, 0x71, 0xa0, 0x4b, 0x1b, 0x7b, 0x50, 0x9a, 0xb6, 0xbe,
	0xf0, 0xa9, 0xe9, 0x8e, 0x7d, 0x66, 0xdf, 0xab, 0x6c, 0xf2, 0x1a, 0x86, 0xbe, 0x44, 0x7b, 0x36,
	0x6d, 0x2f, 0xe6, 0xfc, 0x1f, 0x82, 0x34, 0xa0, 0xe4, 0x3e, 0x8c, 0xaa, 0xb9, 0x30, 0xab, 0x56,
	0xbc, 0xae, 0xe9, 0x74, 0x2f, 0x60, 0x58, 0x9f, 0x25, 0x43, 0xa6, 0xdc, 0xcf, 0x82, 0x67, 0x65,
	0x9b, 0x18, 0x55, 0x0a, 0xa5, 0x46, 0x59, 0x12, 0x2d, 0x6d, 0x33, 0xfa, 0x55, 0x61, 0x59, 0x74,
	0xbb, 0xe6, 0x31, 0x2a, 0x2f, 0x18, 0x0f, 0x2c, 0x89, 0x91, 0x67, 0xcf, 0xee, 0x05, 0xec, 0xae,
	0xe9, 0x78, 0xe5, 0x38, 0x3c, 0x87, 0x5e, 0x80, 0x34, 0x88, 0x19, 0xc7, 0xff, 0x8f, 0x64, 0x05,
	0x33, 0x7c, 0x2e, 0x65, 0x2c, 0xf9, 0x5c, 0x7a, 0xdc, 0x8f, 0xb0, 0xbd, 0xf2, 0x93, 0x20, 0x7b,
	0xb0, 0xc9, 0x34, 0x26, 0x46, 0x1f, 0xb3, 0xb8, 0xb9, 0x61, 0x0a, 0x19, 0x0e, 0x5f, 0x43, 0x0f,
	0x95, 0x2e, 0x9e, 0x5d, 0xf3, 0xb8, 0xf7, 0x60, 0xd4, 0xe0, 0x40, 0x76, 0xa0, 0xbd, 0xa4, 0x71,
	0xc1, 0xdf, 0x1c, 0x8f, 0xde, 0x7d, 0x7b, 0x3b, 0x67, 0x3a, 0xca, 0x66, 0xfb, 0xbe, 0x48, 0xa6,
	0x22, 0x0c, 0x7d, 0xb3, 0xa0, 0x31, 0x9d, 0xa9, 0x29, 0x95, 0x33, 0xa6, 0x65, 0x96, 0x4c, 0x53,
	0xea, 0x2f, 0xe8, 0x1c, 0xad, 0xe7, 0xe9, 0x92, 0xc6, 0x2c, 0xa0, 0x5a, 0xc8, 0x69, 0xfe, 0xca,
	0x59, 0xc7, 0xfe, 0x68, 0x5f, 0xfc, 0x0d, 0x00, 0x00, 0xff, 0xff, 0x5e, 0xe3, 0xc9, 0xc7, 0x78,
	0x05, 0x00, 0x00,
}
