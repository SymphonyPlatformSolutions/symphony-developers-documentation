# BBAlternateApplicationProxy

{% tabs %}
{% tab title="BBAlternateApplicationProxy" %}
```text
@protocol BBAlternateApplicationProxy
- (UIImage *)alternateApplicationIcon;
@end
```
{% endtab %}
{% endtabs %}

This is a class that you pass back to the application when you are able to open a URL or file in an external application. This class can wrap whatever state you need to make the opening work, but must be able to return a 48x48 UIImage representing the application's icon.  
This icon will be used by the framework to show an "open in" button which will allow your user to open the content in the external application represented by the `BBAlternateApplicationProxy`.  
See [`BBURLManagerDelegate`](bburlmanagerdelegate.md)\`\`

