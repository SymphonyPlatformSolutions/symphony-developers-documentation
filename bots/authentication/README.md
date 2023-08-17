# Authentication

In order for bots to access the Symphony REST API and other Symphony resources, bots must first authenticate.

As we learned in [Overview of Pod API](../overview-of-rest-api/pod-api.md), bots must be authenticated on the Pod in order to access Pod API endpoints. To make authenticated Pod API calls, bots must pass a valid Session Token as a header of each Pod API request.

We also learned in [Overview of Agent API](../overview-of-rest-api/agent-api.md), that bots must be authenticated on the Key Manager in order to access Agent API endpoints. To make authenticated Agent API calls, Bots must pass a valid Session Token and Key Manager Token as headers of each Agent API request.

{% hint style="info" %}
### Token Management

The token you receive is valid for the lifetime of a session that is defined by your Pod's administration team. This ranges from 1 hour to 2 weeks.

You should keep using the same token until you receive an HTTP 401, at which you should re-authenticate and get a new token for a new session.

Note: Datafeeds survive session expiration, you do not need to re-create your datafeed if your session expires.
{% endhint %}

In order to obtain a valid Session Token and Key Manager Token, bots must call the Session Authenticate endpoint on the Pod and Key Manager Authentication endpoint on the Key Manager.

## RSA Authentication Workflow

We recommend that bots follow the RSA authentication workflow in order to obtain valid Session and Key Manager Tokens:

{% content-ref url="rsa-authentication.md" %}
[rsa-authentication.md](rsa-authentication.md)
{% endcontent-ref %}

## Certificate-Based Authentication Workflow

For users that do not want to use RSA Authentication, bots can perform certificate-based authentication in order to obtain valid Session and Key Manager Tokens:

{% content-ref url="certificate-authentication.md" %}
[certificate-authentication.md](certificate-authentication.md)
{% endcontent-ref %}
