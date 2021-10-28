import { getAccessToken } from "./getAccessToken"

import { URL, credentials, params, WS_DEMO_URL } from './data'
import { TradovateSocket } from "./socket/tvSocket"
import { tvGet } from "./socket/services"

const syncSocket = new TradovateSocket({debugLabel: 'sync data'})

const main = async () => {

    const { accessToken } = await getAccessToken(URL, credentials)

    const accounts = await tvGet('/account/list')

    await syncSocket.connect(WS_DEMO_URL, accessToken)

    const button = document.createElement('button')
    button.innerText = 'Start order.'
    button.addEventListener('click', async () => {
        const response = await syncSocket.send({
            url: 'orderStrategy/startOrderStrategy',
            body: {
                symbol: "MNQZ1",
                accountId: accounts[0].id,
                action: "Buy",
                orderStrategyTypeId: 2,
                params: JSON.stringify(params)
            }
        })
    
        console.log(response)
    })
    
    document.body.append(button)    
}

main()


