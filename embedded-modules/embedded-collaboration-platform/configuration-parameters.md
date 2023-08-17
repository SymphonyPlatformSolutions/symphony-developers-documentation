# Configuration parameters

You can configure many aspects of ECP, such as the look and feel, the theme or the actions that the user can perform in the chat.

## ECP settings

These are client-side parameters, which will not override the configuration of the pod. \
For example, if a user's admin has blocked file attachments in the Admin Portal, the setting `showAttach` to true will have no effect.

```typescript
{
  // APP PARAMETERS
  // Common
  streamId: string; // stream ID of an existing conversation to open
  userIds: string; // IM/Group chat: Comma separated user IDs or emails (or both)
  allowedApps: string; // Comma separated list of App IDs to whitelist
  // Focus mode only  
  theme: IThemeColors; // Colour Palette overrides
  
  // CONFIGURABLE APP SETTINGS
  // Common
  canAddPeople: boolean; // allow add members to rooms if owner. default false
  condensed: boolean; // condensed mode. default true
  condensedMessageBelowName: boolean; // if in condensed mode, display message below or next to name. default true (below)
  ecpLoginPopup: boolean; // perform login within a popup, for SSO systems that refuse iframe integration. default false
  mode: 'light' | 'dark' | undefined; // built-in colour palettes. default light
  showAttach: boolean; // enable attachments. default true
  showEmoji: boolean; // enable emojis in the editor. default true
  showSuppressMessage: boolean; // allow user to suppress messages. default true
  showSystemMessages: boolean; // show system/maestro messages (e.g. a user joined room). default false
  sound: boolean; // enable sound notifications
  // Focus mode only
  showChatSearch: boolean; // enable search feature. default true
  showBookmarkMessage: boolean; // allow user to bookmark message. default true
  showCompose: boolean; // enable compose mode editor. default true
  showDisableInput: boolean; // enable user to disable editor. default true
  showEditor: boolean; // enable editor. default true
  showTitle: boolean; // show room title in the header. default true
  showInfo: boolean; // show room information in the header. default true
  showMembers: boolean; // show list of members. default true
  showProfilePopover: boolean; // show popover profile cards. default true
  symphonyLogo: boolean; // Display the 'Powered by SYMPHONY logo' below ECP chats. default true
  // Collaboration mode only
  allowChatCreation: boolean; // enable user to create new chats. default false
}
```

### How to update settings

There are several ways to update the ECP settings:

* Through the `updateSettings` method, documented below.
* At initialization, when rendering the chat, though the `render` method.
* In direct iFrame rendering only, you can specify the settings using the query string parameters of the iFrame source URL. **Note:** Not all settings are supported.

#### Update settings method

The `updateSettings` method exposed by the SDK lets you update the ECP configuration parameters (listed above):

<table><thead><tr><th width="168.4465408805031">Parameter</th><th width="194">Type</th><th>Description</th></tr></thead><tbody><tr><td>settings</td><td>Partial&#x3C;EcpSettings></td><td>Object containing the settings to update</td></tr></tbody></table>

```javascript
// Example
window.symphony.updateSettings({
  mode: 'dark',
  condensed: true,
  symphonyLogo: false,
  ...anyOtherSettingsObject 
});
```

## Custom themes

ECP comes with out-of-the-box support for Symphony's two color themes: Light and Dark.&#x20;

You can also specify a custom theme, in order to align with the design system of the parent page. An example demonstrating the use of color palette overrides can be found [here](https://github.com/SymphonyPlatformSolutions/ecp-examples/blob/master/SimpleExamples/src/index-theme.html).

**Note:** Theming is currently only supported in Focus mode.

To set a custom theme, use either the `render` method or use the `updateTheme` method defined below.

#### Update theme method

The `updateTheme` method exposed by the SDK lets you update the ECP theme.

<table><thead><tr><th width="168.4465408805031">Parameter</th><th width="194">Type</th><th>Description</th></tr></thead><tbody><tr><td>theme</td><td>IThemeColors</td><td>Object containing the theme to update</td></tr></tbody></table>

```javascript
//Example
window.symphony.updateTheme({
    primary: "#ff00dd",
    secondary: "#ac0202",
    accent: "#F7CA3B",
    success: "#2EAA35",
    error: "#DE342E",
    background: "#ffb8b8",
    surface: "#ffe0e0",
    text: "#000000",
    textPrimary: "#FFFFFF",
    textSecondary: "#FFFFFF",
    textAccent: "#17181B",
    textSuccess: "#FFFFFF",
    textError: "#FFFFFF",
});
```

**Theme object (IThemeColors**)

The list of available theme parameters is provided below.

**Note:** _Shades_ are completely optional; by default they will be interpolated from the main colors.

```javascript
export interface IThemeColors {
  // Application colors: 8 main colors
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  error: string;
  background: string;
  surface: string;
  mention: string;
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  textSuccess: string;
  textError: string;
  text: string;
  // Optional shades
  textShades?: ITextShades;
  textSurfaceShades?: ITextShades;
  primaryShades?: IColorShades;
  secondaryShades?: IColorShades;
  accentShades?: IColorShades;
  successShades?: IColorShades;
  errorShades?: IColorShades;
}

export interface ITextShades {
  '10': string;
  '20': string;
  '30': string;
  '40': string;
  '50': string;
  '60': string;
  '70': string;
  '80': string;
  '90': string;
}

export interface IColorShades {
  '10': string;
  '20': string;
  '30': string;
  '40': string;
  '60': string;
  '70': string;
  '80': string;
  '90': string;
}
```
