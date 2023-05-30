import RingBuffer from './ringbuffer'
import test from 'tape';

test('create RingBuffer', (t) => {
    const rb = new RingBuffer(100);
    t.equal(rb.capacity, 100);
    t.end()
});

test('test get and put', (t) => {
    const rb = new RingBuffer(10);
    t.equal(rb.capacity, 10);

    rb.put(1)
    rb.put(2)
    rb.put(3)
    t.equal(rb.get(), 1);
    t.equal(rb.get(), 2);
    t.equal(rb.get(), 3);

    t.end()
});

test('test overflow', (t) => {
    const rb = new RingBuffer(5);
    t.equal(rb.capacity, 5);

    for (let i = 0; i <= 7; i++)
        rb.put(i);

    const arr = [];
    for (let i = 0; i < 7; i++)
        arr.push(rb.get());
    
    t.deepEqual(arr, [3, 4, 5, 6, 7, undefined, undefined]);
    t.end()
});

test('test overflow 2', (t) => {
    const rb = new RingBuffer(5);
    t.equal(rb.capacity, 5);

    for (let i = 0; i < 16; i++)
        rb.put(i);

    const arr = [];
    for (let i = 0; i < 7; i++)
        arr.push(rb.get());
    
    t.deepEqual(arr, [11, 12, 13, 14, 15, undefined, undefined]);
    t.end()
});

test('test disallow overflow', (t) => {
    const rb = new RingBuffer(5, false);
    t.equal(rb.capacity, 5);

    for (let i = 0; i < 10; i++)
        rb.put(i);

    const arr = [];
    for (let i = 0; i < 7; i++)
        arr.push(rb.get());
    
    t.deepEqual(arr, [0, 1, 2, 3, 4, undefined, undefined]);
    t.end()
});