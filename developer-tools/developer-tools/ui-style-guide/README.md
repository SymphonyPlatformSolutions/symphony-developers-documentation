# UI Style Guide

This document outlines the resources and capabilities of the Symphony Platform that are available to you to shape the user interface of your application.

Symphony's design library, Tempo UI, encompasses Symphony's unique theming, performance considerations, and more.

For more information on how to build an extension app, refer to our section on [Extension Applications](../../../building-extension-applications-on-symphony/building-extension-applications-on-symphony.md).

## Overview

Symphony uses a standard style sheet for all external apps. Link to the compiled CSS file using the code shown below:

```markup
<link rel="stylesheet" type="text/css" href="https://cdn.symphony.com/resources/api/v2.1/styles/symphony-external-app.css" />
```

All CSS classes have a prefix of `tempo-` to ensure that styles aren’t overwritten by other libraries. This example shows two styles:

```markup
.tempo-text-color--white{}
.tempo-btn--primary{}
```

This example shows how you can apply the styles:

```markup
<div>
  <label class="tempo-text-primary">
    Anjana Dasu
  </label>
  <span class="tempo-text-secondary">
    Product Manager at Symphony
  </span>
  <div class="tempo-btn tempo-btn--primary">
    Connect
  </div>
</div>
```

This image shows the result of the above code example:

![](../../../.gitbook/assets/85c0431-screen\_shot\_2017-06-06\_at\_3.22.38\_pm.png)

## Personalization

Users of Symphony can personalize their user interface by choosing between a variety of modes (day/night), contrast level, and font sizes.

To make your application respect the user’s font, add one of the font classes to the `<html>` tag of your application:

* xsmall
* small
* medium
* large

Text elements will react to these font sizes by default, unless you specify custom font sizes. Use `rem` as your font size unit for custom font sizes. Generally, regular text is `1rem`.

To make your application respect the user’s mode, add one of the theme classes to the `<body>` tag of your application:

* dark
* light

You should leave the background color of your application as transparent to inherent all the application states from Symphony (for example, by doing this, if the user focuses your application, the background color will be changed, depending on the user's theme).

The user’s preferences are returned in the Extension API theme object.

## Typography

Symphony uses a modified version of font named _Lato_, which is an open source font hosted by Google. Because we have modified _Lato_ to include a specific set of glyphs for fractions commonly used by our customers, our stylesheet includes a modified version called _SymphonyLato_ that is hosted by Symphony. This font is automatically applied to your body tag when you include the stylesheet.
