# Agent Server High Availability

Below is a quick guide on the load balancer rules to apply when hosting multiple Agent servers behind a load balancer.

## Load Balancing Administration and Messaging API Calls

Symphony Administration and messaging API calls are stateless. These types of requests can be forwarded to any Agent server that is available:

<table>
  <thead>
    <tr>
      <th style="text-align:left">VIP Name</th>
      <th style="text-align:left">SSL Offload</th>
      <th style="text-align:left">Persistent Sessions</th>
      <th style="text-align:left">Balance Method</th>
      <th style="text-align:left">Sticky</th>
      <th style="text-align:left">Server List</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>agent.company.com:443</code>
        <br />
        <br /><b>Description</b>: Rule for the FQDN host domain of the Agent server(s).
        This value should also be configured in your agent.properties settings
        e.g:
        <br /><code>agent.host: localhost agent.https.port:8443</code>
        <br />
        <br />URI paths that are sent to the Agent servers are:
        <br /><code>/agent /pod</code>
      </td>
      <td style="text-align:left">Yes</td>
      <td style="text-align:left">*No</td>
      <td style="text-align:left">Round Robin</td>
      <td style="text-align:left">No</td>
      <td style="text-align:left">
        <p><code>agent-server1:8443/HTTPS agent-server2:8443/HTTPS</code>
          <br />
          <br /><b>Health-Check</b>: https://agent-server:8443/agent/v3/health</p>
        <p>
          <br /><em>See </em><a href="https://developers.symphony.com/restapi/reference#health-check-v3"><em>Health Check</em></a><em> endpoint documentation for more details on the payload (code + message) received</em>
        </p>
      </td>
    </tr>
  </tbody>
</table>

{% hint style="info" %}
The above applies for non real-time events and messaging API calls \(e.g. /agent/v4/datafeed\)
{% endhint %}

## Load Balancing Real Time Events and Messaging

Real-time messaging API calls \(e.g. _Datafeed_\) are session-based. Once a Datafeed is created on an Agent server host, subsequent API calls must be made to the same Agent server host.

## Managing Session Persistence Using a Load Balancer

If you are using an F5 type load balancer, you can load balance requests to the same Agent server host by using one of the following:

* **source-ip**: Directs API session requests to the same Agent server based solely on the source IP address of the calling application/bot.
* **cookie-injection**: Initial API session request is injected with an HTTP cookie. This cookie is stored by the calling application/bot to ensure subsequent API calls connect to the same Agent to which the server previously connected.

| VIP Name | SSL Offload | Persistent Sessions | Balance Method | Sticky | Server List |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `agent.company.com:443`  **Description**: Rule for the FQDN host domain of the Agent server\(s\). This value should also be configured in your agent.properties settings e.g: `agent.host: localhost agent.https.port:8443`  URI paths that are sent to the Agent servers are: `/agent /pod` | Yes | Yes \(source-ip or cookie-injection\) | Round Robin | Yes | `agent-server1:8443/HTTPS agent-server2:8443/HTTPS`  **Health-Check**: https://agent-server:8443/agent/v3/health _See_ [_Health Check_](https://developers.symphony.com/restapi/reference#health-check-v3) _endpoint documentation for more details on the payload \(code + message\) received_ |

### Managing Session Persistence Using a DNS-Based Load Balancer

If you are using a DNS based load balancer, you can load balance requests to the same physical Agent server host by using DNS resolution.

When you access the FQDN for the Agent server farm, DNS resolution gives you a physical Agent server host to which you can connect. Your application should make note of this physical Agent server host and forward all subsequent API calls to this Agent server.

{% hint style="info" %}
### Java DNS Caching 

Oracle Java has a tendency to cache DNS resolution entries which will affect the above. When Java caches the DNS records your application/bot would continue to be sent to whichever host is stored in the DNS cache. To turn off Java DNS caching please edit the below file
{% endhint %}

Ensure the following values are set

```text
networkaddress.cache.ttl = 0
networkaddress.cache.negative.ttl = 0
```

## Managing an Agent Server Host Failure

If an Agent server host fails, your application must manage the re-establishment of the connection. A failover from one server to another would require your application to re-establish a new datafeed channel.

{% hint style="info" %}
Note: The Agent server itself is not session aware.
{% endhint %}



