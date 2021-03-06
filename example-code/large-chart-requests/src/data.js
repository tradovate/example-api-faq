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

export const getChartBody = {
    symbol: '@NQ',
    chartDescription: {
        underlyingType: 'MinuteBar',
        elementSize: 60,
        elementSizeUnit: 'UnderlyingUnits',
        withHistogram: false,
    },
    timeRange: {
        asFarAsTimestamp: new Date('2018-10-07').toJSON(),
        closestTimestamp: new Date().toJSON()
    }
}