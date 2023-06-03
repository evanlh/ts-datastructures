import { Hashable, hashFunctionMultiplyMethod } from "./hashing";

class BloomFilter<T extends Hashable> /* implements Set<T> */ {
    private bitfields: Uint8Array[] = [];
    private hashFunctions: ((elem: T) => number)[] = [];
    private requiredBits: number;
    private numHashFunctions: number;
    private _size: number = 0;
    private _capacity: number;

    constructor(falsePositiveProbability: number, capacity: number) {
        if (falsePositiveProbability > 1.0 || falsePositiveProbability < 0.0) {
            throw new Error("falsePositiveProbability must be in the range [0.0, 1.0]");
        }
        if (capacity < 1) {
            throw new Error("capacity must be positive");
        }
        const requiredBits = -(capacity*Math.log(falsePositiveProbability) / (Math.log(2)^2));
        const numHashFunctions = (requiredBits / capacity) * Math.log(2);
        console.log(`${requiredBits} bits required, will create ${numHashFunctions} hash functions`);
        const numHashFunctionsCeil = Math.ceil(numHashFunctions);
        this.requiredBits = requiredBits;
        this.numHashFunctions = numHashFunctionsCeil;
        this._capacity = capacity;
        this.initBitFields();
        this.initHashFunctions();
    }
    private initBitFields() {
        const arraySize = Math.ceil(this.requiredBits / 8);
        for (let i = 0; i < this.numHashFunctions; i++) {
            this.bitfields.push(new Uint8Array(arraySize)); // ? what about actual bits?
        }
    }
    private initHashFunctions() {
        for (let i = 0; i < this.numHashFunctions; i++) {
            const fn = hashFunctionMultiplyMethod(this.capacity);
            this.hashFunctions.push(fn);
        }
    }

    private hashKey(value: T) {

    }

    add(value: T) {
        this._size++;
        return this;
    }

    clear() {
        this._size = 0;
        this.initBitFields();
        return this;
    }

    has(value: T): boolean {
        return false;
    }

    get size() {
        return this._size;
    }
    get capacity() {
        return this._capacity;
    }


    // delete(value: T): boolean {
    //     return false;
    // }
    // forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
    // }
}

export default BloomFilter;