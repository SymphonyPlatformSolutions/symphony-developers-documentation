# Certificate Authentication Workflow

This pages describes the implementation of certificate-based Authentication. For the API reference of Certificate Session Authenticate and Certificate Key Manager Authenticate, see the following API endpoints:

* Session Auth: [https://developers.symphony.com/restapi/main/bot-authentication/session-authenticate](https://developers.symphony.com/restapi/main/bot-authentication/session-authenticate)
* Key Manager Auth: [https://developers.symphony.com/restapi/main/bot-authentication/key-manager-authenticate](https://developers.symphony.com/restapi/main/bot-authentication/key-manager-authenticate)

{% hint style="info" %}
Note: The following authentication sequence is provided out of the box by our dedicated BDK and WDK toolkits.  To learn more about authenticating using the SDKs or BDK proceed to one of following configuration guides:

* [Configure your Bot for BDK 2.0 for Java](../getting-started/bdk.md)
{% endhint %}

## Overview of Certificate-Based Authentication

Symphony allows you to authenticate on the Pod and Key Manager with a client certificate that is signed by a trusted root certificate. When a bot calls the Session Authenticate endpoint, the Pod examines the client certificate provided in the TLS session to identify the bot user and return a Session Token. The same process occurs when a bot authenticates on the Key Manager.

All Symphony network communications take place over TLS-protected HTTP. The network uses authentication methods that require a client-authenticated TLS connection.

Client certificate authentication in TLS is configured at the port level. Two distinct ports are required for client-authenticated and non-client-authenticated connections. The web and mobile endpoints listen on port 443 (the default port number for HTTPS connections). The API endpoints require a separate port, typically port 8444.

## Summary

1. The Admin upload a Signing certificate or Root certificate using the **Admin portal**.
2. The Admin provides to the developer a child client certificate derived from the Signing or Root certificate
3. The developer authenticates the Bot using the client certificate.

**Note**: It is also possible to directly upload a Client certificate in the Admin portal instead of a Signing or Root certificate.&#x20;

## 1.  Upload a Signing Certificate or Root Certificate

{% hint style="warning" %}
Please note the below steps can only be performed by a Symphony Pod Administrator as they will have the necessary administrator privileges to access the Administration Portal.
{% endhint %}

{% hint style="info" %}
The certificate should be concerted to a CER or PEM format before it is uploaded
{% endhint %}

Once you have obtained a copy of your Root Certificate Authorities (CA) Public "Signing Certificate", you can upload it using the following steps:

1. Navigate to the Symphony Admin Console for your Pod (e.g. [https://mypod.symphony.com/?admin](https://mypod.symphony.com/?admin)), then log in with your credentials
2. Once logged in click the _Manage Certificates_ button then select _Import_
3. Drag and drop your Certificate file into the popup window:

![](<../../.gitbook/assets/Screen Shot 2020-07-07 at 4.21.52 PM.png>)

1. Once you have uploaded the certificate file, click _Import._  If successful you will receive a confirmation message saying that the certificate has been uploaded successfully.

## 2. Generate a Client Certificate

You can use the following commands to generate the service account certificate. **The certificate must use 4096 bits length**.

```
$ openssl genrsa -aes256 -passout pass:$PASSWORD -out admin-key.pem 4096
$ openssl req -new -key admin-key.pem -passin pass:$PASSWORD -subj "/CN=$USERNAME/O=Symphony Communications LLC/OU=NOT FOR PRODUCTION USE/C=US" -out admin-req.pem
$ openssl x509 -req -sha256 -days 2922 -in admin-req.pem -CA $CA_CERT -CAkey $CA_KEY -passin pass:$CA_PASSWORD -out admin-cert.pem -set_serial 0x1
$ openssl pkcs12 -export -out admin.p12 -aes256 -in admin-cert.pem -inkey admin-key.pem -passin pass:$PASSWORD -passout pass:$OUTPUT_PASSWORD
```

* USERNAME = Service account username
* PASSWORD = Service account key password
* CA\_CERT = CA certificate file
* CA\_KEY = CA key file
* CA\_PASSWORD = CA key password
* OUTPUT\_PASSWORD = PKCS12 file password

### Creating a Certificate Signing Request (CSR):

The following table shows the information you will need to provide to your PKI team:

{% hint style="info" %}
The Common Name (CN) value must match the name of the Symphony Service Account you created, this should also use the same case value.
{% endhint %}

| Details          | Example Values            |
| ---------------- | ------------------------- |
| Certificate Type | Single Domain Certificate |
| Common Name (CN) | demo-bot1                 |
| Organization     | Excelsior Bank            |
| Department       | Collaboration Services    |
| Email            | admin@bots.symphony.com   |
| Locality         | London                    |
| State / Province | London                    |
| Country          | GB                        |
| Key Size         | 2048 bits                 |

## 3. Authenticate

To authenticate on the Pod the bot must call the Session Auth endpoint: [https://developers.symphony.com/restapi/main/bot-authentication/session-authenticate](https://developers.symphony.com/restapi/main/bot-authentication/session-authenticate). Pass along the client certificate provided in the TLS session, returning a Session Token:

```bash
$ curl --cert bot.user1.p12:mypassword
https://${symphony.url}/sessionauth/v1/authenticate
-X POST
```

A successful response:

{% tabs %}
{% tab title="200" %}
```bash
{
  "name":"sessionToken",  
  "token":"SESSION_TOKEN"
}
```
{% endtab %}
{% endtabs %}

To authenticate on the Key Manager, the bot must call the Key Manager Auth endpoint: [https://developers.symphony.com/restapi/main/bot-authentication/key-manager-authenticate](https://developers.symphony.com/restapi/main/bot-authentication/key-manager-authenticate). Pass along the client certificate provided in the TLS session, returning a Key Manager Token:

```bash
$ curl --cert bot.user1.p12:mypassword
https://${symphony.url}/keyauth/v1/authenticate
-X POST
```

A successful response:

{% tabs %}
{% tab title="200" %}
```bash
{
  "name":"keyManagerToken",
  "token":"KEY_MANAGER_TOKEN"
}
```
{% endtab %}
{% endtabs %}

Pass the Session Token and Key Manager Token as headers for all subsequent API requests.
