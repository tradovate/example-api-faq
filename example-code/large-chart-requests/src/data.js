export const URL    = 'https://demo.tradovateapi.com/v1',
             MD_URL = 'wss://md.tradovateapi.com/v1/websocket',
             WS_URL = 'wss://demo.tradovateapi.com/v1/websocket'
      
export const credentials = {
    name:       "your credentials here",
    password:   "your credentials here",
    appId:      "Sample App",
    appVersion: "1.0",
    cid:        0,
    sec:        'your sec'
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