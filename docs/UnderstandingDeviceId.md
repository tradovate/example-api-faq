# Understanding Device IDs

One of the most common problems that people encounter when using the Tradovate API originates with device IDs. Here's an example of what can happen:

> You're finally ready to make the move from simulation mode to live mode. Everything works flawlessly in demo, and orders place just fine. While running your live test, your application suddenly errs when the server throws a 401 error on an attempt to place an order. What happened?

90% of cases involving this error are because of a misuse of device ID. To explain, let's go over what device IDs are used for and how they work.

## What is a Device ID?

The Device ID is a unique identifier that is associated with the device by which you are attempting to access the Tradovate API. So PC `A` will have a different Device ID than PC `B`. A Device ID must have two qualities:

1. A Device ID must be unique. There should never be two devices with the same ID.
2. A Device ID for a given device must always be the same for that device. The ID identifies the device in question, and it should be able to do so permanently. This way, even a malicious user with your credentials would not be able to use your account to trade without matching your PC's device ID as well.

 When an API endpoint is accessed, device ID is checked. In our example case, we see that `/order/placeOrder` is protected. **It should be noted, that in simulation mode, device ID contraints are less strict than in live mode.** This is one of the only real differences between the simulation and live protocols.

 ## How Can I Make a Device ID

There are libraries that already tackle this task. If you use JavaScript, you can refer to [device-uuid](https://www.npmjs.com/package/device-uuid). For C#, you can use Mathew King's [DeviceId](https://github.com/MatthewKing/DeviceId) library. 

You can also create your own method of identifying a device fairly easily. If you're using Node for your application, you can use the built-in crypto package:

```js
const crypto = require('crypto')

const myUID = crypto.createHash('sha256')
    .update(username)
    .update(password)
    .update(secret)
    .digest('hex')
```

This code will set the `myUID` variable equal to a SHA-256 hash in hex format (a 64 character string). The hash is based on some arbitrary, but non-changing fields - `username`, `password`, and some kind of app-specific `secret`. This is one easy (albeit, somewhat naive) way to create device IDs that will work to actually identify a device. Keep in mind, you can use whatever fields you want as long as they don't change.