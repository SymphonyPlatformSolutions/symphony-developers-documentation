# @mana/core-doc
 
This package is part of the Symphony 2.0 Client Extension API.
 
(c) 2020 Symphony Communication Services, LLC. All rights reserved.
 
Please visit https://developer.symphony.com for more information.
 
# Symphony 2.0 Extension API Documentation (BETA)
 
 
 
 
 
## Overview of Symphony 2.0 Client Extensions
 
The Symphony 2.0 Client Extension API gives the Symphony customer the possibility to write custom extensions to the client. The APIs consists of a set of TypeScrpt npm packages that opens up functionality within the client.

Using the Symphony 2.0 Client Extension API (BETA), the developers can:

* Create a custom overlay view to each chat
* List Conversation(s) of which the user is a member
* Create new Conversations
* Update Conversations (e.g. adding/removing members or change settings to a Room)
* Get the members of a Conversation
* Change ownership setting for the Conversation
* Request to join a Conversation, approval of joins


There are some key concepts for writing Symphony 2.0 Extensions:
 
* Stores - a Store is an abstraction that serves the client with incoming and outgoing data. There are several Stores in which the Conversation Store is one of them. The Conversation Store specifically handles attributes and memberships related to Chat Rooms or Instant Messages channels. For example, if you need to add a member to a room, the Conversation API would be where you would do that.
* UI Extension points - the Symphony 2.0 Client handles a set of different UI components that composes the entire UI. These are known as UI Extension points when made accessible to the Extension API. The UI Extension Points uses React components as a means of expansion.
 
 
### Prerequisites
 
 Before starting using the Symphony 2.0 Client Extension API, make sure you have the following:

 * XYZ

## What's New?
 
Initial Symphony 2.0 Extensions API contains of the following packages:
 
* @mana/core ([README.md](../core/README.md))
* @mana/core-ui ([README.md](../core-ui/README.md))
* @mana/core-conversations ([README.md](../core-conversations/README.md))
* @mana/core-chat ([README.md](../core-chat/README.md))
 
## Symphony 2.0 API Reference (BETA)
 
API documentation for this package can be found [here](doc/index.md)

 
## Getting Started/Sample Code

The Symphony 2.0 Extension API is written in TypeScript.
The easiest way to get started is to use the example provided in the sample code referenced below. The package. json specifies the dependencies you need and sets up the example.
 
Sample code for building a hello_world example can be found [here](../../client/extensionLib/examples/hello-world/README.md)
 
## Disclaimer
The documentation, APIs and behavior of Symphony 2.0 Extension API is currently under development and might be subject to changes. No backwards compatibility is in any way guaranteed.
 

