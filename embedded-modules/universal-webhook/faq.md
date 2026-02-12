# FAQ

Please find below a comprehensive resource for administrators, offering answers to frequently asked questions about the **Universal Webhook** service. This covers technical specifications, recommended practices, and operational details.

#### 1. Limits and Rate-Limiting

**Number of configured webhooks**: There are no limits on the number of webhooks per room or per tenant. We continuously monitor the service, and a per-tenant fair use policy may be introduced in the future if necessary to maintain platform performance.

**Number of requests per unit of time**: While there is no strict limit on the number of requests, all incoming requests are placed in a queue. A large volume of requests will increase the latency between the moment the webhook event is received and the message is displayed in the chat. Once queued, the processing of webhook requests is throttled to ensure the platform's scalability and performance.

#### 2. Message Delivery Guarantees

**Delivery guarantee for messages**: Messages are delivered exactly once.

**Retry mechanism**: If the API agent or Pod is unavailable during the processing of a request, the request will be retried several times at a later time.

#### 3. Error Handling and HTTP Responses

**Response codes and error handling**: The Universal Webhook service queues the incoming requests for performance and reliability. This means that the processing of incoming requests is done asynchronously.&#x20;

If the webhook request is successfully added to the queue, then the 200 code is returned to the client.&#x20;

Some errors are detected only when the request is processed, after the HTTP response has already been closed. These processing errors include the following errors: Authentication issue, invalid message payload, invalid template, deactivated room, absence of the Webhook bot in the target chat.

To diagnose an issue or to monitor the service, the Webhook owners or the Symphony Admins can access the log of all incoming requests through the Webhook history, available in the Universal Webhook extension app.&#x20;

#### 4. Security and Secrets Management

Webhook secrets and sensitive data are stored encrypted. Administrators can rotate webhook secrets without needing to delete and recreate the webhook. Webhook logs or history will never contain any part of the request payload or secrets.

#### 5. Network and Architecture

**IP ranges**: It is currently not possible to restrict the IP ranges to validate incoming webhook requests.

**Deployment models**: The Universal Webhook service is only supported in the Cloud and Dedicated cloud deployment options.

#### 6. Webhook Lifecycle and Room Changes

**Webhook management**: If an end user who configured webhooks is subsequently deactivated (e.g., leaves the company), ownership will be transferred to another room member, who will then be able to control the webhook. Additionally, administrators always retain the ability to manage all webhooks.

**Room deactivation**: If a webhook is configured in a room that is then deactivated, the webhook is not automatically removed. However, any webhook requests sent to that room will return an error. If the room is later reactivated, the webhook will resume working.

**Webhook URL lifecycle**: The webhook URL never expires. If you want to change the URL of a webhook, you will need to delete and recreate the webhook.
