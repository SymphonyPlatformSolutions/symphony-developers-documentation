# FAQ

Please find below a comprehensive resource for admins providing answers to common questions regarding the **Universal Webhook** service, covering technical details, best practices, and operational aspects.

#### 1. Limits and rate-limiting

**Number of configured webhooks**: There are no limits to the number of webhooks per room or per tenant. We continuously monitor the service and depending on the evolution of the usage we may introduce a per-tenant fair use policy in the future if this becomes required to preserve the performance of the platform.

**Number of requests per unit of time**: There is no limit, but requests are placed in a queue. Receiving big number of requests will result in the increase of the latency between the reception of the webhook event and the display of the message in the chat. Once in the queue, the processing of the queued webhook requests is throttled to ensure the scalability and performance of the platform.

#### 2. Message delivery guarantees

**Delivery guarantee for messages**: Messages are delivered exactly once.

**Retry mechanism**: If the API agent or Pod is unavailable when processing a request, the request will be retried later several times.

#### 3. Error handling and HTTP responses

**Response codes and error handling**: If the webhook url is incorrect, an error code is returned to the client. However, due to the asynchronous processing of messages, errors that can only be detected during the processing of the message, such as authentication or invalid payload issues will only be visible in the webhook history, available through the Universal Webhook extension app.&#x20;

The following processing issues would only be visible in the webhook history: Authentication errors, Invalid MessageML payload or JSON mapping, deactivated room, Universal Webhook Bot removed from the chat room.

#### 4. Security and secrets management

Webhook secrets and sensitive data are stored encrypted. You can rotate webhook secrets without deleting and recreating the webhook. Webhook logs or history never contain any part of the request payload or secrets.

#### 6. Network and architecture

**IP ranges**: It is not possible to restrict the IP ranges to validate the incoming webhook requests at this point.

**Deployment models**: The Universal Webhook service is only supported in the Cloud and Dedicated cloud deployment options.

#### 7. Webhook lifecycle and room changes

**Webhook management**: If a end user configured webhooks and is then deactivated (e.g. left the company), another room member will get ownership and be able to control the webhook. Additionally, admins always have the ability to manage the webhooks.

**Room deactivation**: If a webhook is configured in a room, and this room gets deactivated, the webhook is not removed, however any webhook requests sent to that room will return an error. If the room is then reactivated, the webhook will resume working.

**Webhook url lifecycle**: The webhook url never expires. Also, it is currently not possible to change a webhook URL without deleting/recreating the webhook.
