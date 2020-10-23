# BBDatabaseKeyFactory

`BBDatabaseKeyFactory` allows you to supply a key which will be used by Symphony to encrypt the locally cached data. If you are interested in supplying your own encryption key for the local database, you can register a class which conforms to the `BBDatabaseKeyFactory` protocol.

{% tabs %}
{% tab title="BBDatabaseKeyFactory" %}
```text
@protocol BBDatabaseKeyFactory <NSObject>
+ (NSString *)databaseKeyForSeedString:(NSString *)string;
@end
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
### Key For Seed String

For a given input string, your BBDatabaseKeyFactory class must return the same output string.  If your BBDatabaseKeyFactory returns a different key, the locally cached data cannot be decrypted by the app.  
{% endhint %}



