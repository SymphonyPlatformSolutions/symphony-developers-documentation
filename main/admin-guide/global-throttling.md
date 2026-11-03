# Global Throttling

Global HTTPS transaction throttling is performed on all endpoints in the pod collectively (private, public, and UI assets etc).

Global throttling is by _source-ip_ and the scale is dictated directly by the size of the pod.\
The number of app nodes in the pod determines the _per-source-ip_ throttle. Specifically, it is set at 400 req/s per source ip, per application node.

The _source-ip_ used may be limited to the number of egress proxy-server or firewalls from a customer site.\
Depending on the customer infrastructure, this can be a small or large set depending on if they are doing NAT or other proxying, and individual developers behind the customer infrastructure may all share the same _source-ip_.

### Circuit breakers

Individual specific core (private) APIs have other circuit breakers in place to limit how many simultaneous transactions can be in-flight. These are typically added to particularly expensive APIs.

The following categories of APIs have circuit breakers:

• **Search APIs** (e.g. FilterQuery) – A maximum number of simultaneous requests to different search APIs. It is typically either 50 or 100 simultaneously per app node.

• **Conversations APIs** – Maximum simultaneous requests of 200 per app node.\
It is the max limit that the current version can support.

{% hint style="info" %}
Note: Changing any of these is best achieved by scaling the pod as these limits were chose to protect the stability of the current software. &#x20;
{% endhint %}

### Endpoint Throttling

Certain endpoints return a 429 status code if the pod is experiencing an excessive load. The response contains a Retry-After header which contains the number of seconds the client should wait before attempting a new request.

This throttling mechanism is based on an adaptive algorithm that attempts to maintain a certain target latency for the endpoint. If the average latency exceeds the configured threshold, the service will reduce the number of concurrent requests that it will allow.

In general, the application should be written to expect a 429 from any endpoint and to honor the Retry-After header.

### Extra information and examples

1. App nodes = number of tomcat servers. App node is a tomcat node and each tomcat has its own Nginx.
2. If a customer exposes 5 public IPs at his FW and has a 3m, his max req rate will be `400*3*5 = 6,000` req/s max.\
   If the customer has 3 egress points with a C-class range and a 5m (5 app nodes), his max request will be `400*3*254*5 = 1,524,000` req/s.\
   In this case, all outbound traffic from the customer is equally spread across possible IPs. The pod is aware of the number of requests received from each IP, not of how many IPs could be sending requests.
3. For roaming users, for most of the enterprise customers, the mobile users cannot connect directly to the pod, they have to go through the customer's network (e.g. VPN).
