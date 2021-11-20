import { Address } from './index';

const byteToHex: string[] = []

for (let n = 0; n <= 0xff; ++n) {
    const hexOctet = n.toString(16).padStart(2, '0')
    byteToHex.push(hexOctet)
}

export function bytesToAddress(bytes: Uint8Array): Address {
    const raw = Array.prototype.map
        .call(bytes, (n) => byteToHex[n])
        .join('')
    return raw.replace(/0*$/ig, '')
}

export function addressToBytes(address: Address): Uint8Array {
    const result: string[] = address.match(/[\da-f]{2}/gi) || []
    return new Uint8Array(result.map((h) => parseInt(h, 16)))
}
