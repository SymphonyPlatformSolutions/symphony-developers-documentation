# BBAbstractDataStore

`BBAbstractDataStore` is the protocol required for you to customize the way preferences data is stored by the framework. The typical usage for this is to secure or encrypt data before sending it to NSUserDefaults, or to use an existing secure NSUserDefaults replacement.

{% tabs %}
{% tab title="Setting the Data Store" %}
```aspnet
[BBDataContainer setDefaultDataStore: [MySecureUserDefaults standardUserDefaults]];
```
{% endtab %}
{% endtabs %}

The required methods match closely with those exposed by NSUserDefaults, and are used in the same manner.

{% tabs %}
{% tab title="Objective-C" %}
```aspnet
@protocol BBAbstractDataStore <NSObject>

@required
- (void)setBool:(BOOL)value forKey:(NSString*)key;
- (void)setFloat:(float)value forKey:(NSString*)key;
- (void)setDouble:(double)value forKey:(NSString*)key;
- (void)setInteger:(NSInteger)value forKey:(NSString*)key;
- (void)setObject:(id)value forKey:(NSString*)key;
- (BOOL)boolForKey:(NSString*)key;
- (float)floatForKey:(NSString*)key;
- (double)doubleForKey:(NSString*)key;
- (NSInteger)integerForKey:(NSString*)key;
- (id)objectForKey:(NSString*)key;
- (BOOL)synchronize;
@end
```
{% endtab %}
{% endtabs %}

