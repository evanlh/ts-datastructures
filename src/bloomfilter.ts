class BloomFilter<T> /* implements Set<T> */ {
    readonly size: number;
    private bitfields: Uint8Array[];
    private hashFunctions: ((elem: T) => number)[];
    private requiredBits: number;
    private numHashFunctions: number;

    constructor(falsePositiveProbability: number, maxExpectedElements: number) {
        if (falsePositiveProbability > 1.0 || falsePositiveProbability < 0.0) {
            throw new Error("falsePositiveProbability must be in the range [0.0, 1.0]");
        }
        if (maxExpectedElements < 1) {
            throw new Error("maxExpectedElements must be positive");
        }
        const requiredBits = -(maxExpectedElements*Math.log(falsePositiveProbability) / (Math.log(2)^2));
        const numHashFunctions = (requiredBits / maxExpectedElements) * Math.log(2);
        console.log(`${requiredBits} bits required, will create ${numHashFunctions} hash functions`);
        const numHashFunctionsCeil = Math.ceil(numHashFunctions);
        this.requiredBits = requiredBits;
        this.numHashFunctions = numHashFunctionsCeil;
        this.initBitFields();
        this.initHashFunctions();
    }
    private initBitFields() {
        const arraySize = Math.ceil(this.requiredBits / 8);
        this.bitfields = [];
        for (let i = 0; i < this.numHashFunctions; i++) {
            this.bitfields.push(new Uint8Array(arraySize));
        }
    }
    private initHashFunctions() {

    }
    add(value: T): this {
        return this;
    }
    clear(): void {
        this.initBitFields();
    }
    delete(value: T): boolean {
        return false;
    }

    has(value: T): boolean {
        return false;
    }

    forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
    }
}

export default BloomFilter;