# BBRequestSerializationManager

This singleton is your interface to interacting with every NSURLRequest sent by the framework.

## Methods

{% tabs %}
{% tab title="sharedInstance" %}
```text
+ (instancetype)sharedInstance;
```
{% endtab %}
{% endtabs %}

**`sharedInstance`**  
You should not call BBRequestSerializationManager alloc init to get a copy of the BBRequestSerializationManager. Instead use BBRequestSerializationManager sharedInstance.  
Returns the shared instance of BBRequestSerializationManager. Using your own copy of BBRequestSerializationManager may seem to work, but many features of the app will not behave correctly.

## Properties

{% tabs %}
{% tab title="requestSerializerDelegate" %}
```text
@property (nonatomic, weak) id <BBRequestSerializerDelegate> requestSerializerDelegate;
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
This should only be called on the main thread/queue.
{% endhint %}

@param `requestSerializerDelegate` Instantiate a class that implements one or more of the methods of the [`BBRequestSerializerDelegate`](bbrequestserializerdelegate.md) and set it on the shared instance of the [`BBRequestSerializationManager`](bbrequestserializationmanager.md).  
  


