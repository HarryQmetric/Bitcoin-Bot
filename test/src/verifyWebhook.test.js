import test from 'ava';
import verifyWebhook from '../../src/verifyWebhook';
import nock from 'nock';

test('throws an error if there is no body', t => {
    const body = null;
    t.throws(() => verifyWebhook(body));
})

test('throws an error if the token is invalid', t => {
    const body = { token:"invalid token"};
    t.throws(() => verifyWebhook(body));
})

