# REST API vs WebSocket API

Because the REST and WebSocket APIs are split up by functionality, it follows that the optimal use cases for either API will vary. Here are some common examples of when to choose the REST API and when to choose a WebSocket.

### When to Use the REST API
* Authentication - you can only authenticate your application for API access using the REST API’s auth/accessTokenRequest using your Tradovate credentials and one of your personal secret keys.

* Non-subscribing requests - If you want to place an order, find an entity by ID, or search for an entity by name, it is perfectly acceptable to do so using the REST API. There are even options for batch-loading large requests using the /ldeps endpoints.

* OAuth - If you’d like to opt for authentication via OAuth, it is appropriate to use the REST API.

* Changing Account Risk status - creating or modifying risk limits are non-subscribing and can be acceptably called from the REST API.

### When to Use the WebSockets API
* Listening to user property events - anytime we create or modify a user property (entering a position, executing a command, filling an order, changes to cash-balance, and many more) we can listen to them using a Real-Time socket and subscribing to the user/syncRequest endpoint.

* Getting Market Data - when we want to receive quote, DOM, chart, or histogram data in real-time.

* Starting a Market Replay session.

* Finding a change in user data in response to performing an action. Scenario: You’ve placed an order and now you want to find what your new position is. You can try to find the position itself via REST API, but it would be more efficient to listen to the real-time user properties events and wait for a Position update. This way we can be ‘reactive’ to incoming data instead of always looking out and asking in a client-driven manner.
