# OBO Authentication



The BDK 2.0 also supports OBO \(On-Behalf-Of\) pattern of authentication, allowing an authenticated bot + extension application to perform operations on behalf of a given user.  The BDK's implementation makes it easy to perform the following operations on behalf of a given user:

* List the streams of a given user
* Initiate connection requests to and determine connection status with other users
* Get the presence state of other connected users
* Initiate IMs and MIMs with other users
* Send messages and attachments
* Set the context user's own presence

To leverage an OBO based workflow, simply instantiate an OBO Session in your Bot project.  The BDK 2.0 allows you to instantiate your OBO session from a username or user ID.  Once authenticated bots can perform any of the OBO workflows listed above:

```java
 // setup SymphonyBdk facade object
 final SymphonyBdk bdk = new SymphonyBdk(loadFromSymphonyDir("config.yaml"));
 
 //authenticate on-behalf-of a given user
 final AuthSession oboSessionUsername = bdk.obo("user.name");
 final AuthSession oboSessionUserId = bdk.obo(123456789L);
 
 // list streams OBO user "user.name"
 bdk.streams().listStreams(oboSessionUsername, new StreamFilter());
```

## 

