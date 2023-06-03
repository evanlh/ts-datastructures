
const BITS_PER_ELEMENT = Uint8Array.BYTES_PER_ELEMENT * 8;

export class Bitfield {
    private bitfield: Uint8Array;
    readonly size: number;

    constructor(size: number) {
        this.size = size;
        const arraySize = Math.ceil(size / BITS_PER_ELEMENT);
        this.bitfield = new Uint8Array(arraySize);
    }

    get(idx: number): 0 | 1 {
        if (idx > this.size) return 0;

        const elem = Math.floor(idx / BITS_PER_ELEMENT);
        const bitidx = idx % BITS_PER_ELEMENT;
        return ((this.bitfield[elem] & (1 << bitidx)) >> bitidx) ? 1 : 0;
    }

    set(idx: number, value: number | boolean) {
        if (idx > this.size) return;

        const elem = Math.floor(idx / BITS_PER_ELEMENT);
        const bitidx = idx % BITS_PER_ELEMENT;
        const bit = value ? (1 << bitidx) : (~(1 << bitidx));
        this.bitfield[elem] = value ? (this.bitfield[elem] | bit) : (this.bitfield[elem] & bit);
    }

    clear() {
        this.bitfield.fill(0);
    }
}

// function printBits(num) {
//     let r = "";
//     for (let i = 7; i >= 0; i--) {
//         r += "" + ((num & (1 << i)) >> i);
//     }
//     console.log(r);
// }