# BBDatabase

`BBDatabase` is a subset of the functionality in the open-source class named FMDatabase.  
You should use FMDatabase as the template for implementing your own class which implements the `BBDatabase` protocol.

{% tabs %}
{% tab title="BBDatabase" %}
```text
@protocol BBDatabase <NSObject>

+ (instancetype)databaseWithPath:(NSString *)inPath;

- (BOOL)openWithFlags:(int)flags;
- (BOOL)close;
- (BOOL)hasOpenResultSets;

- (BOOL)setKey:(NSString*)key;
- (BOOL)rekey:(NSString *)key;

- (id <BBDatabaseResultSet>)executeQuery:(NSString *)sql, ...;
- (id <BBDatabaseResultSet>)executeQuery:(NSString *)sql withArgumentsInArray:(NSArray *)arguments;

- (int)intForQuery:(NSString *)query, ...;

- (BOOL)executeUpdate:(NSString *)sql, ...;
- (BOOL)executeUpdate:(NSString *)sql withArgumentsInArray:(NSArray *)arguments;

- (BOOL)goodConnection;

- (uint32_t)userVersion;
- (void)setUserVersion:(uint32_t)version;

- (void)closeOpenResultSets;

- (NSUInteger)statementVariableLimit;

@end
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
BBDatabase adds one method to the API exposed by the off-the-shelf FMDatabase class.  `statementVariableLimit`
{% endhint %}

{% tabs %}
{% tab title="statementVariableLimit" %}
```text
- (NSUInteger)statementVariableLimit
```
{% endtab %}
{% endtabs %}

Based upon how SQLite was compiled, the maximum number of statement variables supported by SQLite can be changed. This limit can be determined at runtime with `sqlite3_limit(_db, SQLITE_LIMIT_VARIABLE_NUMBER, -1).`  
This API provides a way for `BBDatabase` classes to declare the maximum number of variables that are permitted in a SQL statement.

