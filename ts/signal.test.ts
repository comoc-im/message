import {Signal} from './index';

describe('signal message', () => {
    test('encode and decode', () => {
        const fromAddr = `04eff3286092c16b675025aac87a53e86f33c3ecd0f85875e34ae86497296079444ca481b6aee60aa59f123c8fa8ba8a331e97f57d544f02d11199e78405bc9a3e4b87adc6ff1567befdd61611cda70dc4eebe38fa300a888d260d69d56bca9199`
        const toAddr = `045ec57482f0c8b7076120d12da5357d437b1a383a5249df1eab5fc5c61994a810036c0a66b983013e5a4ed6c78a183b2f93f31f0bd7a124b8e79674628aebb3070df93106d042b8604a143d3f8c6ab453a2494dddf700863ff3e0771764e4993b`
        const original = new Signal(fromAddr, toAddr, new Uint8Array([1, 2, 3]))
        const encoded = original.encode()
        const decoded = Signal.decode(encoded)

        expect(decoded.to).toEqual(original.to)
        expect(decoded.from).toEqual(original.from)
    })
})
