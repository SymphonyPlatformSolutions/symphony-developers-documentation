# Authentication

In order for Bots to access the Symphony REST API and other Symphony resources, Bots must first authenticate themselves.  

As we learned in [Overview of Pod API](../overview-of-rest-api/pod-api.md), Bots must be authenticated on the Pod in order to access Pod API endpoints.  To make authenticated Pod API calls, Bots must pass a valid Session Token as headers of each Pod API request.  

We also learned in [Overview of Agent API](../overview-of-rest-api/agent-api.md), that Bots must be authenticated on the Key Manager in order to access Agent API endpoints.  To make authenticated Agent API calls, Bots must pass a valid Session Token and Key Manager Token as headers of each Agent API request.

{% hint style="danger" %}
#### Token Management

The token you receive is valid for the lifetime of a session that is defined by your Pod's administration team.  This ranges from 1 hour to 2 weeks.

You should keep using the same token until you receive an HTTP 401, at which you should re-authenticate and get a new token for a new session.

Note that Datafeeds survive session expiration, you do not need to re-create your Datafeed if your session expires.
{% endhint %}

In order to obtain a valid Session Token and Key Manager Token, Bots must call the Session Authenticate endpoint on the Pod and Key Manager Authentication endpoint on the Key Manager respectfully.

## RSA Authentication Workflow

We recommend that  Bots follow the RSA Bot authentication workflow in order to obtain valid Session and Key Manager Tokens:

{% page-ref page="rsa-authentication.md" %}

## Certificate-Based Authentication Workflow

For users that do not want to use RSA Authentication, Bots can perform certificate-based authentication in order to obtain valid Session and Key Manager Tokens:

{% page-ref page="certificate-authentication.md" %}

