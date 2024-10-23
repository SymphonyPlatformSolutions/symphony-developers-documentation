# Embedded Mode with Symphony Connect

## Symphony Connect offering

Symphony Connect allows Symphony partners to enable the users of their applications to collaborate on Symphony by adding those companies and users to the Symphony network. Partners can use these APIs to check if their application users are on Symphony and create accounts for them on Symphony if required.

See [Connect API](https://docs.developers.symphony.com/symphony-rest-api/symphony-channel-connect-rest-api) for more information on Symphony Connect and how to create accounts for users who need a new Symphony account.&#x20;

## Single Sign On support

Symphony Connect users can benefit from Single Sign On if it has been configured by their admin. \
In order to redirect Symphony Connect users to the SSO applicable to them, you need to specify the user email as a configuration parameter to the SDK when instantiating Embedded Mode.

```typescript
userEmail: string; // Email of the user
```

Please note that this is required only for Symphony Connect users.&#x20;

If a regular Symphony user logs in Embedded Mode from your portal, they will be automatically redirected to their company SSO, without relying on the `userEmail` parameter.

## Bring your own Single Sign On

Users that you have onboarded on Symphony can also benefit from Single Sign On if your application can act as an identity provider using the Open ID connect (OIDC) or SAML protocols. Please reach out to us for more information.
