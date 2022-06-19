import { ADDRESS_MAX_BYTE_LENGTH } from './address';
import { SignInPrefix } from './message';
import { Address, addressToBytes, bytesToAddress } from '@comoc-im/id';

export class SignIn {
    public readonly address: Address;

    constructor(address: Address) {
        this.address = address
    }

    public static decode(source: Uint8Array): SignIn {
        if (source.length <= 1) {
            throw new Error('source too short')
        }

        if (source.length > ADDRESS_MAX_BYTE_LENGTH + 1) {
            throw new Error('source too long')
        }
        const firstByte = source[0]
        if (firstByte !== SignInPrefix) {
            throw new Error('not a valid sign in message')
        }
        const address = bytesToAddress(source.slice(1))

        return new SignIn(address)
    }

    public encode(): Uint8Array {
        const len = 1 + ADDRESS_MAX_BYTE_LENGTH
        const result = new Uint8Array(len)
        result.set([SignInPrefix])
        result.set(addressToBytes(this.address), 1)
        return result
    }

}
