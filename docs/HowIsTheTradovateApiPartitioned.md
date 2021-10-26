# How is the Tradovate API Partitioned?

A major concept of the API is partitioned functionality. Each base URL represents a different part of the API’s set of features. There are two main paths that we can use the API by:

* **The Tradovate REST API**
* **The Tradovate WebSocket API**

### Rest API
The **REST API** is a classic web API. The client makes HTTP requests to the appropriate URL endpoint, and if the request was formatted correctly it will succeed, possibly returning some relevant data back to the client. 

Here are the base URLs associated with the REST API:

`https://demo.tradovateapi.com/v1`
`https://live.tradovateapi.com/v1`

The difference between these base URLs is which environment the endpoints you call will run in. The **demo** environment runs in simulation mode - this is a demo account; it uses fake money, but the market data is real - whereas the **live** environment uses your real, funded account for making trades. A developer could run his or her tests through simulation mode as long as he or she wants to, allowing a smooth transition to a funded account.

### WebSocket API
The **WebSocket API** is a set of WebSocket-based services that a client may connect to in order to receive real-time data in an event-driven manner. Typically the connected client sends messages via the WebSocket to start or stop real-time subscriptions. However, the WebSocket servers are also designed to mimic the REST API, so a client could send whatever requests are appropriate for the type of WebSocket configured. 

>**Note**: *to use the WebSocket API you still need to be authenticated and retrieve an Access Token using the REST API - these domains are not alternatives to one another, just different features.*

The WebSocket API itself covers three separate domains:

1. The standard **Real-Time API**. This is mainly for listening to the real-time user synchronization subscription (user/syncRequest). This is located at the URL `wss://demo.tradovateapi.com/v1/websocket` or `wss://live.tradovateapi.com/v1/websocket` for simulation or live functionality, respectively.

2. The **Market Data API**. This is located at `wss://md.tradovateapi.com/v1/websocket`. You can subscribe to real-time quotes, DOMs, charts, and histogram data from this type of socket.

3. The **Market Replay API**. This is located at `wss://replay.tradovateapi.com/v1/websocket`. A Market Replay socket allows a client to subscribe to a certain timeframe and ‘replay’ that timeframe. This is not just historical chart data, but all of the DOM and market data for this time period, as well as an interactive session that a client can trade in as if it were live.
