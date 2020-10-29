# Agent Configuration Fields

## Agent Configuration Fields

This page describes the fields of the `agent.yml` configuration file used during the Agent Installation.

| Field | Required | Description |
| :--- | :--- | :--- |
| `agent.circuitbreaker.targetGet.threadpool.allowMaximumSizeToDivergeFromCoreSize` | No | Allows the configuration for maximumSize to take effect. That value can then be equal to, or higher, than coreSize. Default: false Note: This configuration is no longer available since Agent 2.55.12 |
| `agent.circuitbreaker.targetGet.circuitbreaker.enable` | No | Determines whether a circuit breaker will be used to track health and to short-circuit requests if it trips. Default: true Note: This configuration is no longer available since Agent 2.55.12 |
| `agent.circuitbreaker.targetGet.circuitbreaker.errorThresholdPercentage` | No | The error percentage at or above which the circuit should trip open and start short-circuiting requests to fallback logic. Default: 50 Note: This configuration is no longer available since Agent 2.55.12 |
| `agent.circuitbreaker.targetGet.circuitbreaker.forceClosed` | No | If true, forces the circuit breaker into a closed state in which it will allow requests regardless of the error percentage. Default: false Note: This configuration is no longer available since Agent 2.55.12 |
| `agent.circuitbreaker.targetGet.circuitbreaker.forceOpen` | No | If true, forces the circuit breaker into an open \(tripped\) state in which it will reject all requests. Takes precedence over circuitBreaker.forceClosed. Default: false Note: This configuration is no longer available since Agent 2.55.12 |
| `agent.circuitbreaker.targetGet.circuitbreaker.sleepWindowInMilliseconds` | No | The amount of time, after tripping the circuit, to reject requests before allowing attempts again to determine if the circuit should again be closed. Default: 5000 Note: This configuration is no longer available since Agent 2.55.12 |
| `agent.circuitbreaker.targetGet.circuitbreaker.requestVolumeThreshold` | No | The minimum number of requests in a rolling window that will trip the circuit. Default: 20 Note: This configuration is no longer available since Agent 2.55.12 |
| `agent.circuitbreaker.targetGet.execution.isolation.thread.timeoutInMilliseconds` | No | The time in milliseconds after which the caller will observe a timeout and walk away from the command execution. Default: 5000 Note: This configuration is no longer available since Agent 2.55.12 |
| `agent.circuitbreaker.targetGet.execution.timeout.enabled` | No | Indicates whether the circuit breaker execution should have a timeout. Default: true Note: This configuration is no longer available since Agent 2.55.12 |
| `agent.circuitbreaker.targetGet.threadpool.coreSize` | No | The core thread pool size. Default: 100 Note: This configuration is no longer available since Agent 2.55.12 |
| `agent.circuitbreaker.targetGet.threadpool.keepAliveTimeMinutes` | No | The keep-alive time, in minutes. Default: 1 Note: This configuration is no longer available since Agent 2.55.12 |
| `agent.circuitbreaker.targetGet.threadpool.maximumSize` | No | The maximum thread pool size. This is the maximum amount of concurrency that can be supported without starting to reject Commands. Please note that this setting only takes effect if you also set allowMaximumSizeToDivergeFromCoreSize. Default: 100 Note: This configuration is no longer available since Agent 2.55.12 |
| `agent.circuitbreaker.targetGet.threadpool.maxQueueSize` | No | The maximum queue size of the BlockingQueue implementation. If set to -1, then SynchronousQueue will be used, otherwise a positive value will be used with LinkedBlockingQueue. Default: -1 Note: This configuration is no longer available since Agent 2.55.12 |
| `agent.circuitbreaker.targetGet.threadpool.name` | No | The thread pool name which will show in the logs. Default: targetGet-pool Note: This configuration is no longer available since Agent 2.55.12 |
| `agent.circuitbreaker.targetGet.threadpool.queueSizeRejectionThreshold` | No | The queue size rejection threshold — an artificial maximum queue size at which rejections will occur even if maxQueueSize has not been reached. Not applicable if maxQueueSize == -1. Default: 5 Note: This configuration is no longer available since Agent 2.55.12 |
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
| `agent.limits.oboSessionCache.size` | No | Maximum number of OBO sessions to cache. Default: 10000  Note: This configuration is no longer available since Agent 2.55.13 |
| `agent.limits.oboSessionCache.ttl` | No | Time to live of OBO session cache entries, in milliseconds. Default: 3600000  Note: This configuration is no longer available since Agent 2.55.13 |
| `agent.limits.sessionCache.size` | No | Maximum number of sessions to cache. Default: 10000 |
| `agent.limits.sessionCache.ttl` | No | Time to live of session cache entries, in hours. Default: 72 |
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



