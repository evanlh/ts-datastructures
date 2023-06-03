import { hashCodeFromHashable, hashFunctionMultiplyMethod } from './hashing'
import type { HashableObject } from './hashing';
import test from 'tape';

test('hashCodeFromHashable for various types', (t) => {
    const hashableObject: HashableObject = {
        hashCode: () => {
            return 12;
        }
    }
    t.equal(hashCodeFromHashable(hashableObject), 12);

    t.equal(hashCodeFromHashable(42), 42);

    // iknowiknow it seems like it should be 42 but that's not how these things work
    t.equal(hashCodeFromHashable('life, the universe, and everything'), 4834403335);

    t.end()
});

test('hashFunctionMultiplyMethod for strings and numbers', (t) => {
    let randomVals = [0.1, 0.2, 0.3, 0.4, 0.5];
    let randomIdx = 0;
    let notRandomRandomFn = () => {
        const v = randomVals[randomIdx];
        randomIdx = (randomIdx + 1) % randomVals.length;
        return v;
    }

    // TODO need some way to check that at the limit what gets returned
    // approaches a normal distribution? probably only makes sense with
    // random values.... see also:
    // https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test
    const expectedSize = 10;
    const hasherFn = hashFunctionMultiplyMethod(expectedSize, notRandomRandomFn);

    const hashTheseStrings = ["aaa", "bbb", "ccc", "ddd", "eee"];
    const hashedStrings = hashTheseStrings.map(hasherFn);
    hashedStrings.forEach(hash => t.assert(hash >= 0 && hash <= expectedSize));

    const hashTheseNumbers = [3, 7, 11, 13, 17, 19, 31, 33];
    const hashedNumbers = hashTheseNumbers.map(hasherFn);
    hashedNumbers.forEach(hash => t.assert(hash >= 0 && hash <= expectedSize));
    t.end();
})