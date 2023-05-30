import BloomFilter from './bloomfilter'
import test from 'tape';

test('synchronous passing test', (t) => {
    t.equal(1, 1);
    t.end()
  });

test('test using Promises', (t) => {
    t.plan(1)
    return Promise.reject(new Error("blahblah")).catch((reason: any) => {
        t.assert(true);
    })
  });
  
test('initialize bloomfilter', (t) => {
    const bf = new BloomFilter(0.1, 1000);
    for (let i = 0; i < 100; i++) {
        const randomVal = Math.floor(Math.random()*1000)
        bf.add(randomVal);
    }
    t.equal(bf.size, 100)
    t.end()
})