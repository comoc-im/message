package message

import "errors"

type Signal struct {
	From    Address `json:"from"`
	To      Address `json:"to"`
	Payload []byte  `json:"payload"`
}

func (s *Signal) Encode() []byte {
	result := []byte{}
	result = append(result, byte(SignalPrefix))
	result = append(result, s.To[:]...)
	result = append(result, s.From[:]...)
	result = append(result, s.Payload[:]...)
	return result
}

func (s *Signal) Decode(source *[]byte) error {
	if len(*source) < 2*addressLen+1 {
		return errors.New(
			"signal message source too short: " +
				string(rune(len(*source))) +
				"/" +
				string(rune(2*addressLen+1)),
		)
	}

	firstByte := (*source)[0]
	if firstByte != byte(SignalPrefix) {
		return errors.New("not a valid signal message")
	}

	to := (*source)[1 : addressLen+1]
	from := (*source)[addressLen+1 : addressLen*2+1]
	s.To = *(*Address)(to)
	s.From = *(*Address)(from)
	s.Payload = (*source)[addressLen*2+1:]
	return nil
}
