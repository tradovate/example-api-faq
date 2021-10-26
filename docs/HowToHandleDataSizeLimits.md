# How to Handle Data Size Limits
The Tradovate API imposes flexible data size limits per request. There is no ‘hard-cap’ on data batch size; what may be the limit one day can change on another day. To get more than the maximum batched amount of data per request, you’ll simply have to make more requests. Imagine this scenario:

* A client wants to gather 1-minute chart data over the last 3 years.

* The client authenticates their application, and then authorizes a WebSocket connection to the Market Data URL.

* The client attempts a md/getChart request to retrieve data from dates three years apart, however only the last several months of data arrives. This is because the maximum amount of data transmitted by the response has been reached.

In order to get more data than the maximum amount per request, we must make several requests and track their timestamps to get the complete set of data. Assuming the client is running a WebSocket connected to the Market Data URL, we could solve the problem described above by doing the following:

* However your application catches messages from the WebSocket server, you will need to make sure you add a condition to account for the end-of-history object. It looks like this if you parse it to a JS native object:

```js
{
    id: 123456789 //the realtimeId of the getChart subscription
    eoh: true
}
```

* You’ll also need to keep track of the data you’ve gathered so far. It’s probably a good idea to keep all of the `chart.bars` array data.

* When you receive the end-of-history object, you will need to look at the gathered bars and sort them by timestamp. You need to find the oldest bar, and start a new subscription using its timestamp as the closestTimestamp field in md/getChart’s body.

```js
{
    closestTimestamp: oldestBar.timestamp,
    asFarAsTimestamp: targetDate //in our example, 3 years ago
}
```
* Wait for the next end-of-history object. If the oldest bar’s timestamp is equal to the target date, break out of the loop or resolve the chain of promises with the gathered data. Otherwise repeat the above steps until the oldest bar is your target date.

Also see the [large-chart-request project](https://github.com/tradovate/example-api-faq/tree/main/example-code/large-chart-requests) for an example of how to request large data sets in JavaScript.