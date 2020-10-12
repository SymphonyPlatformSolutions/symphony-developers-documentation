# UI Toolkit

## Summary

* [Prerequisites](ui-toolkit.md#prerequisites)
* [Installation](ui-toolkit.md#installation)
* [Usage](ui-toolkit.md#usage)
* [Peer Dependencies](ui-toolkit.md#peer-dependencies)
* [Next Steps](ui-toolkit.md#next-steps)

## Description

The UI Toolkit is a library of react components that helps you build complex frontend applications quickly. The library contains layout guides, forms, input fields, complex financial charts, and is already compatible with Symphony's UI theme.

## Prerequisites

* Node
* Yarn
* Git

## Installation

1. To gain access to the UI Toolkit, navigate to the dedicated Github repository: [https://github.com/SymphonyPlatformSolutions/symphony-bdk-ui-toolkit](https://github.com/SymphonyPlatformSolutions/symphony-bdk-ui-toolkit)
2. Clone the repository locally:

```text
$ git clone https://github.com/SymphonyPlatformSolutions/symphony-bdk-ui-toolkit.git
```

1. To access a live version of this library, run the following from inside your project:

```text
$ yarn storybook
```

This will launch a live version of the UI Toolkit library reference in your default browser. In the left hand side of the storybook view, navigate to the 'Components' section for a detailed reference of the components themselves.

## Usage

To use the library in your extension application:

```text
$ npm install symphony-bdk-ui-toolkit
```

{% hint style="info" %}
Note: This is automatically installed when generating applications using the BDK CLI tool.
{% endhint %}

Import the components you want to use:

```text
$ import { Box , Text, Button } from 'symphony-bdk-ui-toolkit';
```

## Peer Dependencies

There's a few components that require a peer dependency installation, that means that although these components uses such dependency, it expects that it will be installed on your project, **rather** than packaged and shipped with this toolkit. Here's the complete list of peer dependencies:

```text
{
    "peerDependencies": {
        "axios": "^0.19.0",
        "d3-scale": "^3.2.1",
        "d3-shape": "^1.3.7",
        "d3-time": "^1.1.0",
        "d3-time-format": "^2.2.2",
        "prop-types": "^15.7.2",
        "react": "^16.12.0",
        "react-dom": "^16.12.0",
        "react-stockcharts": "^0.7.8",
        "styled-components": "^4.4.1"
  }
}
```

## Next Steps

For an step by step tutorial on how to leverage the UI Toolkit to create complex frontend applications, continue here:

{% page-ref page="../../../building-extension-applications-on-symphony/tutorials/building-an-extension-app-with-ui-toolkit.md" %}

