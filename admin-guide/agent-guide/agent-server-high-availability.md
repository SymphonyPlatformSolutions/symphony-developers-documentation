---
hidden: true
---

# Agent Server High Availability

{% hint style="warning" %}
This page is not maintained anymore. The Agent guide is available in [Symphony Docs](https://docs.symphony.com/posts/5576418-agent-api-guide).
{% endhint %}

Below is a quick guide on the load balancer rules to apply when hosting multiple Agent servers behind a load balancer.

## Load Balancing Administration and Messaging API Calls

Symphony Administration and messaging API calls are stateless. These types of requests can be forwarded to any Agent server that is available:

<table data-header-hidden><thead><tr><th width="236">VIP Name</th><th width="65">SSL Offload</th><th width="67">Persistent Sessions</th><th width="82">Balance Method</th><th width="57">Sticky</th><th>Server List</th></tr></thead><tbody><tr><td>VIP Name</td><td>SSL Offload</td><td>Persistent Sessions</td><td>Balance Method</td><td>Sticky</td><td>Server List</td></tr><tr><td><code>agent.company.com:443</code><br><br><strong>Description</strong>: Rule for the FQDN host domain of the Agent server(s). This value should also be configured in your agent.properties settings e.g:<br><code>agent.host: localhost agent.https.port:8443</code><br><br>URI paths that are sent to the Agent servers are:<br><code>/agent /pod</code></td><td>Yes</td><td>*No</td><td>Round Robin</td><td>No</td><td><p><code>agent-server1:8443/HTTPS agent-server2:8443/HTTPS</code><br><br><strong>Health-Check</strong>: https://agent-server:8443/agent/v3/health</p><p><br><em>See</em> <a href="https://developers.symphony.com/restapi/main/info-health-check/health-check-v3"><em>Health Check</em></a> <em>endpoint documentation for more details on the payload (code + message) received</em></p></td></tr></tbody></table>

{% hint style="info" %}
The above applies for non real-time events and messaging API calls (e.g. /agent/v4/datafeed)
{% endhint %}

## Load Balancing Real Time Events and Messaging

Real-time messaging API calls (e.g. _Datafeed_) are session-based. Once a Datafeed is created on an Agent server host, subsequent API calls must be made to the same Agent server host.

## Managing Session Persistence Using a Load Balancer

If you are using an F5 type load balancer, you can load balance requests to the same Agent server host by using one of the following:

* **source-ip**: Directs API session requests to the same Agent server based solely on the source IP address of the calling application/bot.
* **cookie-injection**: Initial API session request is injected with an HTTP cookie. This cookie is stored by the calling application/bot to ensure subsequent API calls connect to the same Agent to which the server previously connected.

<table data-header-hidden><thead><tr><th width="254">VIP Name</th><th width="65">SSL Offload</th><th>Persistent Sessions</th><th width="72">Balance Method</th><th width="54">Sticky</th><th>Server List</th></tr></thead><tbody><tr><td>VIP Name</td><td>SSL Offload</td><td>Persistent Sessions</td><td>Balance Method</td><td>Sticky</td><td>Server List</td></tr><tr><td><code>agent.company.com:443</code><br><br><strong>Description</strong>: Rule for the FQDN host domain of the Agent server(s). This value should also be configured in your agent.properties settings e.g:<br><code>agent.host: localhost agent.https.port:8443</code><br><br>URI paths that are sent to the Agent servers are:<br><code>/agent /pod</code></td><td>Yes</td><td>Yes<br>(source-ip or cookie-injection)</td><td>Round Robin</td><td>Yes</td><td><code>agent-server1:8443/HTTPS agent-server2:8443/HTTPS</code><br><br><strong>Health-Check</strong>: https://agent-server:8443/agent/v3/health<br><em>See</em> <a href="https://developers.symphony.com/restapi/main/info-health-check/health-check-v3"><em>Health Check</em></a> <em>endpoint documentation for more details on the payload (code + message) received</em></td></tr></tbody></table>

### Managing Session Persistence Using a DNS-Based Load Balancer

If you are using a DNS based load balancer, you can load balance requests to the same physical Agent server host by using DNS resolution.

When you access the FQDN for the Agent server farm, DNS resolution gives you a physical Agent server host to which you can connect. Your application should make note of this physical Agent server host and forward all subsequent API calls to this Agent server.

{% hint style="info" %}
### Java DNS Caching<br>

Oracle Java has a tendency to cache DNS resolution entries which will affect the above. When Java caches the DNS records your application/bot would continue to be sent to whichever host is stored in the DNS cache. To turn off Java DNS caching please edit the below file
{% endhint %}

Ensure the following values are set

```
networkaddress.cache.ttl = 0
networkaddress.cache.negative.ttl = 0
```

## Managing an Agent Server Host Failure

If an Agent server host fails, your application must manage the re-establishment of the connection. A failover from one server to another would require your application to re-establish a new datafeed channel.

{% hint style="info" %}
Note: The Agent server itself is not session aware.
{% endhint %}

