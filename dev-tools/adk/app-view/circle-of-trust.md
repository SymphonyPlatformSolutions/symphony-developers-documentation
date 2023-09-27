# Add BDK to an Extension App for Circle of Trust

## Prerequisites

Complete the previous guide on building an extension app with app views

{% content-ref url="./" %}
[.](./)
{% endcontent-ref %}

Complete the first part of this guide with the assistance of your pod administrator, ensuring that your app has the **Primary User Identity** and **Trust application** permissions.

{% content-ref url="../../../ext-apps/getting-started/add-app-entry.md" %}
[add-app-entry.md](../../../ext-apps/getting-started/add-app-entry.md)
{% endcontent-ref %}

{% hint style="info" %}
This guide will use a shared extension app entry that is available for everyone to use on the [developer sandbox](https://develop2.symphony.com). The app id is `localhost-4000` and the RSA private key can be downloaded from [this location](https://localhost-rsa.vercel.app/private.pem). This entry expects that the app is hosted on `https://localhost:4000` with the entrypoint `controller.html` at the root.
{% endhint %}

## User Identity

In order to obtain identity information of the current user, an extension app needs to perform an authentication call and validation loop as part of the [Circle of Trust process](../../../ext-apps/app-authentication/circle-of-trust-authentication.md). This requires a backend service to call [Symphony REST APIs](https://developers.symphony.com/restapi/reference/application-rsa-authentication) so as to secure the required private key. You can choose to manually create your own REST API client and link the endpoint contracts to the ADK configuration, but this guide will demonstrate how to use BDK to ease the process.

## Create BDK Project

```bash
$ yo @finos/symphony
 __   __     ___                 _
 \ \ / /__  / __|_  _ _ __  _ __| |_  ___ _ _ _  _
  \ V / _ \ \__ \ || | '  \| '_ \ ' \/ _ \ ' \ || |
   |_|\___/ |___/\_, |_|_|_| .__/_||_\___/_||_\_, |
                 |__/      |_|                |__/
        https://developers.symphony.com

Welcome to Symphony Generator v2.8.0
Project files will be generated in folder: /home/user/code/bdk-ext-app
______________________________________________________________________________________________________
? Enter your pod host develop2.symphony.com
? Enter your bot username my-bot
? Select your project type Extension App (BDK)
? Select your programing language Java
? Enter your app id localhost-4000
? Select your build system Maven
? Enter your project artifactId bot-application
? Enter your base package com.mycompany.bot
```

## Configuration

As we won't be using the bot components, we can remove configuration relating to bots. We will also remove the TLS configuration as we will use ADK to host the frontend app instead. We also need to expand the CORS configuration as our frontend will make a cross-origin call to this backend in development mode (modify as appropriately for production).

{% code title="src/main/resources/application.yaml" lineNumbers="true" %}
```yaml
bdk:
  host: develop2.symphony.com
  app:
    appId: localhost-4000
    privateKey:
      path: rsa/privatekey.pem

bdk-app:
  auth:
    enabled: true
  cors:
    "[/**]":
      allowed-origins: "*"
      allowed-headers: "*"
      allowed-credentials: false
      allowed-methods: [ "POST", "GET" ]
```
{% endcode %}

If you are using your own extension app id and key, change the values as appropriate. If you are using the developer sandbox, download [this key](https://localhost-rsa.vercel.app/private.pem) into `rsa/privatekey.pem`.

## Start Backend

Either launch the BDK project from your IDE or use the respective maven or gradle command:

```bash
# Maven
./mvnw spring-boot:run

# Gradle
./gradlew bootRun
```

## Build ADK App

Modify the `index.js` or `index.ts` file from the earlier ADK project to be as follows:

{% code title="index.ts" lineNumbers="true" %}
```typescript
import * as ADK from '@symphony-ui/adk';

const backendUri = 'http://localhost:8080/bdk/v1/app';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const getAppToken = () => fetch(`${backendUri}/auth`, { method: 'POST' })
  .then(r => r.json())
  .then(r => r.appToken);

const validateAppToken = (appToken: string, symphonyToken: string) =>
  fetch(`${backendUri}/tokens`, { method: 'POST', body: JSON.stringify({ appToken, symphonyToken }), headers })
    .then(r => null);

const validateJwt = (jwt: string) =>
  fetch(`${backendUri}/jwt`, { method: 'POST', body: JSON.stringify({ jwt }), headers })
    .then(r => r.json());

const config : ADK.SymphonyAppDescriptor = {
  id: 'localhost-4000',
  circleOfTrust: { getAppToken, validateAppToken, validateJwt },
};

ADK.start(config).then(() => {
  ADK.navigation.add('My App', () => ADK.modules.open('view-a', { title: 'Hello' }));
});
```
{% endcode %}

Note that we previously only supplied `id` to the `ADK.start` call but we now supply an additioinal `circleOfTrust` object in that configuration. This object has 3 properties that each return a promise.

* `getAppToken`: calls the backend to perform app authentication and retrieve the token
* `validateAppToken`: calls the backend to perform token validation
* `validateJwt`: calls the backend to perform JWT validation

ADK takes care of adherence to the [Circle of Trust process](../../../ext-apps/app-authentication/circle-of-trust-authentication.md) so you only need to define these contracts to allow ADK to perform the required backend calls.

Now that the app is authenticated, we can fetch user identity from either the controller or views. Let's edit the existing view to be as follows:

{% code title="views/view-a.tsx" lineNumbers="true" %}
```typescript
import * as React from 'react';
import * as ADKReact from '@symphony-ui/adk-react';
import * as ADK from '@symphony-ui/adk';
import { useEffect, useState } from 'react';
import './view-a.css';

const ViewA = () => {
  const [ user, setUser ] = useState<ADK.UserJwt>();

  useEffect(() => {
    ADK.user.getUserInfo().then(response => setUser(response));
  }, []);

  return (
    <div className="main-view">
      <main>
        { user && (
          <div>
            <strong>User</strong>: {user.displayName} ({user.emailAddress})
          </div>
        )}
      </main>
    </div>
  );
};

ADKReact.createView(<ViewA />, { id: 'localhost-4000' });
```
{% endcode %}

## Start the App

We can now start the app using:

```bash
npm start
```

## Load the App in Symphony

Instead of performing bundle injection as before, load Symphony normally now. Once Symphony is loaded, open the Marketplace using the left rail. Locate your App and install it. If you are using the developer sandbox, the app's name is **Localhost 4000**.

## Test the App

Once the app is installed, you should notice a new app appears in the Apps section labelled as **My App**. If you launch the app, it opens a module showing the view, which contains your display name and email.
