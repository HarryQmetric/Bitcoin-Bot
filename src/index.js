'use strict';
const makeBitcoinRequest = require('./makeBitcoinRequest');
const verifyWebhook = require('./verifyWebhook');


exports.bitcoinPrice = (req, res) => {
  return Promise.resolve()
    .then(() => {
      //If the request method is not POST, reject the call
      if (req.method !== 'POST') {
        const error = new Error('Only POST requests are accepted');
        error.code = 405;
        throw error;
      }
    
      // Verify that this request came from Hangouts Chat API
      verifyWebhook(req.body);
    
      // Make the request to the Coinbase API
      return makeBitcoinRequest(req.body.message.text);
    })
    .then((response) => {
      // Send the formatted message back to Hangouts Chat 
      res.status(200).send(response);
    })
    .catch((err) => {
      console.error(err);
      res.status(err.code || 500).send(err);
      return Promise.reject(err);
    });
};
