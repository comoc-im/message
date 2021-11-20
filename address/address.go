package address

import "encoding/hex"

const AddressLen = 512

type Address string

func AddressToBytes(address Address) []byte {
	data, err := hex.DecodeString(string(address))
	if err != nil {
		panic(err)
	}
	return data
}

func BytesToAddress(source []byte) Address {
	return Address(hex.EncodeToString(source))
}
