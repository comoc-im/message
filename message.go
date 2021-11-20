package message

type Message interface {
	Encode() []byte
	Decode(source *[]byte) error
}

type MessageType byte

const (
	Signal MessageType = 0b11111111
	SignIn MessageType = 0b00000000
)
