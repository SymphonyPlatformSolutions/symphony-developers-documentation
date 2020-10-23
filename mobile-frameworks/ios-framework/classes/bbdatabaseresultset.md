# BBDatabaseResultSet

BBDatabaseResultSet is a subset of the functionality provided by FMResultSet.

{% tabs %}
{% tab title="BBDatabaseResultSet" %}
```text
@protocol BBDatabaseResultSet <NSObject>

- (int)intForColumnIndex:(int)columnIdx;
- (NSString *)stringForColumnIndex:(int)columnIdx;

- (NSString *)stringForColumn:(NSString *)columnName;
- (int)intForColumn:(NSString *)columnName;
- (long)longForColumn:(NSString *)columnName;
- (long long)longLongIntForColumn:(NSString *)columnName;
- (BOOL)boolForColumn:(NSString *)columnName;
- (NSData *)dataForColumn:(NSString *)columnName;
- (BOOL)next;
- (void)close;

@end
```
{% endtab %}
{% endtabs %}

