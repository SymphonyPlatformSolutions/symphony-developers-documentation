# Agent Performance Tuning

### Memory and CPU recommendations

Based on the number of bots or the amounts of messages they send, the Agent service may require some tuning to cope with the load it receives.

The Agent is mostly used to encrypt and decrypt messages, operations that can be CPU intensive, especially for large messages. Basic metrics such as CPU usage and memory are the first elements to check on your Agent’s installation. Other factors that can play on the Agent’s performance are the number of bots as well as the number of rooms the bots are participating to.

Simply said, the more CPU power the Agent has the better, for scenarios where more than one thousand messages are ingested per minute, we recommend at least 4 CPUs for a single Agent instance \(and of course the higher frequency, the better\).

A high CPU usage can also be a sign that the Agent, being a Java application, is spending too much time garbage collecting memory. This can be confirmed by a high CPU usage plus a high memory usage \(where the Agent used memory is close to the maximum heap size allocated to it\). JVM diagnostic tools such as GC logs, jstat, jconsole can also help to identify high memory usage. For Agents under load, a heap size of 4GB is a good starting point \(set via the Xmx JVM option\).

### Tuning of the message ingestion polling <a id="Message-ingestion-polling"></a>

When sending a message via the Agent \(i.e when a bot creates a message\), the Agent encrypts it, sends it encrypted to the Symphony backend \(SBE\), waits for it to be ingested and sends it back unencrypted to the bot. It waits for the message to be ingested by polling the Symphony backend with an exponential backoff strategy that can sometimes be perceived as suboptimal. This strategy can be tuned to be more aggressive \(thus generating more load on the backend\) via two Agent’s settings:

* `agent.messaging.retry.initialDelay` \(in milliseconds\), the initial time before making the first polling call to check if a message has been correctly ingested. 
* `agent.messaging.retry.delayMultiplier` \(in milliseconds\), the multiplier between each retry polling calls to check if a message has been ingested. 

To make it simple, setting a short delay and a low multiplier will make the Agent polls the backend quickly. **These parameters impact the load on the backend and the backend rate limiting. Changing the default values should be done only with the approval from the Symphony team.**

