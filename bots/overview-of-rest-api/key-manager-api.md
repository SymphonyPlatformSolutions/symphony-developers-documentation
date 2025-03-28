# Overview of Key Manager API

## Symphony Messaging Key Manager APIs <img src="../../.gitbook/assets/Symphony API.png" alt="" data-size="line">

The Symphony Messaging Key Manager API's sole purpose is to authenticate a bot or API caller with the Key Manager.

## Key Manager Authenticate API <img src="../../.gitbook/assets/Symphony API.png" alt="" data-size="line">

In order to access Agent API endpoints, bots must be authenticated with the Pod and the Key Manager. To authenticate with the Key Manager, a bot must call the [Key Manager Authenticate endpoint](https://developers.symphony.com/restapi/main/bot-authentication/rsa-key-manager-authenticate).

If successful, the Key Manager API returns a Key Manager Token which is valid for up to two weeks. This Key Manager Token must be passed along with every subsequent Agent API request in order to encrypt/decrypt messages on the Agent server. You can read more about Authentication and Token management here:

{% content-ref url="../authentication/" %}
[authentication](../authentication/)
{% endcontent-ref %}
