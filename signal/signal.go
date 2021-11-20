package signal

import (
	"errors"
	"github.com/comoc-im/message"
	"github.com/comoc-im/message/address"
)

type Signal struct {
	From    address.Address `json:"from"`
	To      address.Address `json:"to"`
	Payload []byte          `json:"payload"`
}

func (s *Signal) Encode() []byte {
	result := []byte{}
	result = append(result, byte(message.Signal))
	result = append(result, address.AddressToBytes(s.To)...)
	result = append(result, address.AddressToBytes(s.From)...)
	result = append(result, s.Payload[:]...)
	return result
}

func (s *Signal) Decode(source *[]byte) error {
	if len(*source) < 2*address.AddressLen+1 {
		return errors.New(
			"signal message source too short: " +
				string(rune(len(*source))) +
				"/" +
				string(rune(2*address.AddressLen+1)),
		)
	}

	firstByte := (*source)[0]
	if firstByte != byte(message.Signal) {
		return errors.New("not a valid signal message")
	}

	to := (*source)[1 : address.AddressLen+1]
	from := (*source)[address.AddressLen+1 : address.AddressLen*2+1]
	s.To = address.BytesToAddress(to)
	s.From = address.BytesToAddress(from)
	s.Payload = (*source)[address.AddressLen*2+1:]
	return nil
}
