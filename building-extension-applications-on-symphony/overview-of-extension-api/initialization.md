# Initialization

## Including the Client Extension API Javascript Library

To use the Client Extension API services, you must include the symphony-api.js JavaScript file in your application controller and views.

```markup
<script type="text/javascript" src="https://cdn.symphony.com/resources/api/v1.0/symphony-api.js" charset="utf-8"></script>
```

## Including Symphony's Style Sheet

To style your app, you must include the symphony-style.css CSS file in your application views and add the class "symphony-external-app" to the `<body>` tag of your app views.

```markup
<link rel="stylesheet" type="text/css" href="https://cdn.symphony.com/resources/api/v1.1/symphony-style.css">
```

## SYMPHONY.remote.hello\(\)

The `SYMPHONY.remote.hello()` method should be used to initialize the connection to the Client Extension API from your application controller and views.

Returns a promise that will be fulfilled when the introduction is complete. If there is a problem, the promise will be rejected. The promise returns an object containing the user's Symphony client theme name, font size, and any associated classes, including those for theme name or size, as well for condensed and contrast modes.

```javascript
hello: function()
```

| Returns | Type | Description |
| :--- | :--- | :--- |
| themeV2 | Object | An object containing the user's Symphony client theme settings |

```javascript
{
  "themeV2" : {
    "name": "dark",
    "size": "normal",
    // This will include a list of all theme and font classes available.
    "classes": [],
  }
}
```

You should style your application according to the user's theme by applying the theme and font size classes to the `<body>` tag of any application modules.

```javascript

	SYMPHONY.remote.hello().then(function(data) {
	
	// Set the theme of the app module
  var themeColor = data.themeV2.name;
  var themeSize = data.themeV2.size;
  // You must add the symphony-external-app class to the body element
  document.body.className = "symphony-external-app " + themeColor + " " + themeSize;
  
});
```

If a user changes his theme, a themeChangeV2 event is fired from the [ui service](extension-api-services/ui-service/), which will pass a `themeV2` object with the new values. You should use a service to [listen](extension-api-services/service-interface.md#listen) to this event and update the classes on the application module `<body>`.  


