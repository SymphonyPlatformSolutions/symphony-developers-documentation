# Network Topology

In the following sections, we demonstrate two deployment models: In-cloud and on-premise. For both models, we show figures that represent sets of processes running at a particular IP address. The numbers on the labels indicate the port numbers the API caller uses to make their connections.\


The path names (for example, `/login/pubkey/authenticate`) indicate which APIs are supported by each process.

{% hint style="info" %}
### RSA Authentication&#x20;

For both In-cloud and on-premise deployments, we always recommend the use of RSA Authentication as it is much simpler to implement and offers the same security level as Certificate Authentication
{% endhint %}

## On-premise Deployment

The [agent API](../../building-bots-on-symphony/overview-of-rest-api/agent-api.md) is implemented as a REST API that is served by a process called the **API Agent**. This component, together with the **Key Manager** and the **API Caller** (Bot), executes on the customer's premises. The agent then connects to Symphony's servers via the Internet.

{% hint style="info" %}
For more information on our REST API continue here: [Overview of REST API](../../building-bots-on-symphony/overview-of-rest-api/)
{% endhint %}

The standard configuration requires applications to use HTTP proxies to mediate access between the customer's network and the Symphony cloud.

![](../../.gitbook/assets/0c76114-1\_-\_on-premise-deployment.png)

When authenticating with Certificate, some proxies can be configured to allow connections only on standard port numbers; however, these processes might not reach port 8444 on any IP address in the Symphony pod. In these cases, Symphony can make a separate proxy IP address available to route traffic destined for port 8444 on the pod through port 443 on a different hostname.

The sequence of connections is the same as in the direct connection configuration, except that instead of connecting via two different ports on the same IP address, connections to endpoints go to two separate IP addresses on the same port.

For RSA authentication, the port will always be `443`, therefore a proxy on the Symphony pod is not required.

The following figure shows the same on-premise deployment configuration as the figure above but without the use of a proxy. This configuration will be deprecated soon.

![](../../.gitbook/assets/89db623-1\_-\_on-premise-deployment-legacy.png)

## Security Note

The Symphony REST APIs can be grouped according to where they are implemented. The first part of the path for each method indicates the group that the method belongs to. Each of these groups has a specific network location that it must be accessed from (with the exception of the pod API).

The pod API is implemented on the customer's pod, which is hosted in the cloud. The agent API, which is implemented in the customer’s network, serves as a proxy function for the Pod API: `/pod` methods can be called either on the agent or the pod.

The Symphony session management infrastructure uses two session identifier tokens, the `sessionToken` (also referred to as `skey`) and the `keyManagerToken` (also referred to as `kmsession`). API callers use a two-step authentication process to acquire these tokens.

{% hint style="info" %}
### Authentication

Calling a /pod method requires a sessionToken, which must be presented as part of the HTTP header.  Calling an /agent requires both a sessionoken and a keyManagerToken in HTTP headers.  Continue [here](../../building-bots-on-symphony/authentication/) for more information. &#x20;
{% endhint %}

We recommend you to use the API Agent as a proxy for `/pod` since it automatically removes the key manager token.

If you have not yet deployed the API Agent within your organization, you can call `/pod` endpoints directly on the pod without the API Agent as an intermediary. In this case, the use of the `keyManagerToken` is not required.

Note that as it is not required, if you send the `keyManagerToken` for a /pod call via the API Agent, the API Agent will automatically remove that token from the REST call.

## In-Cloud Deployment

In certain non-production environments (for example, test environments), you can deploy the Key Manager and API Agent processes in the cloud. The cloud-deployed Key Manager and API Agent components have a different network topology than on-premise components.

The network topology is much simpler for in-cloud deployment, and the burden to monitor and update the software is placed on Symphony.

When authenticating with Certificate, you can use the proxy configuration option given below.\
You can use this network configuration if your internal proxies do not allow applications to call processes directly on port 8444.

For RSA Authentication, the port will always be 443, therefore a proxy on the Symphony pod is not required.

![](../../.gitbook/assets/0305bcc-2\_-\_in-cloud-deployment.png)

The following figure shows the same on-cloud deployment configuration but without the use of a proxy. This configuration will be deprecated soon.

![](../../.gitbook/assets/e0ed30e-2\_-\_on-premise-deployment-legacy.png)
