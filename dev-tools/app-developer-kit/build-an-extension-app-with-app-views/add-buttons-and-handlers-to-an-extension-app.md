# Add Buttons + Handlers to an Extension App

## Prerequisites

Complete the previous guide on building an extension app with app views

{% content-ref url="./" %}
[.](./)
{% endcontent-ref %}

## Add Buttons and Handler

Let's now add a button to the hashtag hover card and a handler to link the context. Use `ADK.buttons.add` to add a new button to the `hashtag` zone. To pass the context payload from the controller to the view, there are two options: either using query parameters or using ADK to invoke an exposed controller method from a view.

{% code title="src/index.js" lineNumbers="true" %}
```typescript
import * as ADK from "@symphony-ui/adk";

ADK.start({ id: "adk-example" }).then(() => {
  ADK.buttons.add("Click Me", "hashtag", (payload) => {
    console.log(`You clicked on a hashtag button`, payload);
    // Perform actions
  });
});
```
{% endcode %}

## Option 1: Use query parameters to pass context

In this option, we serialize the contents of the context payload and pass it directly into the `ADK.modules.open` call as query parameters.

{% code title="src/index.js" lineNumbers="true" %}
```typescript
import * as ADK from "@symphony-ui/adk";

ADK.start({ id: "adk-example" }).then(() => {
  ADK.buttons.add("Click Me", "hashtag", (payload) => {
    console.log(`You clicked on a hashtag button`, payload);
    const params = "?context=" + encodeURIComponent(JSON.stringify(payload));
    ADK.modules.open("view-a" + params, { title: "ADK View A" });
  });
});
```
{% endcode %}

Once the view is opened, you can retrieve the query parameters and deserialize it.

{% code title="src/views/view-a.jsx" lineNumbers="true" %}
```jsx
import * as React from 'react';
import * as ADKReact from '@symphony-ui/adk-react';
import { useEffect, useState } from 'react';
import './view-a.css';

const ViewA = () => {
  const [ context, setContext ] = useState();

  useEffect(() => {
    const contextString = new URLSearchParams(window.location.search).get('context');
    if (contextString) {
      setContext(JSON.parse(decodeURIComponent(contextString)));
    }
  }, []);

  return (
    <div className="main-view">
      <main>
        { context && (
          <div>
            <strong>Context</strong>: {context.entity.name}
          </div>
        )}
      </main>
    </div>
  );
};

ADKReact.createView(<ViewA />, { id: 'adk-example' });
```
{% endcode %}

## Option 2: Expose Method on Controller

In this option, we store the state of context on the controller, then expose a method to retrieve that state.

{% tabs %}
{% tab title="JavaScript" %}
{% code title="src/index.js" lineNumbers="true" %}
```typescript
import * as ADK from '@symphony-ui/adk';

ADK.start({ id: 'adk-example' }).then(() => {
  let context;
  ADK.expose({
    getContext: () => context,
  });

  ADK.buttons.add('Click Me', 'hashtag', (payload) => {
    console.log(`You clicked on a hashtag`, payload);
    context = payload;
    ADK.modules.open('view-a', { title: 'ADK View A' });
  });
});
```
{% endcode %}
{% endtab %}

{% tab title="TypeScript" %}
{% code title="src/index.ts" lineNumbers="true" %}
```typescript
import * as ADK from '@symphony-ui/adk';

type ControllerApi = {
  getContext: () => unknown,
};

ADK.start({ id: 'adk-example' }).then(() => {
  let context;
  ADK.expose<ControllerApi>({
    getContext: () => context,
  });

  ADK.buttons.add('Click Me', 'hashtag', (payload) => {
    console.log(`You clicked on a hashtag`, payload);
    context = payload;
    ADK.modules.open('view-a', { title: 'ADK View A' });
  });
});
```
{% endcode %}
{% endtab %}
{% endtabs %}

Once the view is opened, you can make a call to the exposed `getContext` method via the `useRemoteExecutor` hook, which returns a promise.

{% tabs %}
{% tab title="JavaScript" %}
{% code title="src/views/view-a.jsx" lineNumbers="true" %}
```jsx
import * as React from 'react';
import * as ADKReact from '@symphony-ui/adk-react';
import { useRemoteExecutor } from '@symphony-ui/adk-react';
import { useEffect, useState } from 'react';
import './view-a.css';

const ViewA = () => {
  const { name: theme, layout } = useClientTheme();
  const userId = useUserReferenceId();
  const [ context, setContext ] = useState();
  const remoteExecutor = useRemoteExecutor();

  useEffect(() => {
    remoteExecutor.getContext().then((result) => setContext(result));
  }, []);

  return (
    <div className="main-view">
      <main>
        { context && (
          <div>
            <strong>Context</strong>: {context.entity.name}
          </div>
        )}
      </main>
    </div>
  );
};

ADKReact.createView(<ViewA />, { id: 'adk-example' });
```
{% endcode %}
{% endtab %}

{% tab title="TypeScript" %}
{% code title="src/views/view-a.tsx" lineNumbers="true" %}
```typescript
import * as React from 'react';
import * as ADKReact from '@symphony-ui/adk-react';
import { useRemoteExecutor } from '@symphony-ui/adk-react';
import { useEffect, useState } from 'react';
import './view-a.css';

type ControllerApi = {
  getContext: () => Promise<unknown>,
};

const ViewA = () => {
  const [ context, setContext ] = useState();
  const remoteExecutor = useRemoteExecutor<ControllerApi>();

  useEffect(() => {
    remoteExecutor.getContext().then((result) => setContext(result));
  }, []);

  return (
    <div className="main-view">
      <main>
        { context && (
          <div>
            <strong>Context</strong>: {context.entity.name}
          </div>
        )}
      </main>
    </div>
  );
};

ADKReact.createView(<ViewA />, { id: 'adk-example' });
```
{% endcode %}
{% endtab %}
{% endtabs %}
