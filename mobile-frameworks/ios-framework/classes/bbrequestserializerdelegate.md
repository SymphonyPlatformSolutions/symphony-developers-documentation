# BBRequestSerializerDelegate

The `BBRequestSerializerDelegate` is how you can alter all of the NSURLRequests used by the framework.

{% tabs %}
{% tab title="BBRequestSerializerDelegate" %}
```text
@protocol BBRequestSerializerDelegate <NSObject>

- (NSMutableURLRequest *)updatedRequestForURLRequest:(NSMutableURLRequest *)request;

@end
```
{% endtab %}
{% endtabs %}

## Methods

{% tabs %}
{% tab title="updatedRequestForURLRequest" %}
```text
- (NSMutableURLRequest *)updatedRequestForURLRequest:(NSMutableURLRequest *)request;
```
{% endtab %}
{% endtabs %}

**updatedRequestForURLRequest**  
The Framework passes your delegate every NSMutableURLRequest for you to modify as you see fit. You can add/alter headers or perform any other transformation. Be sure to return a valid NSMutableURLRequest.

{% hint style="info" %}
### `updatedRequestForURLRequest`

This method can be called from any thread.
{% endhint %}

