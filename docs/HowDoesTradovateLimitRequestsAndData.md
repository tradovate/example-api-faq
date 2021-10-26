# How Does Tradovate Limit Requests and Data?

To prevent people from launching malicious attacks on our servers, we employ both request-rate limits and response size limits. We have request limit thresholds at the hour, minute, and second intervals. We also limit data size by restricting the number of entities that one request can return. To maintain a strong defense and stay flexible at the same time, **there is no ‘hard-cap’ on request rate or data size limits**. Instead these values are variable. *This is fully intentional*.  Where a limit on data size could be 1024 entities one day, another day it may make more sense to limit the data size to 2048 or 4096 entities. The same goes for request rate limits - one hour it could be 10 requests per minute on a given endpoint, and another time it could be 100. We must accept this fact and write programs that handle variable limitations gracefully and responsibly.

There are at least two good reasons to stay flexible when it comes to our limitations:

1. The web and the ways we consume data are always changing. A flexible cap grants us the ability to adapt.

2. Vandals and bad actors exist. Our limits are a powerful line of defense against attacks and errors, intentional or otherwise.

Also see:

[How to Handle Request Limits](https://github.com/tradovate/example-api-faq/tree/main/tree/main/docs/HowToHandleRequestLimits.md)

[How to Handle Data Size Limits](https://github.com/tradovate/example-api-faq/tree/main/tree/main/docs/HowToHandleDataSizeLimits.md)

