# CLI Tool

## CLI Tool Installation + Usage Guide

### Prerequisites

* Node
* Yarn
* Java 8
* Maven 3
* Git

#### Install Yarn:

```text
$ npm i -g yarn
```

#### Install the BDK

```text
$ npm i -g symphony-bdk-cli
```

#### Confirm all the dependencies are met:

```text
$ symphony-bdk-cli --check-dependencies
```

```text
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

