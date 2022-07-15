# CLI Tool

{% hint style="danger" %}
Note: Symphony engineering has announced the End of Life (EOL) and support for our Java, Python and Node.js SDKs and Java BDK 1.0 BDK 1.0 (including CLI Tool & UI Toolkit) from March 2022.  Whilst limited support is still available for the .NET SDK.

\
We recommend you check out the latest version of the  Bot SDK (BDK 2.0) that comes with best practices, intelligent API bindings, and simplified authentication/configuration:

* [BDK 2.0 for Java](../)
{% endhint %}

The CLI tool allows you to generate code scaffolds for building Symphony bots and extension applications. The generated code scaffolds provide sample implementations of best practices making it easy and fast to start building bots and applications. In addition, the CLI tool allows developers to add custom command handlers and message templates, and manage project dependencies, allowing developers to bootstrap bots and applications quickly.

## Prerequisites

* Node
* Yarn
* Java 8
* Maven 3
* Git

### Install Yarn:

```
$ npm i -g yarn
```

### Install the BDK

```
$ npm i -g symphony-bdk-cli
```

### Confirm all the dependencies are met:

```
$ symphony-bdk-cli --check-dependencies
```

```
$ symphony-bdk-cli


               ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄               
           ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄           
          ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄          
         ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄         
         ▄▄▄▄▄▄▄▄              ▄▄▄▄▄▄▄▄         
         ▄▄▄▄▄▄▄▄              ▄▄▄▄▄▄▄▄         
         ▄▄▄▄▄▄▄▄▄              ▄▄▄▄▄▄▄         
         ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄                       
         ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄                 
             ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄          
                     ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄         
         ▄▄▄               ▄▄▄▄▄▄▄▄▄▄▄▄         
         ▄▄▄▄▄▄▄▄              ▄▄▄▄▄▄▄▄         
         ▄▄▄▄▄▄▄▄              ▄▄▄▄▄▄▄▄         
          ▄▄▄▄▄▄▄              ▄▄▄▄▄▄▄          
          ▄▄▄▄▄▄▄▄▄▄▄      ▄▄▄▄▄▄▄▄▄▄▄          
           ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄           
             ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄             
                 ▄▄▄▄▄▄▄▄▄▄▄▄▄▄                 
                     ▄▄▄▄▄▄                     



✔ All Dependencies are met!
Usage: symphony-bdk-cli [options]

This tool helps to generate bots and extension apps as well as the proper RSA files used by a symphony 
bot account 

Options:
  -V, --version   output the version number
  --app [action]  Creates an extension app boilerplate, add "message-template" as an argument, to add a new message template (default: false)
  --bot [action]  Creates a Symphony bot application, add "command-handler" as an argument to add a new Command to your bot or "message-template" to add a template (default: false)
  --toolkit       Launches the ui-toolkit library on http://localhost:6006 (default: false)
  --run           Starts the newly created project when used with --app and --bot  (default: false)
  --gen-certs     Generates the RSA key pair and outputs a valid JWT token for immediate testing (default: false)
  --check-deps    Checks if the system has all the required dependencies to run the project (default: false)
  -h, --help      output usage information
```

For more information continue to the designated Github repository [here](https://github.com/SymphonyPlatformSolutions/symphony-bdk-cli).
