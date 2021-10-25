# Agent Installation

## Symphony API Agent

### Prerequisites

* [OpenJDK 8](https://openjdk.java.net).

{% hint style="info" %}
Note: Make sure that you have installed the OpenJDK 8 update 282 or later, otherwise, the [Java JCE](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html) will also be needed.
{% endhint %}

### Agent Download

Download the Agent package and unzip it into a directory of your choice:

{% content-ref url="agent-download.md" %}
[agent-download.md](agent-download.md)
{% endcontent-ref %}

The following example shows version 2.54.0 being unzipped:

```
unzip agent-2.54.0.zip
```

The output will look similar to the following:

```
Archive:  dist-2.54.0.zip
   creating: resources/
   creating: resources/certs/ 
  inflating: resources/certs/agentservice.p12  
  inflating: resources/certs/bot.user1.p12  
  inflating: resources/certs/ceservice.p12  
  inflating: resources/certs/int-cert.p12  
  inflating: resources/certs/int-key.pem 
   creating: resources/rsa/
  inflating: resources/rsa/privatekey.pem  
  inflating: resources/rsa/pubkey.pem  
  inflating: resources/Postman.json  
  inflating: resources/README.md     
  inflating: resources/agent-api-public.yaml  
   creating: util/         
  inflating: util/create_cert.sh     
  inflating: util/create_rsa.sh      
  inflating: util/jcurl-0.9.15.jar   
  inflating: util/jwt-helper-0.9.2.jar  
  inflating: util/setup-2.54.0.jar 
  inflating: util/diagnostics-2.54.0.jar
  inflating: agent-2.54.0.jar   
  inflating: agent.yml               
  inflating: startup.sh
```

The Agent distribution package contains:

* **Agent Server Package:** `agent-<VERSION>.jar`.
* **Configuration Helper Package:** `util/setup-VERSION.jar`.
* **JCurl Replacement:** [JCurl](https://github.com/symphonyoss/JCurl) - a _curl(1)_ replacement with native support for PKCS12 certificates and JSON.
* **Sample Configuration:** `agent.yml`. For information on the fields see [Agent Configuration Fields](agent-configuration-fields.md).
* **Agent API Swagger Specification:** `resources/agent-api-public.yaml`.
* **Test Certificates:** test certificates for the required service users (`resources/certs/agentservice.p12` and `resources/certs/ceservice.p12`).
* **Test User Certificate**: a test user certificate for calling the Agent API (`resources/certs/bot.user1.p12`; note that you must create the user first and import its certificate or its signing certificate into the pod)
* **Test Signing Certificate and Key**: a test signing certificate and its private key for generating user certs (`resources/certs/int-cert.p12` and `resources/certs/int-key.pem`)
* **Shell Scripts**:
* `util/create_cert.sh`: a shell script to create a certificate signed by the user-provided signing cert.
* `util/create_rsa.sh`: a shell script to create a public/private key pair.
* `start.sh`: startup script for launching the Agent and setting JVM-specific options. TLS 1.2 is enforced.
* `stop.sh`: stop script. _Please note that it will work only if the Agent has been started by using start.sh_.
* `startup.sh`: legacy startup script for launching the Agent and setting JVM-specific options. Please use the new start.sh if possible; if you use it, stop.sh script will not work and TLS 1.2 is not enforced
* **Test public/private key pair**: for calling the Agent API (`resources/rsa/privatekey.pem` and `resources/rsa/pubkey.pem`). Note that you must create the user first and import their public key into the pod.
* **Sample Postman collection**: contains predefined calls for testing the Agent installation (`resources/Postman.json`).
* **jwt-helper**: a helper tool to generate a JWT authentication token for the provided username and signed by the provided private RSA key (`util/jwt-helper.jar`). Run as `java -jar jwt-helper.jar -user <username> -key <privatekey.pem>`); the output is a short-lived (5 minutes) token which can be used in the payload of the RSA authentication requests.

### Configure

Modify the included configuration template (`agent.yml`) to match your environment.

```bash
agent:
  # Adjust the value agent.podName to an identifier for your pod agent:
  podName: acme    

  # Adjust the section agent.url to point to your pod and Key Manager url.                                              
  url:
    symphony: https://acme.symphony.com                        
    agent: https://acme.symphony.com/agent                    
    pod: https://acme.symphony.com/pod                         
    sessionauth: https://acme.symphony.com:8444/sessionauth    
    keyauth: https://acme.symphony.com:8444/keyauth            
    keymanager: https://acme.symphony.com/relay                
    login: https://acme.symphony.com/login                     
    firehose: https://acme.symphony.com/firehose2/api          
    register: https://acme.symphony.com/appstore/v1/internal/mgmt/agent/register 

  # Indicates if Symphony Elements are enabled to be sent via the Agent Messaging APIs. Default: true.
  features:
    elements:
      enabled: true

  # Adjust the value of agent.endpoints.deprecated.disable as true to not to allow accounts to use deprecated Agent APIs. 
  # If set as false, a warning header stating that the endpoint is deprecated will be added into each deprecated endpoint response.
  # Note: before disabling deprecated endpoints, see the "Disabling deprecated endpoints" section below.
  endpoints:
    deprecated:
      disable: false   
                                             
  # A test signing certificate ("Disposable Test Intermediate Certificate Authority", int-cert.pem) and a bot certificate 
  # signed by that CA (bot.user1.p12) are provided to help during development; the password for both certificates is "changeit".
  certificate:
    agentservice:                                                         
      file: /data/agent/certs/agentservice.p12                      
      password: changeit                                            
      type: pkcs12                                                  
    ceservice:
      file: /data/agent/certs/ceservice.p12                         
      password: changeit                                            
      type: pkcs12              
                                    
  # Private Keys for authentication using RSA. This is an alternative method to signing certificates (see above) for authenticating.
  privateKey:
    agentservice:                                                   
        file: /data/agent/certs/agentservice.pem                    
    ceservice:
        file: /data/agent/certs/ceservice.pem

  # Adjust the section agent.proxy to point to your proxy, if in use; if you do not use a proxy to connect to Symphony or the Key Manager, delete that section.
  # The property certAuth.enable controls whether calls to the certificate authentication endpoints (/sessionauth and /keyauth, typically deployed at port 8444) should go through the proxy as well.
  proxy:
    symphony:
      uri: https://proxy.acme.com:8080                               
      username: user                                                 
      password: pass                                                 
    keymanager:
      uri: https://proxy.acme.com:8080                               
      username: user                                                 
      password: pass                                                 
    certAuth:
      enabled: true                                               
    firehose:
      uri: https://proxy.acme.com:8080                               
      username: user                                                 
      password: pass    
                                             
  # Adjust the value of agent.limits.firehose.maxPerUser to change the default number of firehoses per user
  # The default value is 2.
  limits:
    firehose:
      maxPerUser: 2     

  # The remaining configuration properties are set to reasonable defaults and can be left unmodified, unless otherwise desired.
```

{% hint style="info" %}
### Important

* The sections `podName`, `url`, and `certificate` are required.  All other config properties are optional
* The users `agentservice` and `ceservice` require their certificates or their signing certificate to be imported into the pod
* The Key Manager url is different if the Key Manager service is deployed on-prem or on cloud.
* It is possible to encrypt the sensitive fields of the Agent configuration such as passwords or keys. See section "Overview of the Setup Script"
{% endhint %}

### **Disabling deprecated endpoints**

Before disabling deprecated endpoints, it is important to consider:

Disadvantages:\
• The use of old APIs will not be possible, so apps and bots that rely on them will break.\
• Code adjustments may be needed for apps and bots in case of other endpoints become deprecated in the future.

Advantages:\
• You will have the latest API versions with the latest features, performance improvements and fixed bugs.

### **Configuring TLS 1.2 (only applies if not using start.sh script)**

_Please note it is recommended to use start.sh script. With it, this section becomes obsolete._

The Agent supports TLS 1.2 by default but also allows lower versions of TLS protocol to be used. To restrict the Agent to only accept TLS 1.2 and strong cipher suites, set the following values by passing them as command line arguments when starting the Agent:

```
--server.ssl.enabled-protocols=TLSv1.2 \
--server.ssl.protocol=TLS 
--server.ssl.ciphers=TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA
```

## Run

### Start

There are two options for running the agent:

1. For testing purposes, you can run the Agent on the default port (9443) with a supplied test server certificate and using the system Java truststore `java -Dfile.encoding=UTF-8 -jar agent-<VERSION>.jar --agent.config=agent.yml`
2. For production deployments, use a customised start.sh script. It could be generated by setup script or you can edit the parameter in the provided one, such as:

```
java \
-Dfile.encoding=UTF-8 \
-jar agent-<VERSION>.jar \
--agent.config=config.yml \
--server.port=443\
--server.ssl.key-store=/home/acme/keystore.jks \
--server.ssl.key-store-password=changeit \
--server.ssl.key-password=changeit
```

To trust a pod certificate that is not in the Java `cacerts` file, include:

```
--server.ssl.trust-store=/home/acme/truststore.jks \
--server.ssl.trust-store-password=changeit
```

If you want to set the output logs folder specify like this in the start.sh. Placement is important, it must come before the jar file reference:

```java
java \
-Dlogs.directory="/data/my_agent_logs/" \
-jar agent.jar \
```

Make the `start.sh` executable:\
`chmod 755 start.sh`

Run `start.sh`:\
`sudo ./start.sh`

After the Agent server starts up, call its health check URL to confirm connectivity from the Agent server to the pod and Key Manager:

`https://<agent-server>/agent/v3/health/extended`

Please find an example of the returned payload in the reference of the [Health Check Extended v3](https://developers.symphony.com/restapi/reference#health-check-extended-v3) endpoint.

### Stop

Make the `stop.sh` executable:\
`chmod 755 stop.sh`

The application can be stopped by using stop.sh, that sends a kill signal which will be used to gracefully end the Agent by finishing the ongoing requests but without accepting any new one.

_Please note that you can use this stop.sh script only if you have used the start.sh script to run the Agent._

## Overview of the Setup Script

The Agent distribution includes a setup helper script (`util/setup-<VERSION>.jar`) to create a custom configuration and generate certificates.

The setup script provides interactive options that serve three main purposes:

* to generate a usable Agent configuration tailored to the your environment (options `[b]`, `[c]`, `[h]`, and optionally `[d]`);
* to provide helper utilities for facilitating Agent use (options `[e]`, `[f]`, `[g]`).
* to encrypt the sensitive passwords and keys of the Agent configuration to avoid having to store them in clear text (option `[i]`).

Descriptions of the individual options are provided below.

## Launch the Setup Script

Launch the script with this command:\
`java -jar util/setup-<VERSION>.jar`

The script displays the main menu:

{% tabs %}
{% tab title="Agent Configuration Generation" %}
```
java -jar util/setup-2.54.0.jar 


-------------- Agent Configuration Generation --------------
[a]  View current configuration
[b]  Configure base URL (Symphony URL)
[c]  Configure required properties
[d]  Configure proxies

[e]  Generate user certificate
[f]  Generate RSA keypair
[g]  Generate startup script
[h]  Write Agent configuration
[i]  Encrypt a configuration property

[q]  Quit

Enter selection:
```
{% endtab %}
{% endtabs %}

The following describes the various menu options.

**Option `[a]` (`View current configuration`) **displays the current configuration:

{% tabs %}
{% tab title="Agent Configuration" %}
```
Enter selection:  a
-------------- Agent Configuration --------------

Pod name                                         : local
Symphony URL                                     : https://localhost.symphony.com:8443
Agent URL                                        : https://localhost.symphony.com:9443/agent
Pod URL                                          : https://localhost.symphony.com:8443/pod
Session authentication URL                       : https://localhost.symphony.com:8444/sessionauth
Keymanager URL                                   : https://localhost.symphony.com:8443/relay
Keymanager authentication URL                    : https://localhost.symphony.com:8444/keyauth
Login URL                                        : https://localhost.symphony.com:8443/login
Firehose URL                                     : https://localhost.symphony.com:8080/firehose-2
Agent registration URL                           : https://localhost.symphony.com:8443/appstore/v1/internal/mgmt/agent/register

Agentservice certificate                         : null
Agentservice password                            : null
Agentservice certificate type                    : pkcs12
Ceservice certificate                            : null
Ceservice password                               : null
Ceservice certificate type                       : pkcs12

Symphony proxy URI                               : null
Symphony proxy username                          : null
Symphony proxy password                          : null
Keymanager proxy URI                             : null
Keymanager proxy username                        : null
Keymanager proxy password                        : null
Firehose proxy URI                               : null
Firehose proxy username                          : null
Firehose proxy password                          : null
Enable proxy for authentication endpoints        : false

Agentservice RSA private key file                : null
Ceservice RSA private key file                   : null
```
{% endtab %}
{% endtabs %}

**Option `[b]` (`Configure base URL (Symphony URL)`)** specifies the base URL (Symphony URL) to autogenerate the other URLs critical to the functioning of the Agent (options \[b]-\[j] under "Configure required properties"):

{% tabs %}
{% tab title="Symphony URL" %}
```
Enter selection:  b


-------------- Symphony URL [e.g., https://acme.symphony.com] --------------
Provide a valid Symphony URL and press enter or type 'q' to return to the previous menu:
https://localhost.symphony.com:8443
```
{% endtab %}
{% endtabs %}

**Option `[c]` (`Configure required properties`) **allows you to customize the URL guessed on the basis of the previous entry. This also lets the you to set the location of the agentservice user certificate or RSA key (required for the [OBO](../../building-extension-applications-on-symphony/app-authentication/obo-authentication.md) and the ceservice user certificate or RSA key (required for Firehose 2.0). If you don't have those yet, they can be generated by options `[e]` and `[f]` in the main menu. Entry `[c]` also allows you to set a "pod name", used internally by Symphony to identify the pod:

{% tabs %}
{% tab title="Modify Agent Configuration" %}
```
Enter selection:  c


-------------- Modify Agent Configuration --------------
[a]  Configure pod name                                       [local]

[b]  Configure Symphony URL                                   [https://localhost.symphony.com:8443]
[c]  Configure Agent API URL                                  [https://localhost.symphony.com:9443/agent]
[d]  Configure pod API URL                                    [https://localhost.symphony.com:8443/pod]
[e]  Configure session authentication URL                     [https://localhost.symphony.com:8444/sessionauth]
[f]  Configure keymanager URL                                 [https://localhost.symphony.com:8443/relay]
[g]  Configure keymanager authentication URL                  [https://localhost.symphony.com:8444/keyauth]
[h]  Configure login URL                                      [https://localhost.symphony.com:8443/login]
[i]  Configure Firehose URL                                   [https://localhost.symphony.com:8080/firehose-2]
[j]  Configure Agent registration URL                         [https://localhost.symphony.com:8443/appstore/v1/internal/mgmt/agent/register]

[k]  Configure Agentservice certificate file                  [null]
[l]  Configure Agentservice certificate password              [null]
[m]  Configure Agentservice certificate type                  [pkcs12]
[n]  Configure Ceservice certificate file                     [null]
[o]  Configure Ceservice certificate password                 [null]
[p]  Configure Ceservice certificate type                     [pkcs12]

[r]  Configure Agentservice RSA file                          [null]
[s]  Configure Ceservice RSA file                             [null]

[q]  Return to main menu
```
{% endtab %}
{% endtabs %}

**Option `[d]` (`Configure proxies`)** configures HTTP(s) proxies individually for the various components of the system (Symphony - AKA "Pod", Key Manager, Firehose 2.0). You can also optionally configure proxy authentication (username/password) for each of the components, if used:

{% tabs %}
{% tab title="Modify Agent Proxy Configuration" %}
```
Enter selection:  d


-------------- Modify Agent Proxy Configuration --------------
[a]  Configure Symphony proxy URI               [null]
[b]  Configure Symphony proxy username          [null]
[c]  Configure Symphony proxy password          [null]

[d]  Configure keymanager proxy URI             [null]
[e]  Configure keymanager proxy username        [null]
[f]  Configure keymanager proxy password        [null]

[g]  Configure Firehose proxy URI               [null]
[h]  Configure Firehose proxy username          [null]
[i]  Configure Firehose proxy password          [null]

[j]  Configure proxying authentication requests [false]

[q]  Return to main menu
```
{% endtab %}
{% endtabs %}

**Option `[e]` (`Generate user certificate`)** generates certificates for authenticating service users (`/data/agent/certs/agentservice.pem` and `/data/agent/certs/ceservice.pem`). Once generated (using sub option `[h]`), the output file must be provided in the Agent config (sub options `[k]` through `[p]` in the submenu of option `[b]` (`Configure base URL`)). Certificate generation requires a signing certificate as described below using sub option `[a]`:

* Sub option `[a]` (`Provide signing certificate`): specifies a signing certificate that will be used to sign the generated user certificate. Either the signing certificate or the user certificate needs to be imported to the pod using the Admin Console or [Create Company Certificate](https://developers.symphony.com/restapi/docs/create-company-certificate). If the signing certificate is imported, all users whose certificates are signed by that certificate will be able to authenticate; if only a specific user's certificate is imported, only that user will be able to authenticate:

{% tabs %}
{% tab title="User Certificate Generation" %}
```
Enter selection:  e


-------------- User Certificate Generation --------------
[a]  Provide signing certificate [e.g., /home/symphony/int-cert.p12]        [null]
[b]  Provide signing certificate password [e.g., 'changeit']                [null]
[c]  Provide pem certificate [e.g., /home/symphony/int-key.pem]             [null]
[d]  Provide pem certificate password [e.g., 'changeit']                    [null]
[e]  Configure target certificate username [e.g., agentservice]             [null]
[f]  Provide desired password for your certificate [e.g., changeit]         [null]
[g]  Configure certificate output directory [e.g., /home/symphony]          [null]

[h]  Generate certificate

[q]  Return to main menu
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="Shell" %}
```
-------------- Generate RSA keypair --------------
[a]  Public key filename                                [pubkey.pem]
[b]  Private key filename                               [privatekey.pem]
[c]  Keypair encoding [pkcs1/pkcs8]                     [PKCS8]

[d]  Generate keypair

[q]  Return to main menu
```
{% endtab %}
{% endtabs %}

The following image shows how to import the certificate to the pod, using the Admin Console:

![](https://files.readme.io/2ae8349-step\_1.png)

And here you can see how to configure the certificates on the App host:\
A. Install root certs for the pod in the Trust Store of the Bot.\
B. Install a Client Type cert in the Key Store of the BOT – obtained from internal PKI CA.

![](https://files.readme.io/e0bda0b-app\_host.png)

The following commands can be used to install the certificates on the Agent app host machine. The first command is used for adding A (from the diagram above) to the Trust Store and the second command is used for adding B to the Key Store:

{% tabs %}
{% tab title="Shell" %}
```
$> keytool -importcert -trustcacerts -keystore /data/tomcat/certs/truststore -file YourFile.CRT -alias pod -storepass changeit

$> keytool -genkeypair -keyalg RSA -alias 1 -keystore ./atlas/symphony/global/certs/server.keystore -storepass changeit -validity 730 -keysize 2048
```
{% endtab %}
{% endtabs %}

**Option `[f]` (`Generate RSA keypair`) **generates an RSA public/private key pair for using RSA authentication [RSA Bot Authentication](../../building-bots-on-symphony/authentication/rsa-authentication.md) Workflow. This submenu lets you choose filenames for the keys and their encoding (PCKS1 or PCKS8), and writes out the key pair. Once generated, the public keys for each user must be imported to the pod using the Admin Console or [Update User V2](https://developers.symphony.com/restapi/docs/update-user-v2). Note that RSA authentication requires you to set up each user individually; it doesn't have a concept equivalent to a "signing certificate" for all users. The private key filenames should be set in the Agent config. If both RSA and certificate authentication is configured, RSA takes precedence:Write Configuration

```
Enter selection:  f


-------------- Write Configuration --------------
[a]  Configure output directory [null]
[b]  Configure file type to generated file [properties/yaml] [YAML]
[c]  Write agent configuration file 

[q]  Return to main menu
```

The following image shows how to import the public keys to the pod, using the Admin Console. Note that you have to create a service account for the app:

![](../../.gitbook/assets/ec931f0-service\_account.png)

_(Deprecated)_ _**Option `g` (`Generate startup script`)**_**:** generates a simple shell startup script for starting the Agent. The startup script sets a number of options configured through Java VM properties (-D...) or Spring runtime properties. You can set the location of your Agent JAR file, your custom Agent config, and additional runtime variables not included in the Agent config file:

{% tabs %}
{% tab title="Modify Startup Script Configuration" %}
```
Enter selection:  g

-------------- Modify Startup Script Configuration --------------
[a]  Configure installation directory                                  [/tmp/agent]
[b]  Configure Agent properties file                                   [/tmp/agent/resources/agent.yml]

[c]  Configure server port                                             [9443]

[d]  Configure server certificate file                                 [null]
[e]  Configure server certificate password                             [null]
[f]  Configure server key password                                     [null]
[g]  Configure server key alias                                        [null]
[h]  Configure truststore file                                         [null]
[i]  Configure truststore password                                     [null]
[j]  Enforce TLS 1.2                                                   [true]

[k]  Configure debug endpoints username                                [null]
[l]  Configure debug endpoints password                                [null]

[m]  Set logs directory                                                [null]
[n]  Set logger configuration                                          [null]

[o]  Write startup script

[q]  Return to main menu
```
{% endtab %}
{% endtabs %}

The following submenu options are available:

* Sub option `[c]` (`Configure server port`): the port on which to run the Agent. If not set, defaults to 9443.
* Sub options `[d]` (`Configure server certificate file`) and `[e]` (`Configure server certificate password`): the certificate that the Agent server will present to incoming requests. By default the Agent ships with a Symphony testing certificate, but you should change it to one representing your company to prevent SSL validation errors.
* Sub options `[h]` (`Configure truststore file`) and `[i]` (`Configure truststore password`): a custom truststore for validating SSL certificates presented by the customer's Pod and Key Manager. If not set, the default Java truststore is used.
* Sub option `[j]` (Enforce TLS 1.2): for security reasons only the protocol TLS 1.2 using a strong encryption algorithm is accepted. It is enabled by default and you should not disable it unless your bots do not support TLS 1.2 and you do not want to upgrade them (not recommended).
* Sub options `[k]` (`Configure debug endpoints username`) and `[l]` (`Configure debug endpoints password`): a username and password used to access protected endpoints under /actuator (see [Debugging Endpoints](agent-2.x-and-above-installation.md#debugging-endpoints) below).
* Sub option `[m]` (`Configure logs directory`): a custom directory for Agent logs.

A generated startup script with all options set looks like this:

```
#!/usr/bin/env bash
------------------------------------------------------------------------------------------------------------------------------
Copyright (C) 2015 - 2018
Symphony Communication Services LLC
All Rights Reserved
------------------------------------------------------------------------------------------------------------------------------
The information contained herein is proprietary and confidential, and may not be duplicated or redistributed in any form
without express written consent of Symphony Communication Services LLC
------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------ Symphony API Agent ----------------------------------------------------------
#
The Agent process is a web application deployed on premise, responsible for encrypting and decrypting the payloads of
messages and files sent and received by an API caller so that the caller does not need to implement encryption itself.
#
------------------------------------------------ Customize From Here ---------------------------------------------------------
The path to the Agent's jar file
AGENT_EXECUTABLE=/home/lukasz/Downloads/agent/agent-2.2.2.jar
The Agent configuration (YAML or .properties)
AGENT_CONFIG=/home/lukasz/Downloads/agent/resources/agent.yml
Alternative location for Agent logs
LOGS_DIRECTORY=/tmp
Alternative port for the Agent server
export SERVER_PORT=8445
Keystore containing the Agent server certificate
export SERVER_SSL_KEY_STORE=/home/lukasz/Projects/atlas/symphony/global/certs/server.keystore
Password for the Agent keystore
export SERVER_SSL_KEY_STORE_PASSWORD=changeit
Alternative truststore for pod and keymanager connections
export SERVER_SSL_TRUST_STORE=/home/lukasz/Projects/atlas/symphony/global/certs/server.truststore
Password for the truststore
export SERVER_SSL_TRUST_STORE_PASSWORD=changeit
Username for accessing debug endpoints (/actuator)
export SECURITY_USER_NAME=admin
Password for the debug endpoints user
export SECURITY_USER_PASSWORD=password
------------------------------------------------- Customize To Here ----------------------------------------------------------
JAVA_OPTS="-Dfile.encoding=UTF-8"
if [ ! -z $
{LOGS_DIRECTORY} ]
then
JAVA_OPTS="${JAVA_OPTS} -Dlogs.directory=${LOGS_DIRECTORY}
"
fi
exec java $JAVA_OPTS -jar $AGENT_EXECUTABLE --agent.config=$AGENT_CONFIG
```

**Option `h` (`Write agent configuration file`) **is the final step in the generation of the config. It lets the user write the config as YAML or .properties in the directory of their choice.:

{% tabs %}
{% tab title="Write Configuration" %}
```
Enter selection:  h

-------------- Write Configuration --------------
[a]  Configure output directory                        [null]
[b]  Configure output file type [properties/yaml]      [YAML]

[c]  Write agent configuration file

[q]  Return to main menu

Enter selection:
```
{% endtab %}
{% endtabs %}

This config must be used to start the Agent:

```
java jar agent<version>.jar --agent.config=<outputDir/agent>.<fileType>
```

Note that each property in the generated config is annotated with comments describing its purpose.

**Option `i`(`Encrypt a configuration property`) **allows to encrypt the sensitive passwords and keys of the Agent configuration to avoid having to store them in clear text.

Before encrypting, you must provide the encryption password that will be used for the encryption and then the decryption. This password can be either passed through:

* As an environment variable, named AGENT\_CONFIG_\__PASSWORD
* As a JVM parameter, named AGENT\_CONFIG\_PASSWORD
* Or will be requested directly through the interactive setup script, if none of the above variables are set.

{% tabs %}
{% tab title="Property Encryption" %}
```
Enter selection: i

-------------- Property Encryption --------------
[a]  Encrypt a configuration property 
[b]  Encrypt credentials stored in a file

[q]  Return to main menu

Enter selection:
```
{% endtab %}
{% endtabs %}

Select `Option a` to encrypt a property of the agent configuration.\
The following properties of the agent.yaml or properties of the environment/JVM parameters can be encrypted:

```
agent.proxy.symphony.password
agent.proxy.keymanager.password
agent.proxy.firehose.password
agent.certificate.agentservice.password
agent.privateKey.agentservice.content
agent.certificate.ceservice.password
agent.privateKey.ceservice.content

SERVER_SSL_KEY_STORE_PASSWORD      
SERVER_SSL_KEY_PASSWORD
SERVER_SSL_TRUST_STORE_PASSWORD       
SPRING_SECURITY_USER_PASSWORD
```

Select `Option b` to encrypt credentials stored in a file.&#x20;

Once the property has been selected, the script will output the resulting encrypted value with the format **ENC(..., ...).**\
****Please then set the value of the property or parameter required with this encrypted string of characters.

{% hint style="info" %}
Please note that as the value of the properties will contain parenthesis`'('` (special character), you may need to wrap the property values with double quotes "". See below an example:

```
export SERVER_SSL_KEY_STORE_PASSWORD="ENC(...,...)"
```
{% endhint %}

The steps above need to be repeated for each property or parameter that requires encryption.

{% hint style="info" %}
Please note that all the properties need to be encrypted with the **same password.**
{% endhint %}

Then the password used for the encryption needs to be provided to the Agent before startup, either using an environment variable or a JVM parameter named `AGENT_CONFIG_PASSWORD.` See the example below.

{% tabs %}
{% tab title="Environment variable" %}
```
export AGENT_CONFIG_PASSWORD=<password>
```
{% endtab %}

{% tab title="JVM parameter" %}
```
-DAGENT_CONFIG_PASSWORD=<password>
```
{% endtab %}
{% endtabs %}

At startup, the agent will then retrieve the password and decrypt any of the encrypted properties or credentials.

## Debugging Endpoints

The Agent server includes a number of Actuator endpoints providing debugging information.

In the cloud setup, the actuator endpoints are disabled by default, and in on-prem setups, it has the `health` and `register` endpoints enabled by default.

All actuator endpoints are password-protected and are configured on a separate port, with 10443 as the default value. The port can be overridden by setting the property\
`--management.server.port=<value>` when starting the Agent application.

### Security

The security username and password can be set by launching the Agent with:\
`--spring.security.user.name=admin --spring.security.user.password=password `. If not set, the security password is automatically generated by the application.

Check the Agent startup logs to find the generated value:

```
2019-10-31T12:05:39,442 INFO  [main] UserDetailsServiceAutoConfiguration#  - 

Using generated security password: <password-value>
```

### Endpoints

The following list shows the available actuator endpoints for the Agent application:

| Endpoint name and path                                                          | Activated | Description                                     | Method | Activation flag                                 |
| ------------------------------------------------------------------------------- | --------- | ----------------------------------------------- | ------ | ----------------------------------------------- |
| <p>actuator<br><code>/agent/actuator</code></p>                                 | yes       | List of all enabled endpoints.                  | GET    |                                                 |
| <p>register<br><code>/agent/actuator/register</code></p>                        | yes       | Agent re-registration.                          | POST   |                                                 |
| <p>health<br><code>/agent/actuator/health</code></p>                            | yes       | Displays the health status of your application. | GET    |                                                 |
| <p>info<br><code>/agent/v1/info</code><br><code>/agent/actuator/info</code></p> | no        | Displays information about your application.    | GET    | `--management.endpoint.info.enabled=true`       |
| <p>env<br><code>/agent/actuator/env</code></p>                                  | no        | Displays current environment properties.        | GET    | `--management.endpoint.env.enabled=true`        |
| <p>threaddump<br><code>/agent/actuator/threaddump</code></p>                    | no        | Performs a thread dump.                         | GET    | `--management.endpoint.threaddump.enabled=true` |
| <p>heapdump<br><code>/agent/actuator/heapdump</code></p>                        | no        | Returns a GZip compressed JVM heap dump.        | GET    | `--management.endpoint.heapdump.enabled=true`   |
| <p>metrics<br><code>/agent/actuator/metrics</code></p>                          | no        | Real-time metrics.                              | GET    | `--management.endpoint.metrics.enabled=true`    |
| <p>prometheus<br><code>/agent/actuator/prometheus</code></p>                    | no        | Prometheus scrapping endpoint.                  | GET    | `--management.endpoint.prometheus.enabled=true` |

{% hint style="info" %}
Note:&#x20;

Paths above are relative to the management URL[: https://agent-server.symphony.com:10443](https://agent-server.symphony.com:10443)
{% endhint %}

## Logging

If you want to set DEBUG log level agent.log, set

{% tabs %}
{% tab title="Bash" %}
```bash
-DlogLevel=DEBUG
```
{% endtab %}

{% tab title="Text" %}
```
Note that the above "-D" option must come before "-jar" argument.

If you want to provide a custom logging configuration, include:
```
{% endtab %}

{% tab title="Bash" %}
```
--logging.cofig=/home/acme/log4j2.xml
```
{% endtab %}
{% endtabs %}

### **Logging Rotation**

By default, the Agent has a logging rotation strategy to keep up to 10 local files, where each file can have a max file size of 100 MB.\
When a file "rotates", it will be automatically zipped and renamed, adding a number at the end. This number corresponds to how many times the file has already rotated. The numbers will stop being added when the file reaches the limit size.

{% hint style="info" %}
Note: the Agent has 3 log files: _agent.log_, _agent-error.log_, and _agent-metrics.log_.
{% endhint %}

Example:

```
agent-1.log.gz
agent-2.log.gz
agent-error-1.log.gz
agent-error-2.log.gz
agent-metrics-1.log.gz
agent-metrics-2.log.gz
```

Logging rotation can be customized for all 3 files by setting the following AM options:

{% tabs %}
{% tab title="Bash" %}
```
-DmaxLogFiles=20
-DlogFileSizeLimit="500 MB"
```
{% endtab %}

{% tab title="Text" %}
```
With the above, all 3 Agent log files will rotate (independently) when one of them hits 500 MB in "unzipped" size, and will keep up to 20 files, always keeping the latest ones and discarding the older ones if it goes beyond the file limit.

To customize these parameters for each log file independently, the following configuration can be used (it also demonstrates the syntax for sizes):

agent.log:
```
{% endtab %}

{% tab title="Bash" %}
```
-Dagent.maxLogFiles=5
-Dagent.logFileSizeLimit="2 GB"
```
{% endtab %}
{% endtabs %}

agent-error.log:

```bash
-Derror.maxLogFiles=15
-Derror.logFileSizeLimit=800MB
```

agent-metrics.log:

```bash
-Dmetrics.maxLogFiles=20
-Dmetrics.logFileSizeLimit=500KB
```

The parameters presented above can be combined in any configuration, with the more specific parameters taking precedence over the general one.\
The following example uses all parameters presented until now, but note that the first 2, the more general ones, will be useless in this configuration because all others are being specified:

```
xLogFiles=15 -Derror.logFileSizeLimit=800MB -Dmetrics.maxLogFiles=20 -Dmetrics.logFileSizeLimit=500KB -jar agent.jar --agent.config=<your-agent-config>.yml
```

The previous command will have the same effect as the command below:

```
java -Dagent.maxLogFiles=5 -Dagent.logFileSizeLimit="2 GB" -Derror.maxLogFiles=15 -Derror.logFileSizeLimit=800MB -Dmetrics.maxLogFiles=20 -Dmetrics.logFileSizeLimit=500KB -jar agent.jar --agent.config=<your-agent-config>.yml
```

{% hint style="info" %}
Note: Keep in mind that none of the previous configurations need to be set, this is just for customization purposes.
{% endhint %}

## Upgrade

There is no upgrade path for the Agent. The new Agent can be installed on the same Agent Server as any previous version.

Make sure to shut down your agent first, and then keep your configuration and startup/stop script when you upgrade to a new version.
