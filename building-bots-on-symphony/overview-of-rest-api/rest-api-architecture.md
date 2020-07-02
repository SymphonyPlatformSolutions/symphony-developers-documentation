---
description: Overview of Symphony REST API Architecture
---

# REST API Architecture

As stated before, Symphony's REST API is spread out over Symphony's three main components: the Pod, Agent Server, and Key Manager.  

## On-Premise Deployment

For our larger customers, the Agent server and Key Manager components are deployed on premise, whereas the Pod is always deployed in the cloud.  Your Bot or REST API caller, is an application that can be deployed on-premise or in the cloud.  

An visual representation showing an on-premise deployment of Symphony components is shown below:  

![](../../.gitbook/assets/screen-shot-2020-07-02-at-4.25.55-pm.png)

## In-Cloud Deployment

For some of our smaller customers, the Agent server and Key Manager may be deployed alongside the Pod in the cloud.  Your Bot or REST API caller, is an application that can be deployed on-premise or in the cloud.

A visual representation showing an in-cloud deployment of Symphony components is shown below:    

![](../../.gitbook/assets/screen-shot-2020-07-02-at-4.40.33-pm.png)

## Interacting with the Components:

Symphony Bots can interface with each of these three components via the REST API.  Symphony's REST API is spread out across these three components.  

![](../../.gitbook/assets/screen-shot-2020-07-02-at-4.32.58-pm%20%281%29.png)



