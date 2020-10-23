# Interceptor

{% tabs %}
{% tab title="Interceptor" %}
```java
/**
 * Interface to be implemented by classes that need to observe or modify the requests and responses
 * in a {@link Client}.
 */
public interface Interceptor {

    /**
     * Indicates if this interceptor can modify the request headers. If this method returns false,
     * {@link #modifyRequestHeaders(Map)} won't be invoked at all.
     *
     * @return true if the interceptor modifies the request headers
     */
    boolean modifiesRequestHeaders();

    /**
     * Modifies the request headers
     *
     * @param headers the current headers set in the request
     * @return the new headers to be used (will replace current headers)
     */
    @NonNull
    Map<String, List<String>> modifyRequestHeaders(@NonNull final Map<String, List<String>> headers);

    /**
     * Indicates if this interceptor can modify the response body. If this method returns false,
     * {@link #modifyResponseBody(Response, Map)} won't be invoked at all.
     *
     * @return true if this interceptor modifies the response body
     */
    boolean modifiesResponseBody();

    /**
     * Modifies the response body
     *
     * @param response the server response
     * @param context  additional parameters that can be shared between this and other response
     *                 processing methods
     * @return the new response body raw bytes
     */
    @Nullable
    byte[] modifyResponseBody(@NonNull final Response response, @NonNull final Map<String, Object> context);

    /**
     * Indicates if this interceptor can modify the response status code. If this method returns
     * false, {@link #modifyResponseStatusCode(Response, Map)} won't be invoked at all.
     *
     * @return true this interceptor modifies the response status code
     */
    boolean modifiesResponseStatusCode();

    /**
     * Modifies the response status code
     *
     * @param response the server response
     * @param context  additional parameters that can be shared between this and other response
     *                 processing methods
     * @return the new status code
     */
    int modifyResponseStatusCode(@NonNull final Response response, @NonNull final Map<String, Object> context);

    /**
     * Performs any other custom processing in response to a server response, but does not modify it
     *
     * @param response the server response
     * @param context  additional parameters that can be shared between this and other response
     *                 processing methods
     */
    void handleResponse(@NonNull final Response response, @NonNull final Map<String, Object> context);
}
```
{% endtab %}
{% endtabs %}

