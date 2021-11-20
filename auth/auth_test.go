package auth

import "testing"

func testSignal(t *testing.T) {
	const addr = `04eff3286092c16b675025aac87a53e86f33c3ecd0f85875e34ae86497296079444ca481b6aee60aa59f123c8fa8ba8a331e97f57d544f02d11199e78405bc9a3e4b87adc6ff1567befdd61611cda70dc4eebe38fa300a888d260d69d56bca9199`
	original := SignIn{
		addr,
	}

	encoded := original.Encode()
	decoded := SignIn{}
	if err := decoded.Decode(&encoded); err != nil {
		t.Fatalf("Sign in encode and decode fail %v", err)
	}

	if original.Address != decoded.Address {
		t.Fatalf("Sign in encode and decode fail")
	}
}
