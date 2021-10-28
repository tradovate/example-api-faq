import { getAccessToken } from "./getAccessToken"

import { URL, credentials, WS_DEMO_URL } from './data'
import { TradovateSocket } from "./socket/tvSocket"

const syncSocket = new TradovateSocket({debugLabel: 'sync data'})

const main = async () => {

    const { accessToken, userId } = await getAccessToken(URL, credentials)

    await syncSocket.connect(WS_DEMO_URL, accessToken)

    const unsubscribe = await syncSocket.subscribe({
        url: 'user/syncrequest',
        body: { users: [userId] },
        subscription: item => console.log(item)
    })
}

main()


