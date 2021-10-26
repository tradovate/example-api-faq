import { waitForMs } from "../utils/waitForMs"

/**
 * 
 */
export function TradovateSocket({debugLabel = 'tvSocket'} = {}) {
    let counter = 0
    let curTime = new Date()

    this.ws = null
    this.connected = false
    this.listeners = []

    this.connect = async function(url, token) {
        console.log('connecting...')
        const self = this

        return new Promise((res, rej) => {
            this.ws = new WebSocket(url)

            //long running
            this.ws.addEventListener('message', function onEvents(msg) {
                curTime = checkHeartbeats(self.ws, curTime)
                const [T, data] = prepareMessage(msg.data)
                
                console.log(debugLabel + '\n', T, data)

                if(T === 'a' && data && data.length > 0) {
                    self.listeners.forEach(listener => data.forEach(listener))
                }
            })

            //auth only
            this.ws.addEventListener('message', function onConnect(msg) {
                const [T, _] = prepareMessage(msg.data)
                if(T === 'o') {
                    self.send({
                        url: 'authorize',
                        body: token,
                        onResponse: _ => {
                            self.ws.removeEventListener('message', onConnect)
                            res()
                        },
                        onReject: rej
                    })
                }
            })
        })
    }

    this.subscribe = async function({url, body, subscription}) {
        const self = this

        let removeListener = async () => {}
        let cancelUrl = ''
        
        let [response] = await self.send({url, body})

        if(response.d['p-ticket']) {
            await waitForMs(response.d['p-time']*1000)
            let [nextResponse] = await self.send({url, body: {...body, 'p-ticket': response.d['p-ticket']}})
            response = nextResponse
        }

        const realtimeId = response?.d?.realtimeId
        
        console.log(realtimeId)

        return new Promise((res, rej) => {
            //if(!(response && !response.d)) rej(`Couldn't retrieve realtimeId from the response.`)

            removeListener = self.addListener(data => {
                switch(url.toLowerCase()) {
                    case 'md/getchart': {
                        cancelUrl = 'md/cancelChart'
                        data.d.charts.forEach(chart => chart.id === realtimeId ? subscription(chart) : noop())
                        break
                    }
                    case 'md/subscribedom': {
                        cancelUrl = 'md/unsubscribeDom'
                        data.d.doms.forEach(dom => dom.id === realtimeId ? subscription(dom) : noop())
                        break
                    }
                    case 'md/subscribequote': {
                        cancelUrl = 'md/ubsubscribequote'
                        data.d.quotes.forEach(quote => quote.id === realtimeId ? subscription(quote) : noop())
                        break
                    }
                    case 'md/subscribehistogram': {
                        cancelUrl = 'md/ubsubscribehistogram'
                        data.d.histograms.forEach(histogram => histogram.id === realtimeId ? subscription(histogram) : noop())
                        break
                    }
                    case 'user/syncrequest': {
                        if(data?.d?.users || data?.e === 'props') {
                            subscription(data.d)
                        } 
                            
                        break
                    }
                }
            })

            res(async () => {
                removeListener()
                if(cancelUrl && cancelUrl !== '') {
                    await self.send({ url: cancelUrl, body: { subscriptionId: realtimeId } })
                }
            })
        })
    }

    this.send = async function({url, query, body, onResponse, onReject}) {
        const self = this

        return new Promise((res, rej) => {
            const id = ++counter
            let retval
            self.ws.addEventListener('message', function onEvent(msg) {
                const [_, data] = prepareMessage(msg.data)
                retval = data.filter(({i}) => i && i === id) || []
                data.filter(({i}) => i && i === id)
                    .forEach(item => {
                        if(item.s === 200) {
                            onResponse?.call(null, item.d)
                            self.ws.removeEventListener('message', onEvent)
                            res(retval)
                        } else {
                            self.ws.removeEventListener('message', onEvent)
                            onReject?.call(null)
                            rej(`\nFAILED:\n\toperation '${url}'\n\tquery ${JSON.stringify(query, null, 2)}\n\tbody ${JSON.stringify(body, null, 2)}\n\treason '${item.d?.errorText || 'unknown'}'`)
                        }
                    }
                )
            })
            this.ws.send(`${url}\n${id}\n${query || ''}\n${JSON.stringify(body)}`)
        })
    }

    this.addListener = function(listener) {
        this.listeners.push(listener)
        return () => this.listeners.splice(this.listeners.indexOf(listener), 1)
    }
}

function checkHeartbeats(socket, curTime) {
    const now = new Date() //time at call of onmessage

    if(now.getTime() - curTime.getTime() >= 2500) {
        socket.send('[]')
        return new Date()    //set the new base time
    }
    
    return curTime
}

function prepareMessage(raw) {
    const T = raw.slice(0, 1)
    const data = raw.length > 1 ? JSON.parse(raw.slice(1)) : []

    return [T, data]
}