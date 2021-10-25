# IClipboardManager

{% tabs %}
{% tab title="IAppPolicy" %}
```java
/**
 * Clipboard manager interface.
 */
public interface IClipboardManager {

    /**
     * Sets the current primary clip on the clipboard.  This is the clip that
     * is involved in normal cut and paste operations.
     *
     * @param clip The clipped data item to set.
     */
    void setPrimaryClip(ClipData clip);

    /**
     * Returns the current primary clip on the clipboard.
     */
    ClipData getPrimaryClip();

    /**
     * Returns a description of the current primary clip on the clipboard
     * but not a copy of its data.
     */
    ClipDescription getPrimaryClipDescription();

    /**
     * Returns true if there is currently a primary clip on the clipboard.
     */
    boolean hasPrimaryClip();
}
```
{% endtab %}
{% endtabs %}
