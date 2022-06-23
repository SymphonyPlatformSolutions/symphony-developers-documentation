# ECP Partner Platform Integration

## Description

Embedded Collaboration Platform allows you to embed Symphony within your application to provide full collaboration capabilities to your users. Your users can collaborate with half a million people across thousands of institutions on the Symphony network without leaving your platform. This allows you to add Symphony's secure and compliant chat capabilities to your application, unlocking instant external connectivity and workflow efficiency. &#x20;

Using Symphony ECP, you can allow your application users who are already part of Symphony to login to their existing Symphony account. All the chats that happen on your application are logged and are provided as part of the content export to the users' respective Symphony organizations.&#x20;

If a user of your application is not already part of Symphony, you can create accounts for them in Symphony, thereby enabling them to use Symphony from your application to collaborate. Moreover you can also enable them to single sign on (SSO) to Symphony if your application can act as an identity provider using the Open ID connect (OIDC) or SAML protocols. As expected, all the chats will be logged and made available for content export to their respective companies for the new users you bring to Symphony.&#x20;

See [Channel Connect](https://app.gitbook.com/o/-MB5vuhMZDPnMHgoaIX-/s/4uJeX0uviD4DcU2ZVSdt/) for more information about creating accounts for your users who need a new Symphony account.&#x20;



## Finding the correct pod

In Symphony, each user belong to one pod, which is an instance of a Symphony system allocated to a company. Each Symphony pod has its own domain name, and each user can only log on the pod that user is defined. ECP has to be instantiated from the pod the user is defined on.

In order to know on which pod is a user defined from the user email address, the following service can be called:&#x20;

`curl --location --request POST 'https://{podUrl}.symphony.com/webcontroller/v2/podLoginInformation' --data-raw '{ "emailAddress": "useremail@domain.com" }'`

This service returns a json payload representing an array of pods on which the user is defined, and the pod domain is available under the `tenantDomain` field.

This service is available from SBE 20.14+.&#x20;

For partners who don't own their own pod, this service is available from  `https://cp2.symphony.com` for Production, and `https://cp2-test.symphony.com` for Test.

## Enabling Single Sign On for users (only applicable for partners who can act as Identity Providers)

<mark style="background-color:green;">Olivier/Yannick passing userEmail as part of the ECP initiation etc..</mark>&#x20;