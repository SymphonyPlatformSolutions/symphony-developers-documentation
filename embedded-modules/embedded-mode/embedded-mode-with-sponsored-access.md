# Embedded Mode with Sponsored Access

## Symphony Sponsored Access

Symphony Sponsored Access allows Symphony partners to enable the users of their applications to collaborate on Symphony Messaging by adding those companies and users to the Symphony network. Partners can use these APIs to check if their application users are on Symphony Messaging and create accounts for them on Symphony Messaging if required.

#### Onboarding Users

Partners can onboard users via two primary methods:

* **Symphony Admin Portal**: Using the **Manage Companies** tab.
* **Sponsored Access API**: For programmatic onboarding.

See [Sponsored Access API](https://docs.developers.symphony.com/symphony-rest-api/symphony-channel-connect-rest-api) for more information on Sponsored Access and how to create accounts for users who need a new Symphony Messaging account.&#x20;

## Single Sign On support

Symphony users can benefit from Single Sign On if it has been configured by the Partner that has onboarding them.

Access to Single Sign-On (SSO) depends on how the user was onboarded:

* **Sponsored Access Users:** Benefit from SSO if it has been configured by the **Partner** that onboarded them.
* **Standard Users:** Benefit from SSO if it has been configured by their own **Company Administrator**.

When a user logs in via Embedded Mode from your portal, they are automatically redirected to the appropriate Identity Provider (either their company SSO or the Partner SSO).

## Bring your own Single Sign On

Users that you have onboarded on Symphony Messaging can also benefit from Single Sign On if your application acts as an Identity Provider (IdP), you can authenticate users you have onboarded using industry-standard protocols. Symphony supports:

* SAML 2.0
* OpenID Connect (OIDC)
* JWT (JSON Web Token) Login

#### JWT Login Implementation

JWT login is supported **only for Sponsored Access tenants created by the partner** (that is, tenants onboarded and managed through Sponsored Access).  For partners who prefer a lightweight, token-based approach without a full OIDC/SAML handshake.

To authenticate using JWT, provide the JWT in the `render` method configuration by passing `subjectToken` within the `auth` object.

```javascript
symphony.render('symphony-ecm', {
        streamId: '',
        ecpLoginPopup: true,
        auth: {
           subjectToken: jwt
        }
})
```

If the user belongs to a **non-sponsored (standard) Symphony tenant**, JWT login is not supported. In that case, use standard login flows (SSO/password), for example by calling `symphony.checkAuth()` and using popup login or full-page redirect login when required.

{% hint style="info" %}
To implement "Bring Your Own SSO" or JWT-based login for your specific Symphony Sponsored tenants, please reach out to your Symphony representative for metadata exchange and certificate configuration.
{% endhint %}

### User Discovery & Implementation Logic

Before rendering Embedded Mode, you should locate the user on a Symphony tenant to determine the correct login flow. This discovery step is used to identify:

* which tenant URL to load Embedded Mode from
* whether the tenant is a Sponsored Access tenant (partner-created)
* whether JWT login can be used, or whether standard login is required

#### Community directory search

Use the community directory search endpoint to locate a user and identify the correct tenant and login flow.

**Endpoint**: `https://community.symphony.com/directory/search`\
**Method**: `GET`

**Query parameters**

| Parameter   | Required | Description                                             |
| ----------- | -------- | ------------------------------------------------------- |
| `partnerId` | Yes\*    | Partner identifier used to scope the discovery request. |
| `email`     | Yes\*    | User email to locate on Symphony.                       |

**Example request**

```
https://community.symphony.com/directory/search?partnerId=<partnerId>&email=<userEmail>
```

#### Discovery outputs

| Output                        | Type    | Description                                                              |
| ----------------------------- | ------- | ------------------------------------------------------------------------ |
| `matchingUserFound`           | boolean | A Symphony user exists for the provided identifier (for example, email). |
| `matchingSymphonyTenantFound` | boolean | A tenant match exists even if a user was not found.                      |
| `tenantSponsored`             | boolean | Tenant is partner-created via Sponsored Access.                          |
| `tenantUrl`                   | string  | Base URL for the matched tenant.                                         |

#### Discovery scenarios and actions

| Scenario                                         | Discovery result                                                   | Recommended behaviour                                                                                                                                                             |
| ------------------------------------------------ | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1) User found on a sponsored tenant              | `matchingUserFound = true`, `tenantSponsored = true`               | Render Embedded Mode. If you have a JWT, pass it using `auth.subjectToken` (recommended).                                                                                         |
| 2) User found on a non-sponsored tenant          | `matchingUserFound = true`, `tenantSponsored = false`              | JWT login is not supported. Call `symphony.checkAuth()`. If logged in, call `symphony.render()`. If not logged in, use popup login (`ecpLoginPopup`) or full-page redirect login. |
| 3) No user found, but sponsored tenant found     | `matchingUserFound = false`, `tenantSponsored = true`              | Implement custom behaviour (for example: call Sponsored Access API to create the user, then render Embedded Mode).                                                                |
| 4) No user found, but non-sponsored tenant found | `matchingUserFound = false`, `tenantSponsored = false`             | Implement custom behaviour (for example: instruct the user to contact their tenant administrator).                                                                                |
| 5) No user found and no tenant found             | `matchingUserFound = false`, `matchingSymphonyTenantFound = false` | Implement custom behaviour (for example: unsupported user, request access, partner support).                                                                                      |

{% hint style="info" %}
**Note**: `tenantSponsored = true` means JWT login is supported for that tenant. `tenantSponsored = false` means you must use standard authentication (SSO/password), not JWT.
{% endhint %}

### Full Page Login Redirection

If a user is found on a non-sponsored tenant and is not currently authenticated, you should redirect them to their specific Symphony tenant login page. Once authenticated, Symphony will redirect them back to your application.

If you know the tenant URL and the user is not authenticated (or popup login is blocked by browser restrictions), redirect the user to the tenant login page and provide a return URL using `symRedirectUrl`:

`https://{tenant}.symphony.com/apps/login?symRedirectUrl={redirectUrl}`

Example helper:

```js
function topLevelLogin(tenantUrl) {
  const url = new URL(`${tenantUrl}/apps/login`)
  url.searchParams.append('symRedirectUrl', location.href)
  location.href = url.href
}
```

#### Reference implementation

A complete example is available here:

```
https://develop2.symphony.com/apps/embed/default/sponsored-access-example.html?partnerId={partnerID}&env={uat}&email={userEmail}
```

The example demonstrates:

* how to interpret user discovery results from the community directory search
* rendering with and without JWT (for sponsored tenants)
* using `symphony.checkAuth()` to detect whether the user is logged in
* falling back to full-page login redirection
* splitting behaviour across discovery outcomes
