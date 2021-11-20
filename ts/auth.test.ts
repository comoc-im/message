import { SignIn } from './auth';

describe('auth', () => {
    test('sign in', () => {
        const address = `04eff3286092c16b675025aac87a53e86f33c3ecd0f85875e34ae86497296079444ca481b6aee60aa59f123c8fa8ba8a331e97f57d544f02d11199e78405bc9a3e4b87adc6ff1567befdd61611cda70dc4eebe38fa300a888d260d69d56bca9199`
        const si = new SignIn(address)
        const encoded = si.encode()
        const decoded = SignIn.decode(encoded)
        expect(si.address).toEqual(decoded.address)
    })
})
