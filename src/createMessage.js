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

module.exports = createMessage;