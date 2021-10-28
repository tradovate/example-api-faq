export const URL            = 'https://demo.tradovateapi.com/v1',
             MD_URL         = 'wss://md.tradovateapi.com/v1/websocket',
             WS_DEMO_URL    = 'wss://demo.tradovateapi.com/v1/websocket',
             WS_LIVE_URL    = 'wss://live.tradovateapi.com/v1/websocket'
      
export const credentials = {
    name:       "Your credentials here",
    password:   "Your credentials here",
    appId:      "Sample App",
    appVersion: "1.0",
    cid:        0,
    sec:        'Your API secret here'
}

export const params = {
    entryVersion: {
        orderId: 0,
        orderQty: 1,
        orderType: 'Market',
        timeInForce: 'Day',
    },
    brackets: [{
        qty: 1,
        profitTarget: 75,
        stopLoss: -33,
        trailingStop: false
    }]
}