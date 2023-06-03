import test from 'tape';
import { Bitfield } from './bitfield';


test('test bitfield', (t) => {
    const field = new Bitfield(200);

    for (let i = 0; i < 10; i++) {
        if (i % 2 === 0)
            field.set(i, 1);
    }
    for (let i = 0; i < 10; i++) {
        if (i % 2 === 0)
            t.equal(field.get(i), 1)
        else
            t.equal(field.get(i), 0)
    }
    field.clear();

    for (let i = 0; i < 50; i++) {
        if (i % 7 === 0)
            field.set(i, 1);
    }
    for (let i = 0; i < 50; i++) {
        if (i % 7 === 0)
            t.equal(field.get(i), 1)
        else
            t.equal(field.get(i), 0)
    }

    t.end()
});
