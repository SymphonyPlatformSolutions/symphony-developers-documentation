# ECP Partner Platform Integration

## Description

Embedded Collaboration Platform allows you to embed Symphony within your application to provide full collaboration capabilities to your users. Your users can collaborate with half a million people across thousands of institutions on the Symphony network without leaving your platform. This allows you to add Symphony's secure and compliant chat capabilities to your application, unlocking instant external connectivity and workflow efficiency. &#x20;

Using Symphony ECP, you can allow your application users who are already part of Symphony to login to their existing Symphony account. All the chats that happen on your application are logged and are provided as part of the content export to the users' respective Symphony organizations.&#x20;

If a user of your application is not already part of Symphony, you can create accounts for them in Symphony, thereby enabling them to use Symphony from your application to collaborate. Moreover you can also enable them to single sign on (SSO) to Symphony if your application can act as an identity provider using the Open ID connect (OIDC) or SAML protocols. As expected, all the chats will be logged and made available for content export to their respective companies for the new users you bring to Symphony.&#x20;

See [Channel Connect](../../symphony-rest-api/symphony-channel-connect-rest-api.md) for more information about creating accounts for your users who need a new Symphony account.&#x20;



{% hint style="warning" %}
Embedded Collaboration Platform (ECP) functionality is available as an add-on to the Symphony Services, and is subject to additional charges, terms, and Symphony review of your ECP use case. Prior to using ECP in your Symphony environment(s), you will need to enter into an ECP-specific contract. Please reach out to sales@symphony.com to review your use case, discuss the offering, its pricing or for any further information.
{% endhint %}

## Finding the correct pod

In Symphony, each user belong to one pod, which is an instance of a Symphony system allocated to a company. Each Symphony pod has its own domain name, and each user can only log on the pod that user is defined. ECP has to be instantiated from the pod the user is defined on.

In order to know on which pod is a user defined from the user email address, the following service can be called from any pod:&#x20;

`curl --location --request POST 'https://{pod}/webcontroller/v2/podLoginInformation' --data-raw '{ "emailAddress": "useremail@domain.com" }'`

For partners who don't own their own pod, this service is available from `loginservice.symphony.com` for Production, and `loginservice-test.symphony.com` for Test.

Example:

`curl --location --request POST 'https://loginservice-test.symphony.com/webcontroller/v2/podLoginInformation' --data-raw '{ "emailAddress": "useremail@domain.com" }'`

This service returns a json payload representing an array of pods on which the user is defined, and the pod domain is available under the `tenantDomain` field.



## Enabling Single Sign On for users

In order to send the user to the correct SSO system for their organisation, there is an additional parameter available in the [configuration parameters](./#configuration-parameters) . You should pass this to the SDK when instantiating the session.

```typescript
userEmail: string; // Email of the user
```

<mark style="background-color:green;"></mark>
