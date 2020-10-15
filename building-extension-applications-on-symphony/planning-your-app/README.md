# Planning Your App

## What is a Symphony Extension App?

Symphony extension apps are standalone web applications that are embedded within the Symphony user interface as iframes.  These iframes interact with the Symphony container using the Client Extension API. Extension applications can either be accessed by the end user in two ways:

1. Extension apps can be accessed from the left hand navigation under the 'applications' tab.  Clicking on your application from the left hand navigation brings your app into view.
2. Extension apps can be attached to contexts such as \#hashtags, $cashtags, or user profiles.  Clicking on one of these items can bring your app into view.    

Developing extension applications enables developers to enrich the Symphony experience and create custom workflows and automations on top of the Symphony platform.

## How do Extension Apps create workflows and automations?

The answer lies in Symphony's Extension API. The Extension API is a JavaScript library that consists of services and methods that allow applications to extend and interact with Symphony's user interface. By leveraging these services, developers can:

* Add modules, or windows bringing your app's content into the Symphony canvas
* Add entry points for your app, such as navigation items on the left hand nav or \#hashtags and $cashtags.
* Add interactive buttons to chat and user profile module headers
* Enable users to share content from your app into Symphony chats

For a full overview of Symphony's Extension API continue here:

{% page-ref page="../overview-of-extension-api/" %}

## Next Steps

Before you begin your extension app development journey, it is important to consider the following when determining what type of app you build:

## 1.  What are the goals of your Symphony Extension App?

Before building your extension app, it's important that you identify the use cases that this app will serve. In other words, identify the ways in which this app will increase productivity, add meaningful color to your daily tasks, centralize information, reduce business pain points, and make working simpler for end users. To easily identify valuable use cases, ask yourself the following:

* Are there numerous sources of information that I check daily that can be centralized inside of Symphony?
* Are there any views or visualizations from third party apps which could be embedded into Symphony's UI?
* Are there any tasks in my daily workflow that require manually sifting through large amounts of data?
* Would it be helpful if this data could be accessed easily to Symphony users across my organization?
* Are there any customized features on Symphony's UI that would increase my productivity and efficiency?

If you need additional inspiration, checkout our [Symphony App Directory](https://symphony.com/resource/app-directory/) for examples of what has been built by our robust developer community!

## 2.  Who is your App's target audience?

The type of extension app you build will depend on who is using and interacting with it.  To identify your app's audience, ask yourself the following:

* Are the users of my app internal or external counter-parties?
* Are the users of my app front-office or back-office employees mostly?
* Will my app be interacting with a technical audience or a business audience?
* What languages does your audience speak?

The more you understand your app's audience, the more you can understand their business pain points and in turn develop a better user-experience and app solution.

## 3.  What sort of interactions will your App have?

Users can interact with extension applications in a number of different ways. Specifically, users can launch a standalone extension app from the left-hand nav, invoke the app by clicking on custom UI buttons on a users profile, launch the app by clicking on attached contexts such as \#hashtags or $cashtags, and even allow authenticated apps to make actions on-behalf-of an authorized user. Before building your extension app, its important to identify the types of interactions between users and your app:

### Will your application need to receive conversation or user data?

Many extension applications built on top of Symphony need to receive conversation or user data. For example, if you wanted to build an extension app that extends the Symphony UI to add buttons to the IM, MIM, profile, or chatroom modules, it is likely that you would need access to conversation or user data. In order to do so your application will need to perform app authentication. You can learn more about performing app authentication here:

{% page-ref page="../app-authentication/" %}

### Will your application customize modules by adding buttons to IMs, MIMs, chatrooms, or user profiles?

Another common use case for extension applications is to extend various parts of the Symphony UI by adding buttons to IMs, MIMs, chatrooms, or profile modules. In order to receive the conversation and user data associated with these modules, these extension apps must also perform app authentication. You can learn more about how to receive user and conversation data as well as adding buttons to Symphony modules here:

{% page-ref page="extension-applications-+-ui-buttons.md" %}

### Will your application customize links added to the \#hashtag and $cashtag hovercards?

Another way extension applications can extend Symphony's UI is to override links associated with \#hashtag \(e.g. \#symphony\) and $cashtag \(e.g. $GOOG\) hover cards. By attaching your extension app to \#hashtag or $cashtag contexts, you can show content in your app that is relevant to the context clicked by the user. You can learn more about how build extension apps that extend these \#hashtag and $cashtag entities here:

{% page-ref page="extension-applications-+-hashtags-and-usdcashtags.md" %}

### Will your application perform custom rendering?

Extension apps can extend Symphony's UI by acting as a custom renderer for structured objects created by the REST API. Structured objects are rich, inline, and interactive components embedded in a Symphony message. These structured objects can be rendered and injected into Symphony by creating a custom renderer as a part of an extension application. You can learn more about how to create a custom renderer in order to render structured objects here:

{% page-ref page="extension-applications-+-structured-objects.md" %}

### Will your application contain a standalone frontend?

Some extension apps contain a dedicated frontend that will be embedded within of Symphony. For example, it's possible that your extension app will need to present complex financial data, charts, or dashboards, to an end user. Obviously, this functionality is not provided by Symphony out of the box, but you can bring it into Symphony through an extension application.  Symphony provides a UI toolkit containing a library of react components in order to help build complex frontend applications rapidly. This UI toolkit contains layout guides, forms, and even complex financial charts, to allow you get the best out of your workflow, or business requirements.

To learn more about leveraging the UI Toolkit to build complex frontend applications continue here:

{% page-ref page="extension-applications-+-ui-toolkit.md" %}

