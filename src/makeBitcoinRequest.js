const createMessage = require('../../src/createMessage');
const axios = require("axios");

const url   = "https://api.coindesk.com/v1/bpi/currentprice.json"

function makeBitcoinRequest (query) {
  
  return new Promise((resolve,reject) => {
    axios.get(url).then(response => {
      // Return a formatted message
      resolve(createMessage(query,response.data.bpi[query].rate));
    })
    .catch(error => {    
      console.log(error); 
      reject(error);
      return;
    });

  });
  
}

module.exports = makeBitcoinRequest;