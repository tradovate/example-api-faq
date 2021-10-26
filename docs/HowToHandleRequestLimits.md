# How to Handle Request Limits
It’s likely that at some point, despite your best efforts, you’ll get a time penalty response during the course of writing programs that utilize the Tradovate API. This is perfectly OK, is an intentional response, and can be handled fairly easily. Here is a scenario:

* Your program sends a request to modify a working order’s price based on a condition. By some market movement the programmer may not have accounted for, this condition becomes triggered many times within just a few seconds.

* Instead of the typical response, you receive a response with the `p-ticket` and `p-time` fields. The server has determined that a threshold has been reached and issues the time penalty response. 

>Note: *If you receive an object with a `p-captcha` field, this means a third party application cannot complete the request and clients should be directed to try again in an hour.* 

To handle the above scenario, we simply need to use the p-time field to determine the time in seconds before we can make a request again. When we retry the request we should include p-ticket as an additional field in the request body (including the original body fields). 
 
```js
const URL = `https://demo.tradovateapi.com/v1`

//we can simulate too many requests by putting them in a loop
const simulatePenalty = async () => {
    let penaltyResponse, okResponse

    //this would be a really bad idea in a non-demo scenario!
    for(let i = 0; i < 100; i++) {
        penaltyResponse = await fetch(URL + `/order/placeOrder`, {
            accountSpec: yourUserName,
             accountId: yourAcctId,
             action: "Buy",
             symbol: "MYMM1",
             orderQty: 1,
             orderType: "Market",
             isAutomated: true
        })
        if(penaltyResponse["p-ticket"]) {
            break //exit loop on penalty response received
        }
    }
    const pTime    = penaltyResponse["p-time"],
          pTicket  = penaltyResponse["p-ticket"],
          pCaptcha = penaltyResponse["p-captcha"]
    
    if(pCaptcha) {
        console.error("Captcha required. Please try again in 1 hour.")
	   return
    }
    console.log(`Trying again in ${pTime} seconds...`)
    const timeout = setTimeout(() => {
        okResponse = await fetch(URL + `/order/placeOrder`, {
           accountSpec: yourUserName,
            accountId: yourAcctId,
            action: "Buy",
            symbol: "MYMM1",
            orderQty: 1,
            orderType: "Market",
            isAutomated: true,
            "p-ticket": pTicket            
        })
    }, 1000 * pTime)
   
    console.log(okResponse)
}

simulatePenalty()
```
