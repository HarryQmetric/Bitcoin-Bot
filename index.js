language: node_js
node_js:
 - "node"

const axios = require("axios");
const url   = "https://api.coindesk.com/v1/bpi/currentprice.json"

function verifyWebhook (body) {
  if (!body || body.token !== "3FIjjMTBXUYXOQio6CYYxK3TN4bKE8XVAsBUGWbV-Rk=") {
    const error = new Error('Invalid credentials');
    error.code = 401;
    throw error;
  }
}

function createMessage(query, response) {
  var HEADER = {
    "title": "Bitcoin Price (" + query + ")"
  };
  if (query == "GBP"){
    response = "£"+response;
  }else if (query == "EUR"){
    response = "€"+response;
  }else if (query == "USD"){
    response = "$"+response;
  }
  
  return {
  "cards": [
    {
      "header": HEADER,
      "sections": [
        {
          "widgets": [
            {
              "textParagraph": {
                "text": response
              }
            }
          ]
        },
        {
          "widgets": [
            {
              "buttons": [
                {
                  "imageButton": {
                    "iconUrl": "https://cdn1.iconfinder.com/data/icons/personal-business-finance-set-4/256/Personal__Business_Finance-10-512.png",
                    "onClick": {
                      "openLink": {
                        "url": "https://www.coindesk.com/price/bitcoin"
                      }
                    }
                  }
                }
                ]
            }
            
            ]
        }
        ]
    }
    ]
};
}


                     
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
