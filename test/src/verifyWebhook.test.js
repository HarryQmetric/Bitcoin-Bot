import test from 'ava';
import verifyWebhook from '../../src/verifyWebhook';

test('throws an error if there is no body', t => {
    const body = null;
    t.throws(() => verifyWebhook(body));
})