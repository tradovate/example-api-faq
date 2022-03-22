# Tradovate API FAQ
### Understanding Core Features of the API

The Tradovate API has a very wide range of features - every bit of functionality available in the Trader Application is built upon the API. Because of the scope of the API, it’s important to take some time to understand how it is structured and what core features are available to prospective developers. 

In an effort to aid in the learning process for new API developers, we’ve prepared a list of articles that covers some of our most frequently asked questions.

[How is the Tradovate API Partitioned?](https://github.com/tradovate/example-api-faq/tree/main/docs/HowIsTheTradovateApiPartitioned.md) (or What is the Purpose of the Tradovate Subdomains?)

[REST API vs WebSocket API](https://github.com/tradovate/example-api-faq/tree/main/docs/RestApiVsWebSocketApi.md)

[How Does Tradovate Limit Requests and Data?](https://github.com/tradovate/example-api-faq/tree/main/docs/HowDoesTradovateLimitRequestsAndData.md)

[How to Handle Data Size Limits](https://github.com/tradovate/example-api-faq/tree/main/docs/HowToHandleDataSizeLimits.md)

[How to Handle Request Rate Limits](https://github.com/tradovate/example-api-faq/tree/main/docs/HowToHandleRequestLimits.md)

[What is the Entity System and How Does it Work?](https://github.com/tradovate/example-api-faq/tree/main/docs/WhatIsTheEntitySystemAndHowDoesItWork.md)

[Undertanding Device IDs](https://github.com/tradovate/example-api-faq/tree/main/docs/UnderstandingDeviceId.md)

### Sample Code

Included in the `example-code` directory are a few pre-built solutions for common tasks. The current line-up includes:

[large-chart-requests](https://github.com/tradovate/example-api-faq/tree/main/example-code/large-chart-requests) - An example of how to retrieve very large sets of data using the Market Data API.

[user-sync-request](https://github.com/tradovate/example-api-faq/tree/main/example-code/user-sync-request) - An example of how to intercept user events by using the `user/syncrequest` endpoint.

[start-an-order-strategy](https://github.com/tradovate/example-api-faq/tree/main/example-code/start-an-order-strategy) - By popular demand, here is an example of how to start an order strategy using the `orderstrategy/startorderstrategy` endpoint. Press the button to run the order, modify the order in the `data.js` file.
