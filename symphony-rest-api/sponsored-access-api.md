# Sponsored Access API

## What is Sponsored Access?

Symphony Sponsored Access allows Symphony partners to enable the users of their applications to collaborate on Symphony Messaging, by adding those companies and users to the Symphony network.

Users can leverage the Symphony Messaging Embedded Mode in order to chat from within the partner application.

Partners can use the Sponsored Access APIs to create accounts on Symphony Messaging for their application users, if they do not already belong to the Symphony network.

If a user’s company is not yet available on Symphony Messaging, a dedicated Symphony Messaging tenant can be created for that company before onboarding its users.

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Before they can use Sponsored Access APIs to add client companies, as well as add or disable users, partners must register with Symphony.  Following registration, partners receive credentials to authenticate to these APIs.

If they want to offer a seamless login experience to Symphony Messaging, partners need to provide Symphony with their Identity Provider details. The recommended authentication method is SAML, although other authentication methods are also available (additional charges apply).

If you would like to register as a Symphony partner, create new users and embed Symphony Messaging within your application, please [contact us](https://symphony.com/solutions/embedded-collaboration-platform/).

## Domains

In order to target the different APIs described below, the user should use the correct domain, depending on their environment:

* PROD: [**https://community.symphony.com/api**](https://community.symphony.com/api)
* UAT: [**https://community.uat.symphony.com/api**](https://community.uat.symphony.com/api)

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

You can now use the `access_token`to make authorized calls to the API. You should pass it as a Bearer token in the Authorization header.

### Create company

A Sponsored Access partner can use this endpoint to sponsor a new company in Symphony.

As input, the partner must provide:

* A _**name**_: The company name that will be visible in the user’s profile in the Directory and can be used during user search.
* A _**vanityName**_: This will be used to construct the tenant **publicUrl** under which the user Symphony Messaging session will be launched. For example, if the vanity name is “coke”, the URL will be _https://coke.on.symphony.com_.
* _**emailDomains**_: The list of email domains used by the users in that company. Only users with email addresses belonging to those domains can be added later on. To update the domain list, please contact your Symphony representative.

REST call to create a company:

```json
curl -X 'POST' \
  'https://community.symphony.com/api/v2/companies' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access_token}' \
  -d '{
  "name": "Lyondell",
  "vanityName": "lyondell",
  "emailDomains": [
    "lyondell.com"
  ]
}'
```

Response you should get:

```json
{
  "id": "e176c55e-6e49-4819-b982-12e0535db5f0",
  "createdAt": "2023-12-22T08:53:39.269539Z",
  "updatedAt": "2023-12-20T10:59:54.516494Z",
  "name": "Lyondell",
  "vanityName": "lyondell",
  "emailDomains": [
    "lyondell.com"
  ],
  "publicUrl": "https://lyondell.on.symphony.com",
  "state": "STARTED"
}
```

<mark style="color:green;">**Success**</mark>

If successful, a dedicated Symphony Messaging tenant will be created for that company and will become accessible under the tenant _**publicUrl**_ derived from the _vanityName_ field.

If a user leverages the Symphony Messaging channels (Web, Desktop, Mobile), they will need to log in by accessing the tenant _publicURL_ directly in the browser, desktop or mobile application.

If a user leverages Embedded Mode, the partner needs to load Embedded Mode using that tenant _publicUrl_.

<mark style="color:red;">**Failure**</mark>

Company creation will fail in the following cases:

* There is already a company in the Directory with users having email addresses with domains belonging to the provided list of email domains.
* There is already a company in the Directory with the same _company name_.
* There is already a company in the Directory with the same _vanityName_.
* If the conflicting company has been onboarded by the same partner and the list of email domains is different, an error will be thrown. In that case, the partner needs to amend the list of email domains for the company before adding users.

In case of failures, to verify whether the users of that company already have a Symphony Messaging account or not, you can call the following endpoint: [https://loginservice.symphony.com/webcontroller/podLoginInformation?emailAddress=\{%email%\}\&fs=advanced](https://loginservice.symphony.com/webcontroller/podLoginInformation?emailAddress=\{%email%\}\&fs=advanced)

\*where \{%email%\} needs to be replaced by the user’s email address.

If users do not have an account, you are encouraged to reach out to <mark style="color:blue;">onboarding@symphony.com</mark> or to your Symphony representative so they can help you onboard the users.

{% openapi src="../.gitbook/assets/Connect_API.yaml" path="/api/v2/companies" method="post" %}
[Connect_API.yaml](../.gitbook/assets/Connect_API.yaml)
{% endopenapi %}

### Create users

A Sponsored Access partner can use this endpoint to provision new users in Symphony Messaging under an existing sponsored company.

As input, the partner must provide:

* A _**companyId**_ (as a query parameter of the request): The _companyId_ can be obtained by calling the _Retrieve companies_ API.
* An array of **user information** (in the body of the request). It is recommended to provide a maximum of information in order to facilitate user search in the Directory.

REST call to create users:

```json
curl -X 'POST' \
  'https://community.symphony.com/api/v2/companies/e176c55e-6e49-4819-b982-12e0535db5f0/users' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access_token}' \
  -d '[
  {
    "email": "john.smith@symphony.com",
    "firstName": "John",
    "lastName": "Smith",
    "displayName": "John Smith",
    "active": false,
    "phoneNumber": "true",
    "department": "Order Processing",
    "title": "Mr.",
    "location": "Sophia Antipolis"
  }
]'
```

Response you should get:

```json
[
  {
    "id": "e176c55e-6e49-4819-b982-12e0535db5f0",
    "createdAt": "2023-12-22T08:53:39.269539Z",
    "updatedAt": "2023-12-20T10:59:54.516494Z",
    "symphonyUserId": 695234946138125,
    "email": "john.smith@symphony.com",
    "firstName": "John",
    "lastName": "Smith",
    "displayName": "John Smith",
    "active": true,
    "phoneNumber": "+33 1 09 75 83 51",
    "department": "Order Processing",
    "title": "Mr.",
    "location": "Sophia Antipolis",
    "status": 201
  }
]
```

{% openapi src="../.gitbook/assets/Connect_API.yaml" path="/api/v2/companies/{companyId}/users" method="post" %}
[Connect_API.yaml](../.gitbook/assets/Connect_API.yaml)
{% endopenapi %}

### Update user status

A Sponsored Access partner can use this endpoint to disable or re-enable a user.

As input, the partner must provide:

* A **companyId** (as a query parameter of the request): The _companyId_ can be obtained by calling the _Retrieve companies_ API.
* A **userId** (as a query parameter of the request): The _userId_ can be obtained by calling the _Get company users_ API.
* A user **active** status indicator (in the body of request).

Once disabled, the user is no longer associated with the partner, and can no longer log in to Symphony. The user’s chats, however, are kept in order to meet any compliance requirements.

REST call to disable a user:

```json
curl -X 'PATCH' \
  'https://community.symphony.com/api/v2/companies/e176c55e-6e49-4819-b982-12e0535db5f0/users/5bec2e8b-da45-46c7-9370-5669de1b1a78' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access_token}' \
  -d '{
  "active": false
}'
```

{% openapi src="../.gitbook/assets/Connect_API.yaml" path="/api/v2/companies/{companyId}/users/{userId}" method="patch" %}
[Connect_API.yaml](../.gitbook/assets/Connect_API.yaml)
{% endopenapi %}

### Search companies

A Sponsored Access partner can use this endpoint to retrieve the list of companies it has sponsored.

```json
curl -X 'GET' \
  'https://community.symphony.com/api/v2/companies' \
  -H 'accept: application/json'
  -H 'Authorization: Bearer {access_token}' 
```

Response you should get:

```json
[
  {
    "id": "e176c55e-6e49-4819-b982-12e0535db5f0",
    "createdAt": "2023-12-22T08:53:39.269539Z",
    "updatedAt": "2023-12-20T10:59:54.516494Z",
    "name": "Lyondell",
    "vanityName": "lyondell",
    "emailDomains": [
      "lyondell.com"
    ],
    "publicUrl": "https://lyondell.on.symphony.com",
    "state": "COMPLETED"
  }
]
```

{% openapi src="../.gitbook/assets/Connect_API.yaml" path="/api/v2/companies" method="get" %}
[Connect_API.yaml](../.gitbook/assets/Connect_API.yaml)
{% endopenapi %}

### Retrieve company

A Sponsored Access partner can use this endpoint to retrieve a sponsored company’s information.

As input, the partner must provide:

* A _**companyId**_ (as a query parameter of the request): The _companyId_ can be obtained by calling the _Retrieve companies_ API.

```json
curl -X 'GET' \
  'https://community.symphony.com/api/v2/companies/e176c55e-6e49-4819-b982-12e0535db5f0' \
  -H 'accept: application/json'
  -H 'Authorization: Bearer {access_token}'
```

Response you should get:

```json
{
  "id": "e176c55e-6e49-4819-b982-12e0535db5f0",
  "createdAt": "2023-12-22T08:53:39.269539Z",
  "updatedAt": "2023-12-20T10:59:54.516494Z",
  "name": "Lyondell",
  "vanityName": "lyondell",
  "emailDomains": [
    "lyondell.com"
  ],
  "publicUrl": "https://lyondell.on.symphony.com",
  "state": "COMPLETED"
}
```

{% openapi src="../.gitbook/assets/Connect_API.yaml" path="/api/v2/companies/{companyId}" method="get" %}
[Connect_API.yaml](../.gitbook/assets/Connect_API.yaml)
{% endopenapi %}

### Update company

A Sponsored Access partner can use this endpoint to add new email domains to an existing company.

```json
curl -X 'PATCH' \
  'https://community.symphony.com/api/v2/companies/e176c55e-6e49-4819-b982-12e0535db5f0' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access_token}'
  -d '{
  "emailDomains": [
    "lyondell.com"
  ]
}'
```

<mark style="color:green;">**Success**</mark>

In response you should get code HTTP 200.

<mark style="color:red;">**Failure**</mark>

When there already is a company in the Directory with users who have email addresses with domains belonging to the provided list of email domains.

{% openapi src="../.gitbook/assets/Connect_API.yaml" path="/api/v2/companies/{companyId}" method="patch" %}
[Connect_API.yaml](../.gitbook/assets/Connect_API.yaml)
{% endopenapi %}

### Retrieve company users

A Sponsored Access partner can use this endpoint to retrieve the list of users of a company it has sponsored.

As input, the partner must provide:

* A _**companyId**_ (as a query parameter of the request): The _companyId_ can be obtained by calling the _Retrieve companies_ API.

The users are returned in paging mode. If the company has large number of users, multiple API calls need to be made to retrieve the full list of users. To retrieve the users on different pages, the partner must provide:

* A _**currentPage**_ (as a query parameter of the request): This is the page number. To see the total number of pages, partners can make a REST call such as the one below.
* A _**pageSize**_ (as a query parameter of the request): To specify how many users to be displayed on the page.

REST call to retrieve the list of users:

```json
curl -X 'GET' \
  'https://community.symphony.com/api/v2/companies/e176c55e-6e49-4819-b982-12e0535db5f0/users' \
  -H 'accept: application/json'
  -H 'Authorization: Bearer {access_token}'
```

In response, you should get the paging information (total number of users, current page and page size), and a list of users as below:

```json
{
  "total": 150,
  "pageSize": 100,
  "currentPage": 1,
  "users": [
    {
      "id": "e176c55e-6e49-4819-b982-12e0535db5f0",
      "createdAt": "2023-12-22T08:53:39.269539Z",
      "updatedAt": "2023-12-20T10:59:54.516494Z",
      "symphonyUserId": 691867691778058,
      "email": "john.smith@symphony.com",
      "firstName": "John",
      "lastName": "Smith",
      "displayName": "John Smith",
      "phoneNumber": "+33 1 09 75 83 51",
      "department": "Order Processing",
      "title": "Mr.",
      "location": "Sophia Antipolis"
    },
    ...
  ]
}
```

{% openapi src="../.gitbook/assets/Connect_API.yaml" path="/api/v2/companies/{companyId}/users" method="get" %}
[Connect_API.yaml](../.gitbook/assets/Connect_API.yaml)
{% endopenapi %}

### Retrieve user <a href="#get-user" id="get-user"></a>

A Sponsored Access partner can use this endpoint to retrieve the detail of a single user of a company it has sponsored.

As input, the partner must provide:

* A _**companyId**_ (as a query parameter of the request): The _companyId_ can be obtained by calling the _Retrieve companies_ API.
* A _**userId**_ (as a query parameter of the request): The _userId_ can be obtained by calling the _Get company users_ API.

```json
curl -X 'GET' \
  'https://community.symphony.com/api/v2/companies/e176c55e-6e49-4819-b982-12e0535db5f0/users/5bec2e8b-da45-46c7-9370-5669de1b1a78' \
  -H 'accept: application/json'
  -H 'Authorization: Bearer {access_token}'
```

In response you should get:

```json
{
  "id": "e176c55e-6e49-4819-b982-12e0535db5f0",
  "createdAt": "2023-12-22T08:53:39.269539Z",
  "updatedAt": "2023-12-20T10:59:54.516494Z",
  "symphonyUserId": 695234946138125,
  "email": "john.smith@symphony.com",
  "firstName": "John",
  "lastName": "Smith",
  "displayName": "John Smith",
  "active": true,
  "phoneNumber": "+33 1 09 75 83 51",
  "department": "Order Processing",
  "title": "Mr.",
  "location": "Sophia Antipolis",
  "status": 201
}
```

{% openapi src="../.gitbook/assets/Connect_API.yaml" path="/api/v2/companies/{companyId}/users/{userId}" method="get" %}
[Connect_API.yaml](../.gitbook/assets/Connect_API.yaml)
{% endopenapi %}
