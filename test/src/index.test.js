import test from "ava";
import index from '../../src/index'

test('throws an error if req.method is not POST', t => {
    const reql = 'GET';
    t.throws(() => index(req.method));
})


