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

//test('ensure verify webhook is called', async t => {
    //const req = {


    
  //  }
//})