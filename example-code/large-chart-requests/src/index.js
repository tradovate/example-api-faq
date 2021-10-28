import { getAccessToken } from "./getAccessToken"

import { URL, MD_URL, credentials, getChartBody } from './data'
import { TradovateSocket } from "./socket/tvSocket"
import { getAllBars } from "./socket/getAllBars"

const ws = new TradovateSocket({debugLabel: 'market data'})

const main = async () => {

    const { mdAccessToken } = await getAccessToken(URL, credentials)

    await ws.connect(MD_URL, mdAccessToken)
    
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

