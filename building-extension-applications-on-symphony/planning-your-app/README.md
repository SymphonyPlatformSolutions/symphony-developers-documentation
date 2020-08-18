# Planning Your App

## What is a Symphony Extension App?

Symphony apps are standalone web applications that are embedded within the Symphony user interface as iframes that interact with the Symphony container using the Client Extension API.  Extension applications can either be accessed by the end user in two ways: 

1. Extension apps accessed from the left hand navigation under the 'applications' tab.  Clicking on your application from the left hand navigation brings your app into view
2. Extension apps can be attached to contexts such as hashtags, cashtags, or user profiles.  Clicking on one of these items brings your app into view.    

Developing extension applications enables developers to enrich the Symphony experience and create custom workflows and automations on top of the Symphony platform.

## How do Extension Apps create workflows and automations?

The answer lies in Symphony's Extension API.  The Extension API is a JavaScript library that consists of services and methods that allow applications to extend and interact with Symphony's user interface.  By leveraging these services, developers can:

* Add modules, or windows bringing your app's content into the Symphony canvas
* Add entry points for your app, such as navigation items on the left hand nav or hashtags and cashtags.
* Add interactive buttons to chat and user profile module headers
* enable users to share content from your app into Symphony chats

For a full overview of Symphony's Extension API continue here:

{% page-ref page="../overview-of-extension-api/" %}

##  Next Steps

Before you begin your extension app development journey, it is important to consider the following when determining what type of app you build:

## 1.  What are the Goals of your Symphony Extension App?

Before building your extension app, it's important that you identify the use cases that this app will serve.  In other words, identify the ways in which this app will increase productivity, add meaningful color to your daily tasks, centralize information, reduce business pain points, and make working simpler for end users.  To easily identify valuable use cases, ask yourself the following:

* Are there numerous sources of information that I check daily that can be centralized inside of Symphony?
* Are there any views or visualizations from third party apps which could be embedded into Symphony's UI?
* Are there any tasks in my daily workflow that require manually sifting through large amounts of data?
* Would it be helpful if this data could be accessed easily to Symphony users across my organization?
* Are there any customized features on Symphony's UI that would increase my productivity and efficiency?

If you need additional inspiration, checkout our [Symphony App Directory](https://symphony.com/resource/app-directory/) for examples of what has been built by our robust developer community!

## 2.  Who is your App's target audience?

The type of extension app you build will depend on who is using and interacting with it, ask yourself the following:

* Are the users of my app internal or external counter-parties?
* Are the users of my app front-office or back-office employees mostly?
* Will my app be interacting with a technical audience or a business audience?
* What languages does your audience speak?

The more you understand your app's audience, the more you can understand their business pain points and in turn develop a better user-experience and app solution.

## 3.  What sort of interactions will your App have?

Users can interact with extension applications in a number of different ways.  Specifically, users can launch a standalone extension app from the left hand nav, invoke the app by clicking on custom UI buttons on a users profile, launch the app by clicking on attached contexts such as hashtags or cashtags, and even allow authenticated apps to make actions on-behalf-of an authorized user.  Before building your extension app, its important to identify the types of interactions between users and your app:

### Will your application need to receive conversation or user data?

Many extension applications built on top of Symphony need to receive conversation or user data.  For example, if you wanted to build an extension app that extends the Symphony UI to add buttons to the IM, MIM, profile, or chatroom modules, it is likely that you would need access to conversation or user data.  In order to do so your application will need perform app authentication.  You can learn more about performing app authentication here:

{% page-ref page="../app-authentication/" %}

### Will your application need to perform actions on behalf of a Symphony user?

Some extension applications will need to perform actions on behalf of an authorized user.  Certain actions such as initiating connection requests, creating IMs and MIMs with other users, sending messages, and getting the presence state of connected users can all be performed by an extension app on behalf of a user \(OBO\).  App workflows that follow this OBO pattern also need to perform app authentication in order to be considered trusted and subsequently receive user/conversation data.  You can learn more about building OBO extension applications here:

{% page-ref page="obo-extension-applications.md" %}

### Will your application customize modules by adding buttons to IMs, MIMs, chatrooms, or user profiles?

Another common use case for extension applications is to extend various party of the Symphony UI by adding buttons to IM, MIM or chatroom, or profile modules.  In order to receive the conversation and user data associated with these modules, these extension apps must also perform app authentication.  You can learn more about how to receive user and conversation data as well as adding buttons to Symphony modules here:

{% page-ref page="extension-applications-+-ui-buttons.md" %}

  

   

###  







   

