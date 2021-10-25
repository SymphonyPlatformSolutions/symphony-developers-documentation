# IAppPolicy

{% tabs %}
{% tab title="IAppPolicy" %}
```java
/**
 * Interface describing the application policy for enabling/disabling certain features.
 */
public interface IAppPolicy {

    /**
     * The policy version.
     *
     * @return the policy version.
     */
    String policyVersion();

    /**
     * SSO server URL.
     *
     * @return the SSO server URL.
     */
    @Nullable
    String ssoServerUrl();

    /**
     * POD domain.
     *
     * @return the POD domain.
     */
    @Nullable
    String podDomain();

    /**
     * Name of "Retrieve Password" button.
     *
     * @return the name of "Retrieve Password" button.
     */
    String nameOfRetrievePasswordButton();

    /**
     * Basic features you can enable/disable.
     *
     * @return the basic allows.
     */
    Basic basicAllows();

    /**
     * Advanced features you can enable/disable.
     *
     * @return the advanced allows.
     */
    Advanced advancedAllows();

    /**
     * Refreshes the application policy from the bundle. This will provide framework a hook to
     * refresh the application policy.
     *
     * @param bundle the policy bundle.
     * @return {@code true} if app policy is refresh; {@code false} otherwise.
     */
    boolean refreshAppPolicy(Bundle bundle);

    interface Basic {

        /**
         * Enable features which require or request access to the device Address Book.
         *
         * @return {@code true} to enable address book; {@code false} otherwise.
         */
        boolean addressBook();

        /**
         * Enable the copying of messages.
         *
         * @return {@code true} to enable the copying of messages; {@code false} otherwise.
         */
        boolean copy();

        /**
         * Enable the sharing of messages or attachments through device Share extensions and other
         * built-in services.
         *
         * @return {@code true} to enable the sharing of messages; {@code false} otherwise.
         */
        boolean sharing();

        /**
         * Enable features which require or request access to the Photos stored on the device.
         *
         * @return {@code true} to enable photo picker; {@code false} otherwise.
         */
        boolean photoPicker();

        /**
         * Enable content, such as URLs, to be loaded into a web view within the application.
         *
         * @return {@code true} to enable content loaded into web view; {@code false} otherwise.
         */
        boolean webView();

        /**
         * Allow users to open only images and PDFs on Android (this content will open inside the app itself).
         *
         * @return {@code true} to enforce to open only images and PDFs; {@code false} otherwise.
         */
        boolean enforceOpenMediaAndPdf();

        /**
         * Disable features which would permit the user to set a 6 digit PIN code to protect access to the application.
         *
         * @return {@code true} to disable pin code; {@code false} otherwise.
         */
        boolean disablePincode();

        /**
         * Enforce PIN code.
         *
         * @return {@code true} to enforce pin code; {@code false} otherwise.
         */
        boolean enforcePincode();

        /**
         * Set this to YES if you would like the Symphony application to ignore your pod's SSO settings, forcing sign in through the Symphony-specific username & password.
         * This policy trumps all other SSO-related policies.
         * Default is NO
         *
         * @return {@code true} to disable the SSO; {@code false} otherwise.
         */
        boolean disableSSO();

        /**
         * Set this to YES if you would like the Symphony application to hide First Launch introduction screens.
         * Default is NO
         *
         * @return {@code true} to disable the introduction screens; {@code false} otherwise.
         */
        boolean disableIntroduction();

        /**
         * Set this to YES if you would like the Symphony application to hide feedback button in the Settings screen.
         * Default is NO
         *
         * @return {@code true} to disable the feedback button; {@code false} otherwise.
         */
        boolean disableFeedback();

        /**
         * Set this to YES if you would like the Symphony application to enable the sending of Emoji characters completely.
         * Default is NO
         *
         * @return {@code true} to enable the sending of emojis; {@code false} otherwise.
         */
        boolean enableSendingEmojis();

        /**
         * Policy that prevent external email app open when clicking and email url.
         * Default is YES
         *
         * @return {@code true} to enable the opening email address; {@code false} otherwise.
         */
        boolean enableOpeningEmailAddress();

        /**
         * Disable access to photo gallery (Enforce photo upload directly from camera).
         *
         * @return true to disable access to photo gallery.
         */
        boolean disableAccessToPhotoGallery();

        /**
         * Allow users to open content in secure external applications.
         *
         * @return {@code true} to enable opening content in secure external applications; {@code false} otherwise.
         */
        boolean allowOpenSecuredExternalApplication();
    }

    interface Advanced {

        /**
         * Enable anonymous crash reporting be gathered and sent to Symphony.
         *
         * @return {@code true} to enable crash reporting; {@code false} otherwise.
         */
        boolean crashReporting();

        /**
         * Enable on-device logging of URLs accessed and response codes.
         *
         * @return {@code true} to enable network debugging; {@code false} otherwise.
         */
        boolean networkDebugging();

        /**
         * Enable analytics events to be gathered and sent to Symphony.
         *
         * @return {@code true} to enable analytics; {@code false} otherwise.
         */
        boolean analytics();

        /**
         * Refresh token period.
         *
         * @return Refresh token period in hour or {@link #POLICY_REQUEST_ERROR} if is not possible to get policy info.
         */
        int refreshTokenPeriod();
    }
}
```
{% endtab %}
{% endtabs %}
