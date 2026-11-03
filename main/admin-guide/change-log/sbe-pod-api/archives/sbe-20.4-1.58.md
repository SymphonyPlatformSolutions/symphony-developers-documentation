---
description: >-
  This page describes the features introduced on pod endpoints in SBE 20.4
  (1.58)
---

# SBE - 20.4 (1.58)

## SBE API changes

### **New APIs**

No SBE API endpoint was created in Symphony version 20.4.

### **Updated APIs**

* [Users Lookup v3](https://developers.symphony.com/restapi/reference#users-lookup-v3):
  * New field added: the `department` field has been added to the API response.
  * Behavior change: now, the endpoint returns the`department` and the `location` fields only if the user is an internal user of the current pod.

### **Deprecated APIs**

No SBE API endpoint was deprecated in Symphony version 20.4.
