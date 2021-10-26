export const URL    = 'https://demo-d.tradovateapi.com/v1',
             MD_URL = 'wss://md-d.tradovateapi.com/v1/websocket',
             WS_URL = 'wss://demo-d.tradovateapi.com/v1/websocket'
      
export const credentials = {
    name:       "alennert02@gmail.com",
    password:   "YumD00d24!",
    appId:      "Sample App",
    appVersion: "1.0",
    cid:        8,
    sec:        'f03741b6-f634-48d6-9308-c8fb871150c2'
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