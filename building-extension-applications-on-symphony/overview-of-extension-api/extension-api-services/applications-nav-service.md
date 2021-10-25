# Applications-Nav Service

The Applications navigation section is found at the bottom of the left-hand sidebar of the Symphony client workspace. Use the `applications-nav` service to create a navigation item for your application:

```javascript
// To use the applications-nav service, you must subscribe to it from your application
var navService = SYMPHONY.services.subscribe("applications-nav");
```

The following methods are available on the `applications-nav` service:

* add
* remove
* count
* rename
* focus

## add()

Add a new navigation item to the Applications section of the left-hand sidebar:

```javascript
function add(id, title, serviceName)
```

| Parameter                                 | Type             | Description                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                        | String           | A unique id for this navigation item (must be unique across all navigation items of a given application)                                                                                                                                                                                                               |
| **Either** `title` **or** `{title, icon}` | String or Object | **Either** the title of the left navigation item as a string **or** an object with the keys title and icon where the value of title is a string and the value of icon is the url of a 32x16 pixel sprite sheet (Only the first 16x16 pixels will be used. The same sprite sheet can be used when displaying a module.) |
| serviceName                               | String           | The name of a local service implemented by your application that will be invoked when a user action is performed relating to the application navigation                                                                                                                                                                |

{% hint style="info" %}
Note: You must implement the `select` method on your application service in order to handle clicks on the created left navigation item.
{% endhint %}

```javascript
// The application service that will be used to handle left navigation item clicks
var helloControllerService = SYMPHONY.services.register("hello:controller");

navService.add("hello-nav", "Hello World App", "hello:controller");

// Implement the select method on your application service
helloControllerService.implement({
  select: function(id) {
    if (id == "hello-nav") {
      console.log("hello-nav was selected.");
    }
  }
});
```

## remove()

Remove an existing application navigation item:

```javascript
function remove(id)
```

| Parameter | Type   | Description                                          |
| --------- | ------ | ---------------------------------------------------- |
| id        | String | The id of the navigation item that should be removed |

```javascript
navService.remove('hello-nav');
```

## count()

Set the badge (notification) count on an application navigation item:

```javascript
function count(id, count)
```

| Parameter | Type    | Description                                                         |
| --------- | ------- | ------------------------------------------------------------------- |
| id        | String  | The id of the navigation item that should have its count updated    |
| count     | Integer | The new badge count number. Specifying 0 will hide the badge count. |

```javascript
navService.count("hello-nav", count);
```

## rename()

Change the title of an existing application navigation item.

Note that this only changes the title of a specific navigation item -- not to all navigation items created by the application:

```javascript
function rename(id, title)
```

| Parameter                                 | Type             | Description                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                      | String           | The id of the navigation item that should be renamed                                                                                                                                                                                                                                                                   |
| **Either** `title` **or** `{title, icon}` | String or Object | **Either** the title of the left navigation item as a string **or** an object with the keys title and icon where the value of title is a string and the value of icon is the url of a 32x16 pixel sprite sheet (Only the first 16x16 pixels will be used. The same sprite sheet can be used when displaying a module.) |

```javascript
navService.rename('hello-nav', 'New Left Nav Title');
```

## focus()

Focus an existing application navigation item:

```javascript
function focus(id)
```

| Parameter | Type   | Description                                        |
| --------- | ------ | -------------------------------------------------- |
| `id`      | String | The id of the application navigation item to focus |

```javascript
navService.focus("hello-nav");
```
