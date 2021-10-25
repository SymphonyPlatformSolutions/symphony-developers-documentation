# Filter Function

You can add a new method to the service that is handling button clicks, called `filter()`, on any UI extension that you are implementing. Before a button is shown, that method is passed the uiClass, the id, and the payload. If `filter()` returns `false`, the button is not shown. If the method is unimplemented or it returns any value other than false, the button is shown.

The filter function returns the same data returned by the ui Service [here](receiving-conversation-and-user-information.md). All data except for the the user's phone number is returned in cases where you are using an authenticated app. The user phone number is only returned for 1x1 IMs and User Profiles.

Based on the information returned, you can choose to selectively display the button. For example, you can display the button only if a user's phone number is present, or if a user is not a cross-pod user.

```javascript
// Implement the filter function on your application service
helloFilterService.implement(
   filter: function (type, id, data) {
        return !!(data.user && data.user.phone);
    }
  }
});
```

*
