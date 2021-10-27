# Large Chart Requests

This is a working sample that allows a client to retrieve large sets of data. To use this project, clone the repo and navigate to the containing folder using the command line. Be sure to navigate to this project's containing folder (`large-chart-requests`). Then run this command:

```
yarn install
```

Be sure to fill out your credentials in the  `data.js` file. You can also modify the chart request. Using the `@` prefix in the `symbol` field allows us to read continuous chart data. The `asFarAsTimestamp` field controls the oldest date you'd like to read to. When you are satisfied with the content of `data.js` you can `yarn start` to start the application. It will render a simple candlestick chart once it has composited all the requests' data.

>**Please Note**: *The default data will take a really, really long time to retrieve (depending on your data set size and web connection, 5 minutes or more) - so don't get frustrated if you don't see anything rendering. If you want to watch the retrieval happen, be sure to open your browser's devtools. At the end it will render a very simple OHLC candlestick chart with the retrieved data.*