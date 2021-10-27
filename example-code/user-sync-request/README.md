# User Sync Request

This is a working sample that allows a client to subscribe to user updates. To use this project, clone the repo and navigate to the containing folder using the command line. Be sure to navigate to this project's containing folder (`user-sync-request`). Then run this command:

```
yarn install
```

You can then run the application using this command:

```
yarn start
```

Be sure to fill out your credentials in the `data.js` file. Once the app is running, open your dev tools to see the websocket log its messages. If you were to have trades happening, you'd be able to see the updates for your positions and cashbalances coming in via this subscription. The initial response of this subscription is an object that contains all your current user data at the time of this subscription's start.