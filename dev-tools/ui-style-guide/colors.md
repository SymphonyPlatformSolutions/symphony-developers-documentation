# Colors

## Theme Colors

Symphony Messaging supports a large variety of color themes, to ensure that your applications always feel familiar to users, you should use the following colors:

| Color                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tempo-text-color--normal`      | <p>Normal text color.</p><p>This color depends on the user’s theme settings.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `tempo-text-color--secondary`   | <p>Secondary text color. Often for less important information.</p><p>This color depends on the user’s theme settings.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `tempo-ui--background`          | <p>Background color for the user’s Symphony Messaging web clients, and your application. Can be particularly useful when doing overlays and wanting to match the background color of the app.</p><p>Dark or light depending on the users theme settings.</p><p>By default, we recommend that iframe based applications and renderers backgrounds are transparent. The background of conversations change in color depending on what the user is focused on, and that change of state will then be visible by default.</p><p>This color depends on the users theme settings.</p> |
| `tempo-bg-color--theme-primary` | <p>This is typically the color of the uses navigation, and can create a dynamic looking UI as it changes to the users preference.</p><p>This color depends on the user’s theme settings.</p>                                                                                                                                                                                                                                                                                                                                                                                    |
| `tempo-bg-color--theme-accent`  | <p>This is generally a complimentary color of the users primary theme color, and can create a dynamic looking UI as it changes to the users preference.</p><p>This color depends on the user’s theme settings.</p>                                                                                                                                                                                                                                                                                                                                                              |

## Advanced theme colors

For more advanced visual elements, you need to also use the relevant theme-specific colors below:

| Color                             | Description                                                                                                                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tempo-text-color--link`          | <p>Link color for text.</p><p>This will be applied automatically when using a tags with an <code>href</code> attribute.</p>                                                                 |
| `tempo-text-color--placeholder`   | <p>Placeholder text color is used for placeholders in input fields, and similar suggestions.</p><p>This color depends on the user’s theme settings.</p>                                     |
| `tempo-text-color--disabled`      | <p>Disabled color text is used for elements that are not clickable or applicable at the time of viewing such as disabled URLs.</p><p>This color depends on the user’s theme settings.</p>   |
| `tempo-text-color--theme-primary` | <p>This text color matches the user’s background color of their navigation.</p><p>This color depends on the user’s theme settings.</p>                                                      |
| `tempo-text-color--theme-accent`  | <p>This text color matches the users accent color, which is generally a complimentary color to the user’s navigation background.</p><p>This color depends on the user’s theme settings.</p> |
| `tempo-ui--layout`                | <p>The opposite of the background color. In a dark theme, it will be white. In a light theme, it will be black.</p><p>This color depends on the user’s theme settings.</p>                  |
| `tempo-text-color--external`      | Color to reflect that this text applies to data outside of your organization. See note below.                                                                                               |
| `tempo-bg-color--external`        | Color to reflect that this text applies to data outside of your organization. See note below.                                                                                               |

## Constant Colors

If you do need to use specific colors, the color styles below are constant and not theme-specific:

| Color                      | Description                                                                                     |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| `tempo-text-color--white`  | Constant white text color.                                                                      |
| `tempo-text-color--black`  | Constant black text color.                                                                      |
| `tempo-text-color--red`    | Constant red text color.                                                                        |
| `tempo-text-color--green`  | Constant green text color.                                                                      |
| `tempo-text-color--blue`   | Constant blue text color.                                                                       |
| `tempo-text-color--yellow` | Constant yellow text color.                                                                     |
| `tempo-text-color--cyan`   | Constant cyan text color.                                                                       |
| `tempo-text-color--purple` | Constant purple text color.                                                                     |
| `tempo-text-color--orange` | Constant orange text color. See note below on how to use with `tempo-text-color--external`.     |
| `tempo-bg-color--white`    | Constant white background color.                                                                |
| `tempo-bg-color--black`    | Constant black background color.                                                                |
| `tempo-bg-color--red`      | Constant red background color.                                                                  |
| `tempo-bg-color--green`    | Constant green background color.                                                                |
| `tempo-bg-color--blue`     | Constant blue background color.                                                                 |
| `tempo-bg-color--yellow`   | Constant yellow background color.                                                               |
| `tempo-bg-color--cyan`     | Constant cyan background color.                                                                 |
| `tempo-bg-color--purple`   | Constant purple background color.                                                               |
| `tempo-bg-color--orange`   | Constant orange background color. See note below on how to use with `tempo-bg-color--external`. |

{% hint style="info" %}
Note: `tempo-text-color--orange` and `tempo-bg-color--orange` should be used with caution. The color orange is primarily used to represent conversations and people that are external to your company. If you plan on representing external chat rooms, users, or companies, we recommend that you use `tempo-bg-color--external` and `tempo-text-color--external`.
{% endhint %}
