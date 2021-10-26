import { getAccessToken } from "./getAccessToken"

import { URL, MD_URL, credentials, getChartBody, WS_URL } from './data'
import { TradovateSocket } from "./socket/tvSocket"
import { getAllBars } from "./socket/getAllBars"

const ws = new TradovateSocket({debugLabel: 'market data'})
const syncSocket = new TradovateSocket({debugLabel: 'sync data'})

const main = async () => {

    const { accessToken, mdAccessToken, userId, name } = await getAccessToken(URL, credentials)

    await ws.connect(MD_URL, mdAccessToken)
    await syncSocket.connect(WS_URL, accessToken)

    syncSocket.subscribe({
        url: 'user/syncrequest',
        body: { users: [userId] }
    })

    let result = []
    
    await getAllBars({ 
        socket: ws, 
        array: result,
        chartBody: getChartBody, 
        asFarAsTimestamp: new Date('2019-10-07').toJSON(),
        renderer: () => getRegularChart(getChartBody.symbol, result).render()
    })
}

main()

function getRegularChart(symbol, array) {
    return new CanvasJS.StockChart("outlet", {
        title: {
            text: `${symbol} Chart`
        },
        charts: [
            {      
                data: [
                {        
                    type: "candlestick",
                    dataPoints : array
                }
            ]
        }]
    })
}

