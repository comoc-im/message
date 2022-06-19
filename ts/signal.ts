import { ADDRESS_MAX_BYTE_LENGTH } from './address';
import { Address, addressToBytes, bytesToAddress } from '@comoc-im/id';
import { SignalPrefix } from './message';

export class Signal {
    from: Address;
    to: Address;
    payload: Uint8Array;

    constructor(from: Address, to: Address, payload: Uint8Array) {
        // if (from.length > ADDRESS_MAX_BYTE_LENGTH) {
        //     throw new Error(`from address too long, ${ADDRESS_MAX_BYTE_LENGTH} max`)
        // }
        // if (to.length > ADDRESS_MAX_BYTE_LENGTH) {
        //     throw new Error(`to address too long, ${ADDRESS_MAX_BYTE_LENGTH} max`)
        // }
        this.from = from
        this.to = to
        this.payload = payload
    }

    public static decode(source: Uint8Array): Signal {
        if (source.length < 2 * ADDRESS_MAX_BYTE_LENGTH + 1) {
            throw new Error('source too short')
        }

        const firstByte = source[0]
        if (firstByte !== SignalPrefix) {
            throw new Error('not a valid signal message')
        }
        const to = bytesToAddress(source.slice(1, ADDRESS_MAX_BYTE_LENGTH + 1))
        const from = bytesToAddress(source.slice(ADDRESS_MAX_BYTE_LENGTH + 1, 2 * ADDRESS_MAX_BYTE_LENGTH + 1))
        const payload = source.slice(2 * ADDRESS_MAX_BYTE_LENGTH + 1)

        return new Signal(from, to, payload)
    }

    public encode(): Uint8Array {
        const len = 1 + 2 * ADDRESS_MAX_BYTE_LENGTH + this.payload.byteLength
        const result = new Uint8Array(len)
        result.set([SignalPrefix])
        result.set(addressToBytes(this.to), 1);
        result.set(addressToBytes(this.from), 1 + ADDRESS_MAX_BYTE_LENGTH);
        result.set(this.payload, 1 + 2 * ADDRESS_MAX_BYTE_LENGTH)
        return result;
    }
}


