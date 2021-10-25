# BBFileManagerHelper

`BBFileManagerHelper` is a class that the framework uses to coordinate all file IO (apart from database access). There are two classes you can subclass or reimplement which will allow you to secure the way the framework accesses the device's storage. BBFileManager and NSFileHandle.

{% tabs %}
{% tab title="BBFileManager" %}
```
+ (void)registerClassForFileManager:(Class)fileManagerClass;
```
{% endtab %}
{% endtabs %}

**`registerClassForFileManager`**\
This is how you tell the framework which class to instantiate when it wants any of the functionality provided by BBFileManager. If you do not register a different class, the default BBFileManager is used, which uses iOS standard APIs to read & write files to the device's storage.

{% tabs %}
{% tab title="NSFileHandle" %}
```
+ (void)registerClassForFileHandle:(Class)fileHandleClass;
```
{% endtab %}
{% endtabs %}

**`registerClassForFileHandle`**\
This is how you tell the framework which class to use when it wants an NSFileHandle for accessing files on the device's storage. If you do not register a different class, NSFileHandle is used.

{% tabs %}
{% tab title="BBFileManager" %}
```csharp
@interface BBFileManager : NSObject

+ (BOOL)writeData:(NSData*)data toFile:(NSString *)path atomically:(BOOL)useAuxiliaryFile;
+ (BOOL)appendData:(NSData*)data toFile:(NSString*)path;

+ (NSData*)dataWithContentsOfFile:(NSString *)path;
+ (BOOL)fileExistsAtPath:(NSString *)path;
+ (BOOL)createDirectoryAtPath:(NSString *)path withIntermediateDirectories:(BOOL)createIntermediates attributes:(NSDictionary *)attributes error:(NSError * __autoreleasing *)error;
+ (BOOL)createFileAtPath:(NSString *)path contents:(NSData *)data attributes:(NSDictionary *)attr;
+ (BOOL)removeItemAtPath:(NSString *)path error:(NSError * __autoreleasing *)error;
+ (BOOL)copyItemAtPath:(NSString *)srcPath toPath:(NSString *)dstPath error:(NSError * __autoreleasing *)error;

+ (NSDictionary *)attributesOfItemAtPath:(NSString *)path error:(NSError * __autoreleasing *)error;
+ (NSDirectoryEnumerator *)enumeratorAtPath:(NSString *)path;
+ (NSDirectoryEnumerator *)enumeratorAtURL:(NSURL *)url includingPropertiesForKeys:(NSArray *)keys options:(NSDirectoryEnumerationOptions)mask errorHandler:(BOOL (^)(NSURL *url, NSError *error))handler;

+ (NSURL *)getSharedApplicationGroupDirectory:(NSString *)groupIdentifier;
+ (NSString *)displayNameAtPath:(NSString *)path;

@end
```
{% endtab %}
{% endtabs %}
