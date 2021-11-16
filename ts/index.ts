const AddressLength = 255;
const SignalPrefix = 0b11111111

export const PING = 0b0;
export const PONG = 0b1;

type Address = Uint8Array;

export class Signal {
    from: Address;
    to: Address;
    payload: Uint8Array;

    constructor(from: Address, to: Address, payload: Uint8Array) {
        if (from.length > AddressLength) {
            throw new Error(`from address too long, ${AddressLength} max`)
        }
        if (to.length > AddressLength) {
            throw new Error(`to address too long, ${AddressLength} max`)
        }
        this.from = from
        this.to = to
        this.payload = payload
    }

    public static decode(source: Uint8Array): Signal {
        if (source.length < 2 * AddressLength + 1) {
            throw new Error('source too short')
        }

        const firstByte = source[0]
        if (firstByte !== SignalPrefix) {
            throw new Error('not a valid signal message')
        }
        const to = source.slice(1, AddressLength + 1)
        const from = source.slice(AddressLength + 1, 2 * AddressLength + 1)
        const payload = source.slice(2 * AddressLength + 1)

        return new Signal(from, to, payload)
    }

    public encode(): Uint8Array {
        const result = new Uint8Array([])
        result.set([SignalPrefix])
        result.set(this.to, 1);
        result.set(this.from, 1 + AddressLength);
        result.set(this.payload, 1 + 2 * AddressLength)
        return result;
    }
}


