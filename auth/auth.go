package auth

import (
	"errors"
	"github.com/comoc-im/message"
	"github.com/comoc-im/message/address"
)

type SignIn struct {
	Address address.Address `json:"address"`
}

func (s *SignIn) Encode() []byte {
	result := []byte{}
	result = append(result, byte(message.SignIn))
	result = append(result, address.AddressToBytes(s.Address)...)
	return result
}

func (s *SignIn) Decode(source *[]byte) error {
	l := len(*source)
	if l <= 1 {
		return errors.New(
			"sign in message source too short: " +
				string(rune(l)) +
				"/" +
				string(rune(address.AddressLen+1)),
		)
	}

	if l > 1+address.AddressLen {
		return errors.New(
			"sign in message source too long: " +
				string(rune(l)) +
				"/" +
				string(rune(address.AddressLen+1)),
		)
	}

	firstByte := (*source)[0]
	if firstByte != byte(message.SignIn) {
		return errors.New("not a valid sign in message")
	}

	add := (*source)[1:]
	s.Address = address.BytesToAddress(add)
	return nil
}
