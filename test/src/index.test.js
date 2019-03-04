import test from "ava";
import {bitcoinPrice} from '../../src/index'
import nock from 'nock';

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

test('credentials are verified', async t => {
    const req = {
        method: 'POST',
        body: {
            token: 'BADTOKEN'
        }
    };
    const res = ({
        status: () => ({
            send: () => {}
        }) 
    });

    const error = await t.throwsAsync(async () => await bitcoinPrice(req, res));

    t.is(error.code, 401);
})

test('calls api and returns the rate', async t => {
    let actualResponse;

    const req = {
        method: 'POST',
        body: {
            token: '3FIjjMTBXUYXOQio6CYYxK3TN4bKE8XVAsBUGWbV-Rk=',
            message: {
                text: 'GBP'
            }
        }
    };
    const res = ({
        status: () => ({
            send: (response) => {
                actualResponse = response;
            }
        }) 
    });
    
    const server = nock('https://api.coindesk.com');

    server.get('/v1/bpi/currentprice.json')
        .reply(200, JSON.stringify({
        bpi: {
                'GBP': {
                    rate: '666.45'
                }
            }
    }));

    const result = await bitcoinPrice(req, res);

    t.is(actualResponse.cards[0].sections[0].widgets[0].textParagraph.text, '£666.45' )
})