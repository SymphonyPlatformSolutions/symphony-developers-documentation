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
import * as ADK from '@symphony-ui/adk';

ADK.start({ id: 'adk-example' }).then(() => {
  ADK.navigation.add('ADK View A', () => {
    ADK.modules.open('view-a', { title: 'ADK View A' });
  });
  
  ADK.buttons.add('Click Me', 'hashtag', (payload) => {
    console.log(`You clicked on ${target}`, payload);
    // Perform actions
  });
});

```
{% endcode %}

## Option 1: Use query parameters to pass context

In this option, we serialize the contents of the context payload and pass it directly into the `ADK.modules.open` call as query parameters.

{% code title="src/index.js" lineNumbers="true" %}
```typescript
import * as ADK from '@symphony-ui/adk';

ADK.start({ id: 'adk-example' }).then(() => {
  ADK.navigation.add('ADK View A', () => {
    ADK.modules.open('view-a', { title: 'ADK View A' });
  });

  ADK.buttons.add('Click Me', 'hashtag', (payload) => {
    console.log(`You clicked on ${target}`, payload);
    const params = '?context=' + encodeURIComponent(JSON.stringify(payload));
    ADK.modules.open('view-a' + params, { title: 'ADK View A' });
  });
});
```
{% endcode %}

Once the view is opened, you can retrieve the query parameters and deserialize it.

{% code title="src/views/view-a.js" %}
```jsx
import * as React from 'react';
import * as ADKReact from '@symphony-ui/adk-react';
import { Badge, Icon } from '@symphony-ui/uitoolkit-components';
import { useClientTheme, useUserReferenceId } from '@symphony-ui/adk-react';
import { useEffect, useState } from 'react';
import './view-a.css';

const ViewA = () => {
  const { name: theme, layout } = useClientTheme();
  const userId = useUserReferenceId();
  const [ context, setContext ] = useState();

  useEffect(() => {
    const contextString = new URLSearchParams(window.location.search).get('context');
    if (contextString) {
      setContext(JSON.parse(decodeURIComponent(contextString)));
    }
  }, []);

  return (
    <div className="main-view">
      <header>
        <h1>
          <Icon iconName="market-place" className="header-icon" />
          Welcome to ADK View A!
        </h1>
      </header>
      <main>
        <hr className='tk-my-2' />
        <h3>Meta Information</h3>
        { context && (
          <div>
            <strong>Context</strong>: {context.entity.name}
          </div>
        )}
        <div>
          <strong>Theme</strong>: current theme is <Badge variant='positive'>{theme}</Badge> and <Badge variant='positive'>{layout}</Badge>
        </div>
        <div>
          <strong>User Reference Id</strong>: <Badge variant='positive'>{userId}</Badge>
        </div>
        <hr className='tk-my-2' />
      </main>
    </div>
  );
};

ADKReact.createView(<ViewA />, { id: 'adk-example' });
```
{% endcode %}

## Option 2: Expose Method on Controller

In this option, we store the state of context on the controller, then expose a method to retrieve that state.

{% code title="src/index.js" lineNumbers="true" %}
```typescript
import * as ADK from '@symphony-ui/adk';

ADK.start({ id: 'adk-example' }).then(() => {
  ADK.navigation.add('ADK View A', () => {
    ADK.modules.open('view-a', { title: 'ADK View A' });
  });

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

Once the view is opened, you can make a call to the exposed `getContext` method via the `useRemoteExecutor` hook, which returns a promise.

{% code title="src/views/view-a.js" %}
```jsx
import * as React from 'react';
import * as ADKReact from '@symphony-ui/adk-react';
import { Badge, Icon } from '@symphony-ui/uitoolkit-components';
import { useRemoteExecutor, useClientTheme, useUserReferenceId } from '@symphony-ui/adk-react';
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
      <header>
        <h1>
          <Icon iconName="market-place" className="header-icon" />
          Welcome to ADK View A!
        </h1>
      </header>
      <main>
        <hr className='tk-my-2' />
        <h3>Meta Information</h3>
        { context && (
          <div>
            <strong>Context</strong>: {context.entity.name}
          </div>
        ) }
        <div>
          <strong>Theme</strong>: current theme is <Badge variant='positive'>{theme}</Badge> and <Badge variant='positive'>{layout}</Badge>
        </div>
        <div>
          <strong>User Reference Id</strong>: <Badge variant='positive'>{userId}</Badge>
        </div>
        <hr className='tk-my-2' />
      </main>
    </div>
  );
};

ADKReact.createView(<ViewA />, { id: 'adk-example' });

```
{% endcode %}
