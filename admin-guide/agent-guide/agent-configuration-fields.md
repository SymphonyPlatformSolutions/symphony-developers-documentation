# Agent Configuration Fields

## Agent Configuration Fields

This page describes the fields of the `agent.yml` configuration file used during the Agent Installation.

| Field | Required | Description |
| :--- | :--- | :--- |
| `agent.certificate.agentservice.file` | No | The "agentservice" user certificate file. Either certificate or RSA authentication of the user key must be set for OBO functionality to be available. Default: unset. |
| `agent.certificate.agentservice.password` | No | The "agentservice" user certificate password. Required if the agentservice certificate is set. Default: unset |
| `agent.certificate.agentservice.type` | Yes | The "agentservice" user certificate type. Default: pkcs12. |
| `agent.certificate.ceservice.file` | No | The "ceservice" user certificate file. Either certificate or RSA authentication of the user key must be set for Firehose functionality to be available. Default: unset |
| `agent.certificate.ceservice.password` | Yes if the ceservice certificate is set. | The "ceservice" user certificate password. Default: unset |
| `agent.certificate.ceservice.type` | No | The "agentservice" user certificate type. Default: pkcs12. |
| `agent.cloudlogger.enabled` | No | Indicates whether to enable cloud logging. Default: true |
| `agent.cloudlogger.flushingInterval` | No | The flushing interval of the cloud logger. Default: 5 |
| `agent.cloudlogger.maxPayloadSize` | No | Maximum payload size of the cloud logger. Default: 1 |
| `agent.cloudlogger.onPrem.flushingInterval` | No | The flushing interval of the on-prem cloud log. Default: 5 |
| `agent.cloudlogger.onPrem.level` | No | The log level of the on-prem cloud log. Default: INFO |
| `agent.cloudlogger.onPrem.maxPayloadSize` | No | Maximum payload size of the on-prem cloud log. Default: 1 |
| `agent.cloudlogger.onPrem.sink.flushingInterval` | No | The flushing interval of the on-prem cloud logger sink. Default: 5 |
| `agent.cloudlogger.onPrem.sink.maxPayloadSize` | No | Maximum payload size of the on-prem cloud logger sink. Default: 10 |
| `agent.cloudlogger.onPremError.flushingInterval` | No | The flushing interval of the on-prem cloud error log. Default: 5 |
| `agent.cloudlogger.onPremError.level` | No | The log level of the on-prem cloud error log. Default: WARN |
| `agent.cloudlogger.onPremError.maxPayloadSize` | No | Maximum payload size of the on-prem cloud error log. Default: 1 |
| `agent.cloudlogger.onPremError.sink.flushingInterval` | No | The flushing interval of the on-prem cloud error logger sink. Default: 5 |
| `agent.cloudlogger.onPremError.sink.maxPayloadSize` | No | Maximum payload size of the on-prem cloud error logger sink. Default: 10 |
| `agent.cloudlogger.sink.maxPayloadSize` | No | Maximum payload size of the cloud logger sink. Default: 1 |
| `agent.cloudlogger.sink.flushingInterval` | No | The flushing interval of the cloud logger sink. Default: 5 |
| `agent.cloudmetrics.enabled` | No | Indicates whether to enable cloud metrics. Default: true |
| `agent.features.elements.enabled` | No | Indicates if Symphony Elements are enabled to be sent via Agent Messaging APIs. Default: true. |
| `agent.limits.allowedOrigins.refreshAvailableAppFixedDelayInMillis` | No | The interval between refreshing allowed app origins, in milliseconds. Requires the "agentservice" user to be configured. Default: 60000 |
| `agent.limits.allowedOrigins.refreshAvailableAppInitialDelayInMillis` | No | The initial delay before fetching allowed app origins, in millisecods. Requires the "agentservice" user to be configured. Default: 10000 |
| `agent.limits.client.connectionRequestTimeout` | No | The timeout used when requesting a connection from the connection manager, in milliseconds. A value of zero is interpreted as an infinite timeout. Default: 32000 |
| `agent.limits.client.connectTimeout` | No | The timeout until a connection between the Agent and the pod or key manager is established, in milliseconds. A value of zero is interpreted as infinite timeout. Default: 2000 |
| `agent.limits.client.maxConnections` | No | Maximum number of concurrent HTTP\(s\) connections opened by the Agent. Default: 200. |
| `agent.limits.client.readTimeout` | No | The time the Agent will wait for data from the pod or key manager, in milliseconds. A value of zero is interpreted as infinite timeout. Default: 30000 |
| `agent.limits.connectivity.refreshConnectivityStateFixedDelayInMillis` | No | The time the Agent will wait on startup before trying to check connectivity to the pod or key manager, in millisecods. Default: 30000 |
| `agent.limits.datafeed.maxPerUser` | No | Maximum number of active Datafeeds per user. Default: 5 |
| `agent.limits.datafeed.pollTimeout` | No | The timeout of Datafeed poll requests, in milliseconds. If no messages are available, the Firehose will return HTTP 204 after this timeout is reached. Default: 30000 |
| `agent.limits.datafeed.queueSize` | No | The unread Datafeed messages capacity. Once it is reached, the Datafeed will expire. Default: 250 |
| `agent.limits.firehose.defaultRequestTimeout` | No | The default timeout of Firehose 2 requests, in milliseonds. Default: 5000 |
| `agent.limits.firehose.pollTimeout` | No | The timeout of Firehose poll requests, in milliseconds. If no messages are available, the Firehose will return HTTP 204 after this timeout is reached. Default: 30000 |
| `agent.limits.firehose.maxPerUser` | No | Maximum number of active Firehoses per user. Default: 2 |
| `agent.limits.firehose.maxRequestTimeout` | No | The maximum timeout of Firehose 2 requests, in milliseonds. Default: 20000 |
| `agent.limits.firehose.minRequestTimeout` | No | The minimum timeout of Firehose 2 requests, in milliseonds. Default: 1000 |
| `agent.limits.firehose.queueSize` | No | The unread Firehose messages capacity. Once it is reached, the Firehose will expire. Default: 500 |
| `agent.limits.importThreads` | No | Number of threads to use for message import. Default: 20 |
| `agent.limits.keyCache.size` | No | Maximum number of stream keys to cache. Default: 1000 |
| `agent.limits.keyCache.ttl` | No | Time to live of stream key cache entries, in hours. Default: 72 |
| `agent.limits.sessionCache.size` | No | Maximum number of sessions to cache. Default: 10000 |
| `agent.limits.sessionCache.ttl` | No | Time to live of session cache entries, in hours. Default: 72 |
| `agent.messaging.retry.initialDelay` | No | \(in milliseconds\), the initial time before making the first polling call to check if a message has been correctly ingested. Changing this parameter can increase the load on the backend, is subject to rate limiting, and should only be done in specific scenarios following a discussion with the Symphony team. |
| `agent.messaging.retry.delayMultiplier` | No | \(in milliseconds\), the multiplier between each retry polling calls to check if a message has been ingested. Changing this parameter can increase the load on the backend, is subject to rate limiting, and should only be done in specific scenarios following a discussion with the Symphony team. |
| `agent.onPrem` | No | Indicates whether this is an on-prem or cloud installation. Default: true. |
| `agent.podName` | No | An identifier for the pod \(e.g. the hostname of the pod\). |
| `agent.privateKey.agentservice.file` | No | The "agentservice" user RSA private key file. Either certificate or RSA authentication of the user key must be set for OBO functionality to be available. Default: unset |
| `agent.privateKey.ceservice.file` | No | The "ceservice" user RSA private key file. Either certificate or RSA authentication of the user key must be set for Firehose functionality to be available. Default: unset |
| `agent.proxy.certAuth.enabled` | No | Indicates whether certificate authentication requests should go through the pod proxy. Default: false |
| `agent.proxy.firehose.password` | No | The Firehose proxy password. Default: unset |
| `agent.proxy.firehose.uri` | No | The URI through which to proxy requests to the Firehose. Default: unset |
| `agent.proxy.firehose.username` | No | The Firehose proxy username. Default: unset |
| `agent.proxy.keymanager.password` | No | The key manager proxy password. Default: unset |
| `agent.proxy.keymanager.uri` | No | The URI through which to proxy requests to the key manager. Default: unset |
| `agent.proxy.keymanager.username` | No | The key manager proxy username. Default: unset |
| `agent.proxy.symphony.password` | No | The pod proxy password. Default: unset |
| `agent.proxy.symphony.uri` | No | The URI through which to proxy requests to the pod. Default: unset |
| `agent.proxy.symphony.username` | No | The pod proxy username. Default: unset |
| `agent.registration.retry.delayMultiplier` | No | The delay multiplier rate after aditional failures. Default: 2 |
| `agent.registration.retry.initialDelay` | No | The delay after the first registration failure. Default: 1000ms |
| `agent.registration.retry.maxAttempts` | No | After this number of attempts the process will stop retrying. Default: 5 |
| `agent.registration.retry.timeout` | No | The timeout for all retry processes. After this time the process will stop retrying. Default: 35000ms |
| `agent.url.agent` | No | The URL of the Agent. Used for Agent registration. Default: ${symphonyUrl}/agent |
| `agent.url.firehose` | No | The URL of Firehose 2/ Default: ${symphonyUrl}:8080/firehose-2. |
| `agent.url.keyauth` | No | The URL of certificate-based key manager authentication. Default: ${symphonyUrl}:8444/keyauth |
| `agent.url.keymanager` | No | The URL of the key manager. Default: ${symphonyUrl}/relay |
| `agent.url.login` | No | The URL of web-based login. Default: ${symphonyUrl}/login. |
| `agent.url.pod` | No | The URL of Pod API endpoints. Default: ${symphonyUrl}/pod. |
| `agent.url.register` | Yes | The Agent registration URL. Default: ${symphonyUrl}/appstore/v1/internal/mgmt/agent/register. |
| `agent.url.sessionauth` | No | The URL of certificate-based session authentication. Default: ${symphonyUrl}:8444/sessionauth. |
| `agent.url.symphony` | Yes | The base URL of the Symphony pod. |



