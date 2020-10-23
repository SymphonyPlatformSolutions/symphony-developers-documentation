# BBURLManager

`BBURLManager` is a singleton which provides its delegate with the ability to customize how the application deals with certain types of URLs.  
The types of URLs which you can intercept and provide a customized experience include:

* http, https, and other web links included in chats and posts
* File attachments in chats and posts \(such as PDF, XLS and other non-image attachments\)
* Forced update AppStore URLs

Setting the [`BBURLManagerDelegate`](bburlmanagerdelegate.md) is easy. All the methods of [`BBURLManagerDelegate`](bburlmanagerdelegate.md) are optional, and if they are not implemented, the app will handle the situation in a default manner, which typically involves opening the URL/Attachment inside the application. See [`BBURLManagerDelegate`](bburlmanagerdelegate.md) for the full list of methods.

{% tabs %}
{% tab title="BBURLManager" %}
```text
@interface BBURLManager : NSObject

+ (instancetype)sharedInstance;

@property (nonatomic, weak) id <BBURLManagerDelegate> urlManagerDelegate;
@end
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
When setting the [`BBURLManagerDelegate`](bburlmanagerdelegate.md), use the shared instance.  
{% endhint %}

The [`BBURLManagerDelegate`](bburlmanagerdelegate.md) can be set or cleared at anytime.  


## Methods

{% tabs %}
{% tab title="sharedInstance" %}
```text
+ (instancetype)sharedInstance;
```
{% endtab %}
{% endtabs %}

**`sharedInstance`**  
You should not call BBURLManager alloc init to get a copy of the BBURLManager. Instead use BBURLManager sharedInstance.  
Returns the shared instance of BBURLManager. Using your own copy of BBURLManager may seem to work, but many features of the app will not behave correctly.

### Properties

{% tabs %}
{% tab title="setURLManagerDelegate" %}
```text
@property (nonatomic, weak) id <BBURLManagerDelegate> urlManagerDelegate;
```
{% endtab %}
{% endtabs %}

**`setURLManagerDelegate`**

{% hint style="info" %}
This should only be called on the main thread/queue.  
{% endhint %}

* _delegate_ Instantiate a class that implements one or more of the methods of the [`BBURLManagerDelegate`](bburlmanagerdelegate.md) and set it on the shared instance of the BBURLManager.

