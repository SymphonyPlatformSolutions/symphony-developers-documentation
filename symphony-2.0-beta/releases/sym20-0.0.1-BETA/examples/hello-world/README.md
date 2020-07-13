# Hello World example extension

This is a simple extension that demonstrates how to build and run an extension.
The example creates an overlay view to chats in which simply adds a react component that prints "Hello World!". The overlay docks in different places in the chat by clicking it. 

## Production

### Build

To build the extension, run:

```bash
$ npm install
$ npm run build
```

The result will be a `.tgz` file that can be deployed

### Deployment

The resulting `.tgz` file contains an `install-extension.sh` script that should be used to deploy the extension
to an AWS S3 bucket.

## Development

### Start extension

The webpack dev server is used to rebuild the extension when any file changes, and to serve the extension over HTTPS.

To start the dev server, run:

```bash
$ npm install
$ npm run watch
```

This will start a web server that listens on port `9030`, on the domain `local-dev.symphony.com`.

### Update Your /etc/hosts file

Add the following lines to your `/etc/hosts` file (`/etc/hosts` in Mac/Unix or `system32/drivers/etc/hosts` in Windows):

``
127.0.0.1 local-dev.symphony.com
``

### Install certificate

You need to install a certificate to be able to access `local-dev.symphony.com`.
This is a self signed certificate that you need to add as a trusted certificate to have the browser accept it.
The certificate can be found in `node_modules/@mana/extenion-lib/dev-certs/`.

#### On Mac

 - Open KeyChain Access
 - Import `node_modules/@mana/extenion-lib/dev-certs/local-dev.symphony.com.crt` to the login keychain
 - Double click the certificate
 - Expand the 'Trust' section
 - Choose 'Always Trust'

#### In Ubuntu
 - Install `certutil`: `sudo apt-get install libnss3-tools`
 - Find the dev certs: `cd node_modules/@mana/extenion-lib/dev-certs/`
 - Install local-dev: `certutil -d sql:$HOME/.pki/nssdb -A -t "P,," -n local-dev.symphony.com.crt -i local-dev.symphony.com.crt`
 - Check that it worked: `certutil -d sql:$HOME/.pki/nssdb -L`

### Start the client BFF

TODO: this section needs to be changed before releasing to 3rd parties, since they will not be able to run client-bff locally.

The [client-bff](https://github.com/SymphonyOSF/client-bff) needs to be run with an argument that installs the extension.

```bash
$ ./mvnw spring-boot:run -Dspring-boot.run.profiles='st2'  -Dspring-boot.run.arguments='--client-bff.extensions[0]=https://local-dev.symphony.com:9030/manifest.json'
```
