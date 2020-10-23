# Client

{% tabs %}
{% tab title="Client" %}
```java
/**
 * Interface to be implemented by classes that provide HTTP communication.
 */
public interface Client {

    /**
     * The default request timeout interval, in seconds.
     */
    int REQUEST_TIMEOUT = 60; // 60 seconds

    /**
     * Performs a synchronous HTTP request. Should never be used on the main thread.
     *
     * @param request the HTTP request to perform.
     * @return the HTTP response returned by the server, if any.
     * @throws IOException in the case of network error.
     */
    @NonNull
    Response performSyncRequest(@NonNull Request request) throws IOException;

    /**
     * Performs an asynchronous HTTP request, invoking the callback object when completed.
     *
     * @param request  the HTTP request to perform.
     * @param callback callback object to be invoked when the request completes.
     */
    void performAsyncRequest(@NonNull Request request, @NonNull Callback callback);

    /**
     * Cancel requests with tag currently in the queue or currently executed.
     *
     * @param tag the requests tag to cancel.
     */
    void cancelRequests(@NonNull String tag);

    /**
     * Cancel all requests currently in the queue.
     */
    void cancelAllRequests();

    /**
     * Clear all cookies.
     */
    @Deprecated
    void clearCookies();

    /**
     * Check if request must be intercepted in the SSO webview. Allow to exclude some resources from httpclient calls.
     *
     * @param url url of the request.
     * @return true if the request must be bypassed, false if it must be intercepted.
     */
    boolean bypassSsoRequestInterceptionForUrl(@NonNull String url);

    /**
     * Interface for handling the possible results of an asynchronous HTTP request
     */
    interface Callback {

        /**
         * Invoked in the case of a network error.
         *
         * @param exception the network error that interrupted the request.
         */
        void onFailure(@NonNull IOException exception);

        /**
         * Invoked when the server returns a response.
         *
         * @param response the response returned by the server (successful or otherwise).
         * @throws IOException in case the response could not be parsed or handled.
         */
        void onResponse(@NonNull Response response) throws IOException;
    }
}
```
{% endtab %}
{% endtabs %}

