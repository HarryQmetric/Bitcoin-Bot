import test from "ava";
import {bitcoinPrice} from '../../src/index'

test('throws an error if req.method is not POST', async t => {
    const req = {
        method: 'GET'
    };
    const res = ({
        status: () => ({
            send: () => {}
        }) 
    });

    const error = await t.throwsAsync(async () => await bitcoinPrice(req, res));

    t.is(error.code, 405);
})

// test('calls verifywebhook', t=> {
//     const expectedResult ={
//        verifywebhook() 
//     }
// })
// const actualResult = verifywebhook()