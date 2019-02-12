import test from 'ava';
import createMessage from '../../src/createMessage'

test('returns a message with a header', t => {
    const expectedResult = {
        title: 'Bitcoin Price (ABC)'
    };
    const actualResult = createMessage('ABC', 123.45);

    t.deepEqual(expectedResult, actualResult.cards[0].header);
})

test('returns a widget with the amount in pounds', t => {
    const expectedResult ={
        "widgets": [
            {
              "textParagraph": {
                "text": "£123.45"
              }
            }
          ]
    };
    const actualResult = createMessage('GBP', 123.45);

    t.deepEqual(expectedResult, actualResult.cards[0].sections[0]);
})


test('returns a widget with the amount in euros', t => {
    const expectedresult ={
        "widgets": [
            {
              "textParagraph": {
                "text": "€100.51"
              }
            }
          ]
    };
    const actualResult = createMessage('EUR', 100.51);

    t.deepEqual(expectedresult, actualResult.cards[0].sections[0]);
})

test('returns a widget with the amount in dollars', t => {
    const expectedresult ={
        "widgets": [
            {
              "textParagraph": {
                "text": "$198.99"
              }
            }
          ]
    };
    const actualResult = createMessage('USD', 198.99);
    
    t.deepEqual(expectedresult, actualResult.cards[0].sections[0]);
})

test('returns an image button ', t => {
    const expectedResult ={
        "imageButton": {
            "iconUrl": "https://cdn1.iconfinder.com/data/icons/personal-business-finance-set-4/256/Personal__Business_Finance-10-512.png",
            "onClick": {
              "openLink": {
                "url": "https://www.coindesk.com/price/bitcoin"
              }
            }
        }
    }
    const actualResult = createMessage( )
    t.deepEqual(expectedResult, actualResult.cards[0].sections[0].widgets[0].imageButton[0].iconUrl.onClick[0].openLink[0].url);
})