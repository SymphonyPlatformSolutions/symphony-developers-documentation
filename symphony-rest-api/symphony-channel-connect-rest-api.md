# Symphony Channel Connect REST API

Channel Connect allows Symphony partners to enable the users of their applications to collaborate on Symphony by adding those companies and users to the Symphony network. Partners can use these APIs to check if their application users are on Symphony and create accounts for them on Symphony if required.

This page describes the APIs available for the partners to look up, add and manage their users on Symphony.

### Pre-requisites

Before they can use these endpoints, partners must register with Symphony. After registration, the partner will receive credentials to authenticate to these APIs.

To register with Symphony to create new users and to embed Symphony within your application, please [contact us](https://symphony.com/solutions/embedded-collaboration-platform/).

## Domains

In order to target the different APIs described below, the user should use the correct domain, depending on their environment:

* PROD: **community.symphony.com/connect-service**
* UAT: **community.uat.symphony.com/connect-service**

## Authentication

To be able to call this API, you first need to get an access token.

```shell
curl --request POST \
  --url https://us-auth.prod.symphony.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"$client_id","client_secret":"$client_secret","audience":"https://api.symphony.com/partners","grant_type":"client_credentials"}'
```

To get your `client_id` and your `client_secret`, please contact Symphony.

In the response, you should get:

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkthaFZHSlZUOFRuSWNRamNrTW1FcSJ9.eyJodHRwczovL2F1dGguc3ltcGhvbnkuY29tL3BhcnRuZXJfaWQiOiJ5b3VyX3BhcnRuZXIiLCJpc3MiOiJodHRwczovL2Rldi13NHRlc2NvZS51cy5hdXRoMC5jb20vIiwic3ViIjoiS0pCSkpMdnd4ZkllZ0NRdjBCNm5lcGxZN25rYVNOam9AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLnN5bXBob255LmNvbS9wYXJ0bmVycyIsImlhdCI6MTY1NDI2MzMxMCwiZXhwIjoxNjU0MzQ5NzEwLCJhenAiOiJLSkJKSkx2d3hmSWVnQ1F2MEI2bmVwbFk3bmthU05qbyIsInNjb3BlIjoiY29tbXVuaXR5OmFjY291bnRzOm9uYm9hcmQiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.BN5iW4sXeo4B3ecp0u3fj--tYhsVTZOWi_UgaPvHdS4PI2uopT-XfcBLCIb1PIXogshy8ZAQkwwQpiroBd9rcJDHW-ERsCWCsc6ruZKIHmvslAVF7AoLNN_GbqvvTgKLqbfTqdgNcyCg27oem6il8NhQDO0mu9ndOsJtdmwQ7Tczkla8uBoHiEO7_p1F17njxQYxpXbmG2Tfe_SUUmS0ec5vbV2-btKet3uMm5J8E8mockr8VrXLcu5hNxishELrQ6uCgmreit8R4EZNVIwK43CRnibCV7F8MQpiTkNJMYnVybwdqNOZFBzcuXRQIQHEmiW41xILuXOdPowCvBAS7w",
  "token_type": "Bearer"
}
```

Now you can use the `access_token`to make authorized calls to the API. You should pass it as a Bearer token in the Authorization header.

### Get the user's pod and check eligibility for new account creation

The aim of this endpoint is to give a partner the ability to know the user's status in Symphony and eligibility of the user for a new account, so that they can enable this user to use Symphony.

* Calling this endpoint requires the **community:accounts:onboard** scope.
* The input for this endpoint is the **user email**.
* Regarding the response, multiple scenarios are possible:

#### If the user exists, and their Symphony account is active:

```json
HTTP 200
{
  "code" : "USER_EXISTS"
  "podUrl": "The URL of the pod to which the requested user belongs"
}
```

#### If the user doesn’t exist, or their Symphony account is deactivated, and they are associated to a company that belongs to a tier1, tier2, tier3:

```json
HTTP 200
{
  "code" : "USER_NEEDS_ACCESS"
  "podUrl": "The URL of the pod to which the requested user belongs"
  "message": "This company is on Symphony, but this user requires an account. They should ask their Symphony administrator for access."
}
```

#### If the user doesn’t exist, or their Symphony account is deactivated, and they are associated to a company that belongs to a Channel Connect company:

```json
HTTP 200
{
  "code" : "USER_ELIGIBLE_FOR_NEW_ACCOUNT"
  "podUrl": "The URL of the pod to which the requested user belongs"
  "message": "This user is eligible for an account; you can add one through the create user API."
}
```

#### If an invalid email is provided:

```json
HTTP 400
{
  "code" : "INVALID_USER_EMAIL"
  "message": "Invalid user email: {{invalidEmail}}."
}
```

#### If an unauthorized email domain is provided:

```json
HTTP 400
{
  "code" : "EMAIL_DOMAIN_NOT_ALLOWED"
  "message": "Only corporate email domains are allowed."
}
```

{% swagger src="../.gitbook/assets/api.yaml" path="/v1/onboarding/tenant" method="get" %}
[api.yaml](../.gitbook/assets/api.yaml)
{% endswagger %}

### Create user

A Channel Connect partner can use this endpoint to provision new users in Symphony.

First, a channel partner should check if the requested user account(s) can be created using the [Get user's pod and availability for onboarding](symphony-channel-connect-rest-api.md#v1-onboarding-tenant) API.

Then, if the user(s) don't exist and new accounts can be created for them (**USER\_ELIGIBLE\_FOR\_NEW\_ACCOUNT**), the partner can call this API to either create the new user(s) in a new Channel Connect company, or add user(s) to an existing one.

Calling this endpoint requires the **community:accounts:onboard** scope.

As an input, the partner must provide a **companyName** and an array of users (with at least the required request attributes: **firstName**, **lastName** and **email**).

#### Example of a request

```json
{
  "companyName": "ACME Channel Connect",
  "users": [
    {
      "firstName": "James",
      "lastName": "Smith",
      "phoneNumber": "33612345678",
      "displayName": "Paul Smith",
      "location": "New York",
      "department": "Product Engineering",
      "title": "Manager",
      "email": "james.smith@acme-company.com"
    },
    {
      "firstName": "Maria",
      "lastName": "Garcia",
      "phoneNumber": "33612345678",
      "displayName": "Maria Garcia",
      "location": "New York",
      "department": "Product Engineering",
      "title": "Manager",
      "email": "maria.garcia@acme-company.com"
    },
    {
      "firstName": "Paul",
      "lastName": "Smith",
      "phoneNumber": "33612345678",
      "displayName": "Paul Smith",
      "location": "New York",
      "department": "Product Engineering",
      "title": "Manager",
      "email": "paul.smith@acme-company.com"
    }
  ]
}
```

{% hint style="danger" %}
For each possible scenario described below, at the bottom of the description you can find the response returned for the request above.
{% endhint %}

#### Request attributes description

| Request attribute | Required | Possible values                                                                                  |
| ----------------- | -------- | ------------------------------------------------------------------------------------------------ |
| **companyName**   | Yes      | <p>The user's company name.</p><p>If not specified, it is set with the default company name.</p> |
| **firstName**     | Yes      | The user's first name                                                                            |
| **lastName**      | Yes      | The user's last name                                                                             |
| displayName       | No       | The user's display name                                                                          |
| **email**         | Yes      | The user's email address.  Must be unique.                                                       |
| title             | No       | The user's title                                                                                 |
| department        | No       | The user's department                                                                            |
| location          | No       | The user's location                                                                              |
| phoneNumber       | No       | The user's work phone number                                                                     |

Even if there are errors for some users, this endpoint will continue to create valid users. For this reason, two arrays are sent back in the response: the first one containing successfully added users (with their user ID), and the second one containing users with errors, that were not created; both lists can contain an error/info message for each user.

Multiple scenarios are then possible for each added user:

#### If the requested company and the user don’t exist, the API will:

* Create a company.
* Create the user and associate it to the company.
* Set the SSO based on the partner setting.
* Return the user ID and the company ID, in addition to the user information, to the partner.
* Send the welcome email to the user.

```json
HTTP 200
{
    "companyId": "17216",
    "companyName": "ACME Channel Connect",
    "success": [
        {
            "firstName": "James",
            "lastName": "Smith",
            "displayName": "James Smith",
            "department": "Product Engineering",
            "title": "Manager",
            "location": "New York",
            "userId": 15049565405646,
            "username": "james.smith@acme-company.com",
            "code": "USER_ADDED_NEW_COMPANY",
            "message": "User added successfully"
        }
    ],
    "errors": []
```

#### If the company already exists related to the user's email domain, and the user doesn’t exist, or the user account is deactivated:

* Create the user and associate it to the company.
* Set the SSO based on the partner setting.
* Return the user ID and the company ID, in addition to the user information, to the partner.
* Send the welcome email to the user.

```json
HTTP 200
{
    "companyId": "17216",
    "companyName": "ACME Channel Connect",
    "success": [
        {
            "firstName": "James",
            "lastName": "Smith",
            "displayName": "James Smith",
            "department": "Product Engineering",
            "title": "Manager",
            "location": "New York",
            "userId": 15049565405646,
            "username": "james.smith@acme-company.com",
            "code": "USER_ADDED_EXISTING_COMPANY",
            "message": "User added successfully"
        }
    ],
    "errors": []
}
```

#### If the company already exists for the email domain with a different name:

* Create the user and associate it to the company.
* Set the SSO based on the partner setting.
* Return the user ID and the company ID, in addition to the user information, to the partner.
* Send the welcome email to the user.

```json
HTTP 200
{
    "companyId": "17216",
    "companyName": "ACME Channel Connect",
    "success": [
        {
            "firstName": "James",
            "lastName": "Smith",
            "displayName": "James Smith",
            "department": "Product Engineering",
            "title": "Manager",
            "location": "New York",
            "userId": 15049565405646,
            "username": "james.smith@acme-company.com",
            "code": "USER_ADDED_TO_DIFFERENT_COMPANY_NAME",
            "message": "The user was added to a company named :<existing company name> because they share the same email domain"
        }
    ],
    "errors": []
}
```

#### If the company already exists, and the user is active:

```json
HTTP 200
{
    "success": []
    "errors": [
    	{
            "firstName": "James",
            "lastName": "Smith",
            "displayName": "James Smith",
            "department": "Product Engineering",
            "title": "Manager",
            "location": "New York",
            "username": "james.smith@acme-company.com",
            "code": "USER_ALREADY_EXISTS",
            "message": "The user already exists on this pod: <UserPodUrl>"
        }
    ]
}
```

{% hint style="info" %}
In the example above, the **companyId** and **companyName** are not returned like in the previous success messages. This is because the user had an error.

If multiple users are added in a single call, and at least one of them is successful, the **companyId** and **companyName** will be returned. See below the example of a response with multiple users added, two successfully, and one with an error.
{% endhint %}

#### If the email domain belongs to a company with their own Symphony instance:

```json
HTTP 200
{
    "success": []
    "errors": [
    	{
            "firstName": "James",
            "lastName": "Smith",
            "displayName": "James Smith",
            "department": "Product Engineering",
            "title": "Manager",
            "location": "New York",
            "username": "james.smith@acme-company.com",
            "code": "COMPANY_ALREADY_EXISTS_USER_NEEDS_ACCESS",
            "message": "The user belongs to an existing Symphony company but needs access. They should ask their Symphony administrator for access."
        }
    ]
}
```

#### If an invalid email is provided:

```json
HTTP 400
{
    "code": "INVALID_USER_EMAIL",
    "message": "Invalid user email : {{invalidEmail}}.",
    "context": {
        "invalidEmail": "user4@"
    }
}
```

#### If an unauthorized email domain is provided:

```json
HTTP 400
{
    "code": "PUBLIC_EMAIL_DOMAIN_NOT_ALLOWED",
    "message": "Public email domains are not allowed. Only business email domains will be accepted",
    "context": {
        "unallowedEmailDomains": "[gmail.com]"
    }
}
```

#### Different email domains among users:

```json
HTTP 400
{
    "code": "USERS_MUST_HAVE_THE_SAME_DOMAIN",
    "message": "Accounts not created. Users must have the same email domain."
}
```

#### Empty user list provided:

```json
HTTP 400
{
  "code" : "USER_LIST_IS_EMPTY"
  "message": "User list must contain at least one person"
}
```

#### The user list contains one or more duplicate email addresses:

```json
HTTP 400
{
  "code" : "USERS_CANNOT_HAVE_THE_SAME_EMAIL_ADDRESS"
  "message": "Each user must have a unique email address"
}
```

#### Malformed request (e.g. missing a mandatory field, such as companyName):

```json
HTTP 400
{
  "code" : "MISSING_REQUIRED_FIELD"
  "message": "The field '<fieldName>' is required"
  "context": {
    "fieldName": "<fieldName>"
  }
}
```

#### Example of response with multiple users added, two successfully, and one with an error:

```json
HTTP 200
{
    "companyId": "17216",
    "companyName": "ACME Channel Connect",
    "success": [
        {
            "firstName": "James",
            "lastName": "Smith",
            "displayName": "James Smith",
            "department": "Product Engineering",
            "title": "Manager",
            "location": "New York",
            "userId": 15049565405646,
            "username": "james.smith@acme-company.com",
            "code": "USER_ADDED_EXISTING_COMPANY",
            "message": "User added successfully"
        },
        {
            "firstName": "Maria",
            "lastName": "Garcia",
            "displayName": "Maria Garcia",
            "department": "Product Engineering",
            "title": "Manager",
            "location": "New York",
            "userId": 15049565405647,
            "username": "maria.garcia@acme-company.com",
            "code": "USER_ADDED_EXISTING_COMPANY",
            "message": "User added successfully"
        }
    ],
    "errors": [
        {
            "firstName": "Paul",
            "lastName": "Smith",
            "displayName": "Paul Smith",
            "department": "Product Engineering",
            "title": "Manager",
            "location": "New York",
            "username": "paul.smith@acme-company.com",
            "code": "USER_ALREADY_EXISTING_ON_THE_POD",
            "message": "The user already exists on the pod with podUrl: <UserPodUrl>"
        }
    ]
}
```

{% swagger src="../.gitbook/assets/api.yaml" path="/v1/channelco/user" method="post" %}
[api.yaml](../.gitbook/assets/api.yaml)
{% endswagger %}

### Add Role

Adds a role to a Channel Connect user’s account.

* Calling this endpoint requires the **community:accounts:onboard** scope.
* For now, only the **COMPLIANCE\_OFFICER** role is supported.
* Once the **COMPLIANCE\_OFFICER** role is granted, the Channel Connect user is added as a member in the Content Export room in Symphony. Daily exports are published in this room by the Content Export Bot. Users can also request on-demand exports.

{% swagger src="../.gitbook/assets/api.yaml" path="/v1/channelco/company/{companyId}/user/{userId}/roles/add" method="post" %}
[api.yaml](../.gitbook/assets/api.yaml)
{% endswagger %}

Possible responses:

#### Success:

```json
HTTP 200
{
  "code" : "ROLE_ADDED"
  "message" : "Role added"
}
```

#### The user doesn’t exist:

```json
HTTP 404
{
  "code" : "USER_NOT_FOUND"
  "message" : "No profile found"
}
```

#### The user belongs to the provided company:

```json
HTTP 400
{
  "code" : "USER_DOES_NOT_BELONG_TO_COMPANY"
  "message" : "Profile not updated. Changes to this Symphony profile require the user to contact their Symphony administrator."
}
```

#### The user account was not created by the requesting party:

```json
HTTP 400
{
  "code" : "PARTNER_NOT_ALLOWED_TO_ACCESS_USER"
  "message" : "Profile not updated. Changes can only be made by the administrator that created this user profile."
}
```

### Update a Channel Connect user

A Channel Connect partner can use this endpoint to update the user profile, in order to keep it up-to-date.

* As an input, the partner should provide the **user ID** and the **ID of the company** the user belongs to.
* Calling this endpoint requires the **community:accounts:onboard** scope.
* At least one of the following fields should be supplied for updating: the user's **firstName**, **lastName** and **email**.

#### Request attributes description

| Request attribute | Required | Possible values                           |
| ----------------- | -------- | ----------------------------------------- |
| **firstName**     | Yes      | The user's first name.                    |
| **lastName**      | Yes      | The user's first name.                    |
| **email**         | Yes      | The user's email address. Must be unique. |
| displayName       | No       | The user's display name.                  |
| title             | No       | The user's title.                         |
| department        | No       | The user's department.                    |
| location          | No       | The user's location                       |
| phoneNumber       | No       | The user's work phone number.             |

* Here is the full list of possible inputs in addition to the ones above:
  * display name
  * title
  * department
  * location
  * phone number

{% hint style="info" %}
Whatever fields are supplied will be updated, and the remaining fields will be left as they were.
{% endhint %}

* Regarding the response, multiple scenarios are possible:

#### In case of a successful update:

```json
HTTP 200
{
        "email": "mr.james.smith@acme-company.com",
        "firstName": "James",
        "lastName": "Smith",
        "displayName": "Paul Smith",
        "phoneNumber": "33612345678",
        "department": "Product Engineering",
        "title": "Manager",
        "location": "New York",
        "userId": 15049565405654,
        "username": "mr.james.smith@acme-company.com"
}
```

#### If the required fields are not provided:

```json
HTTP 400
{
  "code" : "MISSING_REQUIRED_FIELDS"
  "message": "Profile not updated. At least one of the following is required: First name, Last name, or Email."
}
```

#### If the user doesn’t exist or the user ID is invalid:

```json
HTTP 400
{
  "code" : "USER_NOT_FOUND"
  "message": "No profile found"
}
```

#### If the partner tries to update an existing user with a domain that doesn't match the user's company domains:

```json
HTTP 400
{
  "code" : "USER_EMAIL_DOMAIN_DIFFERENT_FROM_COMPANY"
  "message": "Profile not updated. Email domain must match any of these domains: '{{companyDomains}}'."
}
```

#### **If the requested partner isn't the one who created the requested user:**

```json
HTTP 400
{
  "code" : "PROFILE_ACCESS_OR_UPDATES_NOT_AUTHORIZED"
  "message": "User profile can only be accessed or updated by the administrator that created it"
}
```

#### If the partner requests to update the user, but provides an email that is already in use by another user:

```json
HTTP 400
{
  "code" : "REQUESTED_EMAIL_ALREADY_IN_USE"
  "message": "Profile not updated. A user with that email already exists."
}
```

{% swagger src="../.gitbook/assets/api.yaml" path="/v1/channelco/company/{companyId}/user/{userId}" method="put" %}
[api.yaml](../.gitbook/assets/api.yaml)
{% endswagger %}

### Disable a Channel Connect user

The aim of this API is to give the Channel Connect partner the ability to disable a user from a client's tenant.

* As an input, the partner should provide the **user ID** and the **ID of the company** the user belongs to.
* Calling this endpoint requires the **community:accounts:onboard** scope.
* Regarding the response, multiple scenarios are possible:

#### If the user is already deactivated or doesn't exist:

```json
HTTP 400
{
  "code" : "USER_NOT_FOUND"
  "message": "No profile found"
}
```

#### **If the user account was not created by the requestor partner, or the user belongs to a non-Channel Connect company:**

```json
HTTP 400
{
  "code" : "PARTNER_NOT_ALLOWED_TO_ACCESS_USER"
  "message": "User can be read or updated only by the administrator that created it"
}
```

#### If the user has been successfully deactivated <mark style="color:orange;">\*\*\*\*</mark>

```json
HTTP 204
```

{% swagger src="../.gitbook/assets/api.yaml" path="/v1/channelco/company/{companyId}/user/{userId}" method="delete" %}
[api.yaml](../.gitbook/assets/api.yaml)
{% endswagger %}

### Search Channel Connect user by email

The aim of this API is to retrieve the details of a Symphony user by providing their email.

* As an input, the partner should provide the **user email**.
* Calling this endpoint requires the **community:accounts:onboard** scope.
* Regarding the response, multiple scenarios are possible:

#### If an invalid email is provided:

```json
HTTP 400
{
  "code" : "INVALID_USER_EMAIL"
  "message": "Invalid user email: {{invalidEmail}}."
}
```

#### If an unauthorized email domain is provided:

```json
HTTP 400
{
  "code" : "EMAIL_DOMAIN_NOT_ALLOWED"
  "message": "Only corporate email domains are allowed."
```

#### If the user doesn't exist or if disabled:

```json
HTTP 400
{
  "code" : "USER_NOT_FOUND"
  "message": "No profile found"
}
```

#### **If the requestor partner didn't create the user, the following error and message will be returned to the partner:**

```json
HTTP 400
{
  "code" : "PROFILE_ACCESS_OR_UPDATES_NOT_AUTHORIZED"
  "message": "User profile can only be accessed or updated by the administrator that created it"
}
```

#### If the user and their associated company are correctly retrieved:

```json
HTTP 200
{
    "email": "james.smith@acme-company.com",
    "firstName": "James",
    "lastName": "Smith",
    "displayName": "Paul Smith",
    "phoneNumber": "33612345678",
    "department": "Product Engineering",
    "title": "Manager",
    "location": "New York",
    "userId": 15049565405654,
    "username": "james.smith@acme-company.com",
    "companyId": "17217",
    "companyName": "ACME Channel Connect"
}
```

{% swagger src="../.gitbook/assets/api.yaml" path="/v1/channelco/user" method="get" %}
[api.yaml](../.gitbook/assets/api.yaml)
{% endswagger %}

### Get Channel Connect user by companyId and userId

The aim of this API is to retrieve the details of a Symphony user by providing their **user ID** and the **ID of the company** the user belongs to.

* As an input, the partner should provide the **userId** and the **companyId**.
* Calling this endpoint requires the **community:accounts:onboard** scope.
* Regarding the response, multiple scenarios are possible:

#### If the user doesn't exist or disabled:

```json
HTTP 400
{
  "code" : "USER_NOT_FOUND"
  "message": "No profile found"
}
```

#### If the requestor partner didn't create the user:

```json
HTTP 400
{
  "code" : "PROFILE_ACCESS_OR_UPDATES_NOT_AUTHORIZED"
  "message": "User profile can only be accessed or updated by the administrator that created it"
}
```

#### If the user and their associated company are correctly retrieved:

```json
HTTP 200
{
    "email": "james.smith@acme-company.com",
    "firstName": "James",
    "lastName": "Smith",
    "displayName": "Paul Smith",
    "phoneNumber": "33612345678",
    "department": "Product Engineering",
    "title": "Manager",
    "location": "New York",
    "userId": 15049565405654,
    "username": "james.smith@acme-company.com",
    "companyId": "17217",
    "companyName": "ACME Channel Connect"
}
```

{% swagger src="../.gitbook/assets/api.yaml" path="/v1/channelco/company/{companyId}/user/{userId}" method="get" %}
[api.yaml](../.gitbook/assets/api.yaml)
{% endswagger %}
