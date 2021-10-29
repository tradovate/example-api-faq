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
        subscription: item => {
            if(item.users) {
                //this is the initial response. You will get any of these fields in the response
                const { 
                    accountRiskStatuses,
                    accounts,
                    cashBalances,
                    commandReports,
                    commands,
                    contractGroups,
                    contractMaturities,
                    contracts,
                    currencies,
                    exchanges,
                    executionReports,
                    fillPairs,
                    fills,
                    marginSnapshots,
                    orderStrategies, 
                    orderStrategyLinks,
                    orderStrategyTypes,
                    orderVersions,
                    orders,
                    positions,
                    products,
                    properties,
                    spreadDefinitions,
                    userAccountAutoLiqs,
                    userPlugins,
                    userProperties,
                    userReadStatuses,
                    users        
                } = item
                console.log(`initial response:\n${JSON.stringify(item, null, 2)}`)
            } else {
                //otherwise this is a user data event, they look like this
                const { entityType, entity, eventType } = item
                console.log(`update event:\n${JSON.stringify(item, null, 2)}`)
            }
        }
    })
}

main()


