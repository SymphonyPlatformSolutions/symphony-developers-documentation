---
description: Good Practices Guide
---

# ECP Design and UX

This documentation outlines the recommended Design & UX best practices when leveraging ECP as a third-party developer.

### Essential use cases and workflows

ECP user experience (UX)  can be configured according to specific workflows. Different features and parameters can be activated or deactivated to suit your needs. For a complete list of available customizable features, see the [ECP Configuration parameters.](../configuration-parameters.md)

The responsibility of ensuring the best UX is engineered across platforms now resides with the team integrating Symphony’s ECP. A process map is a good way to visualize the steps that can be taken when navigating how to complete a specific task.

Consider producing a user journey map for a human-centered design approach. This helps the team better understand how a specific task is being completed by end users including the various steps involved, where any transfers of information between individuals and systems occur, how the platform fits into this user workflow, and more.

Journey mapping the user experience identifies product flows beneficial to each type of end user. Take a look at a couple of use cases below to see the different ways you can customize your ECP implementation to best fit your users’ experience.

#### Ticket management for incident and service request systems

ECP supports everything from basic chat to rich text editing of messages for communication between an incident reporter and a team of service agents. Beneficial ECP features to consider activating: file attachment, bookmark message, show room information and members.

#### Agent-issuer

Consider a bond issuer who communicates with many dealers for a deal at once, a one-to-many form of conversation where the use of a chat list in ECP allows for better management and alerting of responses.

Alternatively, the agent could only have a single conversation with the issuer, making the chat list extra screen clutter.

{% hint style="info" %}
Workflows and user interfaces may vary depending on enabled ECP features and components.
{% endhint %}

### Feature entitlements

Symphony admins can enable or disable specific platform functionality at a company- and user-level.

* Consider the ‘Ticket management for incident and service request systems’ example use case; this scenario requires that both the company and users are entitled to send attachments to internal and external  participants.
* In the ‘Agent-issuer bond platform’ example use case; this scenario requires the company and users to be entitled for external communications.
