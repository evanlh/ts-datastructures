export interface HashableObject {
    hashCode(): number;
}

export type Hashable = HashableObject | number | string;

export function hashCodeFromHashable(value: Hashable): number {
    if (typeof value === 'object')
        return value.hashCode();

    else if (typeof value === 'number')
        return value;

    else if (typeof value === 'string')
        return djb2Hash(value);
    
    else {
        // TODO remove this
        throw new Error('not Hashable');
    }
}

// TODO!!!! MurmurHash, fnv2 hash implementations
// A simple hash function & the one used by Java stdlib. NOT THE BEST!
function djb2Hash (value: string): number {
    let hash = 5381;
    for (let i = 0; i < value.length; i++) {
        let c = value.charCodeAt(i);
        hash = ((hash << 5) + hash) + c;
    }
    return hash;
}

export const hashFunctionMultiplyMethod = (expectedSize: number, randomFn: () => number = Math.random) => {
    // a random value 0 < v < 1
    const randomConstant = randomFn();

    return (key: Hashable): number => {
        const k = hashCodeFromHashable(key);
        // take the fractional part of the multiplication
        const fraction = k*randomConstant - Math.floor(k*randomConstant);
        // spread this over the expected size of the collection
        return Math.floor(expectedSize * fraction);
    }
}