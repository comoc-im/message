package message

type Message interface {
	Encode() []byte
	Decode() error
}

type messageType byte

const (
	SignalPrefix messageType = 0b11111111
)
