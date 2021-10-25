# IAttachmentHandler

{% tabs %}
{% tab title="IAttachmentHandler" %}
```java
/**
 * Interface to be implemented by classes responsible for handling the temporary storage of
 * attachments and also how to "open" them.
 */
public interface IAttachmentHandler {

    /**
     * Determines if the embedded image viewer should be used for image attachments. If this returns
     * false, the openAttachment method will be invoked for all attachment types, including images.
     *
     * @return {@code true} to use embedded image viewer; {@code false} to always invoke openAttachment.
     */
    boolean shouldUseEmbeddedViewerForImages();

    /**
     * Invoked when the app wants to "open" an attachment. The file bytes passed to this method
     *
     * @param activity the source activity where the action originated from.
     * @param uri      the attachment URI.
     * @param mimeType the attachment MIME type.
     */
    void openAttachment(@NonNull final Activity activity, @NonNull final Uri uri, @Nullable final String mimeType);

    /**
     * Determines if the user can open attachments in external apps.
     *
     * @return {@code true} if the user can open attachments in external apps; {@code false} otherwise.
     */
    boolean canOpenAttachmentInExternalApp();

    /**
     * Invoked when the app wants to open an attachment in an external app, after checking if the
     * user is allowed to do so by invoking {@link #canOpenAttachmentInExternalApp()}.
     *
     * @param context the context where the action originated from.
     * @param uri     the attachment URI.
     */
    void openAttachmentInExternalApp(@NonNull final Context context, @NonNull final Uri uri);
}
```
{% endtab %}
{% endtabs %}
