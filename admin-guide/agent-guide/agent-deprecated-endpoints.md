# Agent Deprecated Endpoints

Before disabling deprecated endpoints, it is important to consider:

Disadvantages:  
• The use of old APIs will not be possible, so apps and bots that rely on them will break.  
• Code adjustments may be needed for apps and bots in case of other endpoints become deprecated in the future.

Advantages:  
• You will have the latest API versions with the latest features, performance improvements and fixed bugs.

{% hint style="info" %}
When using deprecated endpoints, a warning header stating that the endpoint is deprecated will be added into each deprecated endpoint response \(Agent and Pod APIs\). An example of a header is: `299 symphony-agent 'The requested endpoint is deprecated. The endpoint that replaces it is: /agent/v2/HealthCheck GET'`
{% endhint %}

### Deprecated endpoints

By default, the Agent allows the use of deprecated endpoints.  
Set `agent.endpoints.deprecated.disable` as **true** to disable the use of deprecated endpoints. For more information, refer to [Agent 2.X and above Installation](agent-2.x-and-above-installation.md).

Note that when the use of deprecated endpoints is disabled, a response with the HTTP status 410 \(gone\) will be received, saying that the requested endpoint is deprecated and no longer can be used. Example:

`{ "message": "The requested endpoint is deprecated and can no longer be used. The endpoint that replaces it is: /agent/v2/HealthCheck GET" }`

The following table lists all the Agent deprecated endpoints and their replacements.

| Method | Deprecated endpoint | Replacement endpoint |
| :--- | :--- | :--- |
| POST | /agent/v1/datafeed/create | [/agent/v4/datafeed/create](https://developers.symphony.com/restapi/v1.55/docs/create-messagesevents-stream-v4) |
| GET | /agent/v1/datafeed/.+/read | [/agent/v4/datafeed/{id}/read](https://developers.symphony.com/restapi/v1.55/docs/read-messagesevents-stream-v4) |
| GET | /agent/v2/datafeed/.+/read | [/agent/v4/datafeed/{id}/read](https://developers.symphony.com/restapi/v1.55/docs/read-messagesevents-stream-v4) |
| GET | /agent/v1/HealthCheck | [/agent/v2/HealthCheck](https://developers.symphony.com/restapi/v1.55/docs/health-check-v2) |
| POST | /agent/v1/message/import | [/agent/v4/message/import](https://developers.symphony.com/restapi/v1.55/docs/import-message-v4) |
| POST | /agent/v2/message/import | [/agent/v4/message/import](https://developers.symphony.com/restapi/v1.55/docs/import-message-v4) |
| POST | /agent/v1/stream/.+/attachment/create | [/agent/v4/stream/{sid}/message/create](https://developers.symphony.com/restapi/v1.55/docs/create-message-v4) |
| POST | /agent/v3/stream/.+/attachment/create | [/agent/v4/stream/{sid}/message/create](https://developers.symphony.com/restapi/v1.55/docs/create-message-v4) |
| GET | /agent/v1/stream/.+/message | [/agent/v4/stream/{sid}/message](https://developers.symphony.com/restapi/v1.55/docs/messages-v4) |
| GET | /agent/v2/stream/.+/message | [/agent/v4/stream/{sid}/message](https://developers.symphony.com/restapi/v1.55/docs/messages-v4) |
| POST | /agent/v1/stream/.+/message/create | [/agent/v4/stream/{sid}/message/create](https://developers.symphony.com/restapi/v1.55/docs/create-message-v4) |
| POST | /agent/v2/stream/.+/message/create | [/agent/v4/stream/{sid}/message/create](https://developers.symphony.com/restapi/v1.55/docs/create-message-v4) |
| POST | /agent/v3/stream/.+/message/create | [/agent/v4/stream/{sid}/message/create](https://developers.symphony.com/restapi/v1.55/docs/create-message-v4) |
| POST | /agent/v1/stream/.+/share | [/agent/v3/stream/{sid}/share](https://developers.symphony.com/restapi/v1.55/docs/share-v3) |
| POST | /agent/v1/util/obsolete | No replacement endpoint |
| /agent/v1/datafeed/create | /agent/v4/datafeed/create |  |

