---
description: >-
  This page describes the features introduced on pod endpoints in SBE 20.7
  (1.61)
---

# SBE - 20.7 (1.61)

## SBE API changes

### **New APIs**

The following API endpoint has been created:

* [Suspend User Account](https://developers.symphony.com/restapi/v20.7/reference#suspend-user-v1)

### **Updated APIs**

The following API endpoints were updated:

* [Stream Info](https://developers.symphony.com/restapi/reference#stream-info-v2) is now OBO enabled
* The behaviour of two endpoints has been changed. In order to avoid a breaking change, we have implemented a pod setting which will allow an admin user to activate this new behaviour. For more information, please contact your Technical Account Manager, Solutions Architect or the Technical Support Team.
  * [Update Application Entitlements](https://developers.symphony.com/restapi/v20.7/reference#update-application-entitlements): override user specific settings when global settings are updated for a given pod and a given application.
  * [Update User Apps](https://developers.symphony.com/restapi/v20.7/reference#update-user-apps) now allows partial updates.

### **Deprecated APIs**

No SBE API endpoint was deprecated in Symphony version 20.7.
