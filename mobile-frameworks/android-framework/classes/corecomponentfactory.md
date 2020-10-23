# CoreComponentFactory

{% tabs %}
{% tab title="CoreComponentFactory" %}
```java
/**
 * Factory class responsible for creating the core system components used by the application.
 */
public static class CoreComponentFactory {

    /**
     * Creates a new instance of a HTTP client that will be used to communicate with the server.
     *
     * @param interceptors        list of request/response interceptors to be added
     * @param redirects           if this client should follow redirects
     * @param credentialsProvider interface for getting client username/password credentials
     * @return HTTP client instance
     */
    public Client createHttpClient(Interceptor[] interceptors, boolean redirects, Client.SymphonyCredentialsProvider credentialsProvider);

    /**
     * Creates a new instance of an attachment handler that will be used to customize how
     * attachments are download and opened.
     *
     * @return attachment handler instance
     */
    public IAttachmentHandler createAttachmentHandler();

    /**
     * Access class that implements the {@link SharedPreferences} interface.
     */
    public SharedPreferences getSharedPreferences(String name, int mode);

    /**
     * Initialize the application database.
     *
     * @param openExisting {@code true} if the application is opening the existing database; {@code false} otherwise.
     * @param version      the database version.
     * @return the single {@link ISQLiteDatabase} instance.
     */
    @Nullable
    public ISQLiteDatabase initDatabase(boolean openExisting, int version);

    /**
     * Retrieve Symphony messaging application policy
     *
     * @return The single {@link IAppPolicy} instance that you can configure the application features.
     */
    public IAppPolicy getAppPolicy();

    /**
     * Retrieve application version name
     *
     * @return Application version name
     */
    public String getAppVersionName();

    /**
     * Create custom EditText instance that implement the {@link EditText}
     *
     * @param context {@link Context}
     * @param attrs   {@link AttributeSet}
     * @return A instance of {@link EditText}
     */
    public EditText createEditText(Context context, AttributeSet attrs);

    /**
     * Create custom TextView instance that implement the {@link TextView}
     *
     * @param context      {@link Context}
     * @param attributeSet {@link AttributeSet}
     * @return A instance of {@link TextView}
     */
    public TextView createTextView(Context context, AttributeSet attributeSet);

    /**
     * Create custom WebView instance that implement the {@link WebView}
     *
     * @param context      {@link Context}
     * @param attributeSet {@link AttributeSet}
     * @return A instance of {@link WebView}
     */
    public WebView createWebView(Context context, AttributeSet attributeSet);

    /**
     * Instantiates a {@link IClipboardManager}.
     *
     * @return a clipboard manager instance.
     */
    public final IClipboardManager createClipboardManager();
}
```
{% endtab %}
{% endtabs %}

### **`createHttpClient()`**

```csharp
public Client createHttpClient(Interceptor[] interceptors);
```

| Function | Parameter | Parameter Description | Returns |
| :--- | :--- | :--- | :--- |
| `createHttpClient()` | `interceptors` | Array of Interceptors | None |

Your `CoreComponentFactory` overrides this method to create a new instance of a HTTP client that will be used to communicate with the server.

### **`createAttachmentHandler()`**

```csharp
public IAttachmentHandler createAttachmentHandler();
```

Your `CoreComponentFactory` overrides this method to create a new instance of a `com.symphony.android.framework.IAttachmentHandler`.

| Function | Parameter | Parameter Description | Returns |
| :--- | :--- | :--- | :--- |
| `createHttpClient()` | `interceptors` | Array of Interceptors | \`\`[`IAttachmentHandler`](iattachmenthandler.md)\`\` |

### **`getSharedPreferences()`**

```csharp
public android.content.SharedPreferences getSharedPreferences(java.lang.String name, int mode);
```

Your `CoreComponentFactory` overrides this method to return an instance of a class that implements the `SharedPreferences` interface.

### **`initDatabase()`**

```java
public ISQLiteDatabase initDatabase(boolean openExistingDB, int dbVersion);
```

Your `CoreComponentFactory` overrides this method to create a new instance of a [`ISQLiteDatabase`](isqlitedatabase.md). Use this method change the SQLite engine and or to change the location of the SQLite database.

| Function | Returns |
| :--- | :--- |
| `initDatabase()` | \`\`[`ISQLLiteDatabase`](isqlitedatabase.md)\`\` |

| Parameter | Description |
| :--- | :--- |
| `openExistingDB` | true if the application is opening existing database; false otherwise. |
| `dbVersion` | Database Version |

### **`getAppPolicy()`**

```java
public IAppPolicy getAppPolicy();
```

Your CoreComponentFactory overrides this method to create a new instance of a [`IAppPolicy`](iapppolicy.md).

| Function | Returns |
| :--- | :--- |
| `getAppPolicy()` | \`\`[`IAppPolicy`](iapppolicy.md)\`\` |

### **`getAppVersionName()`**

```java
public java.lang.String getAppVersionName();
```

| Function | Returns |
| :--- | :--- |
| `getAppVersionName()` | App Version Name as a `String` |

### **`createEditText()`**

```java
public android.widget.EditText createEditText(android.content.Context context, android.util.AttributeSet attrs);
```

Create custom `EditText` instance that implement the `EditText`. This allows you to use widgets which prohibit/permits copy/paste or any other custom behavior.

| Function | Returns |
| :--- | :--- |
| `createEditText()` | `EditText` |

### `createTextView()`

```java
public android.widget.TextView createTextView(android.content.Context context, android.util.AttributeSet attributeSet);
```

Create custom `EditText` instance that implement the `EditText`. This allows you to use widgets which prohibit/permits copy/paste or any other custom behavior.

| Function | Returns |
| :--- | :--- |
| `createTextView()` | `EditText` |

### **`createWebView()`**

```java
public android.webkit.WebView createWebView(android.content.Context context, android.util.AttributeSet attributeSet);
```

Create custom WebView instance that implement the WebView.

| Function | Returns |
| :--- | :--- |
| `createWebView()` | `WebView` |

### **`createClipboardManager()`**

```java
public IClipboardManager createClipboardManager();
```

Your CoreComponentFactory overrides this method to create a new instance of a com.symphony.android.framework.IClipboardManager.  


| Function | Returns |
| :--- | :--- |
| `createClipboardManager()` | \`\`[`IClipboardManager`](iclipboardmanager.md)\`\` |

