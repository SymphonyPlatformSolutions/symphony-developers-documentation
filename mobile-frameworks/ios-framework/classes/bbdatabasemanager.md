# BBDatabaseManager

The framework uses classes in `BBDatabaseManager` for all of it's database access.  
There are two ways you can customize how the framework interacts with the database.  
The first is to create a replacement `BBDatabaseManager` framework, exposing all the same public classes and methods.  
The second one is to register classes to customize specific functionality within the `BBDatabaseManager`. This method is lighter than replacing the entire `BBDatabaseManager` framework, and is the preferred option for most use cases.

There are two classes you can override in the `BBDatabaseManager` without replacing the entire framework.

{% tabs %}
{% tab title="Overrides" %}
```text
+ (void)registerClassForFMDatabase:(Class <BBDatabase>)class;
+ (void)registerClassForDatabaseKeyFactory:(Class <BBDatabaseKeyFactory>)keyClass;
```
{% endtab %}
{% endtabs %}

By supplying your own [`BBDatabase`](bbdatabase.md) class, you can control which SQLite \(or other database technology\) is used to store the locally cached data. The BBDatabase protocol is a subset of a class named FMDatabase. FMDatabase is an open source objective-c wrapper around sqlite.

Supplying a custom `BBDatabase` class will also require that you create a class which conforms to [`BBDatabaseResultSet`](bbdatabaseresultset.md). The [`BBDatabaseResultSet`](bbdatabaseresultset.md) protocol is a subset of the FMResultSet class.  
An example of a two classes that implement `BBDatabase` and [`BBDatabaseResultSet`](bbdatabaseresultset.md) has been provided in the SDK.

By supplying your own [`BBDatabaseKeyFactory`](bbdatabasekeyfactory.md) class, you can control the encryption key used by Symphony to encrypt the locally cached data.  


