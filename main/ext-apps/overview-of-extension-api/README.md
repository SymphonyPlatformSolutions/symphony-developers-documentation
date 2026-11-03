# Overview of Extension API

Symphony extension applications are standalone web applications that are embedded within the Symphony user interface as iframes that interact with the Symphony container using the Client Extension API.

## Extension API Capabilities

The **Client Extension API** is a JavaScript library that consists of services containing methods that allow developers to build apps that extend and interact with Symphony's user interface. Using these services, developers can:

* Add modules, or windows, containing your app content to the Symphony client
* Add entry points for your app, such as navigation items in Symphony's left sidebar or links on #hashtag and $cashtag hovercards
* Add interactive buttons to chat and user profile module headers
* Enable users to share content from your app into Symphony chats
* Register custom renderers to richly display messages containing structured objects

Some of Symphony’s services will require you to implement your own services with methods to handle events. For example:

* Handling a user click on your app’s left sidebar menu item by opening your default app module
* Handling a user click on your app’s #hashtag or $cashtag hovercard link by opening an app module with a contextual search

{% hint style="info" %}
Many of these event handlers are provided out of the box by the BDK 1.0's App Template. To learn more about the out-of-the-box implementations provided by the BDK 1.0 continue to the [Planning Your App](../planning-your-app.md) or [Tutorials](./) sections.
{% endhint %}

## App Controller and Views

Applications created with the Client Extension API run in iframes inside the Symphony client.

Symphony apps consists of:

* The main application controller, a hidden iframe that uses the Client Extension API services to bootstrap your app, extending the Symphony user interface
* In most cases, one or more application views, separate iframes that are rendered within Symphony modules

Applications can be built using any web development technology of your choice.

## Extension API Services

Services are used for communication between your app and the Symphony client. There are two types of services: remote and local.

### Remote Services

Remote services are services that are shared:

* The services of the Client Extension API are remote services whose methods can be invoked by your application controller and views
* You can also implement remote services that can be shared between your application controllers and views

### Local Services

Local services are services are specific to either your controller or one of your views.

To learn more about the services and capabilities provided by the Extension API continue here:

{% content-ref url="extension-api-services/" %}
[extension-api-services](extension-api-services/)
{% endcontent-ref %}
