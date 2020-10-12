# Extension API Services

The Client Extension API uses services for communication between your application and the Symphony client. The Client Extension API provides a set of services that your application can leverage to extend the Symphony Client and to create custom workflows and experiences.  

## Client Extension API Services:

The Client Extensions API provides the following remote services:

### **Modules Service**

Use the `modules` service to create application-specific modules**:**

{% page-ref page="modules-service.md" %}

### **Applications-Nav Service**

The Applications navigation section is found at the bottom of the left-hand sidebar of the Symphony client workspace. Use the `applications-nav` service to create a navigation item for your application**:**

{% page-ref page="applications-nav-service.md" %}

### **UI Service**

Use the `ui` service to extend various parts of the Symphony client user interface. For example, add buttons on IM, MIM, and chatroom modules or add links to the **\#**hashtag and $cashtag hovercards:

{% page-ref page="ui-service/" %}

### **Share Service**

Use the `share` service to allow users to share content from your application into Symphony conversations**:**

{% page-ref page="share-service.md" %}

### **Entity Service**

Use the `entity` service to allow your app to render a Structured Object within a within a message sent by the REST API:

{% page-ref page="entity-service/" %}

### **Commerce Service**

Apps can offer premium functionality through licensed subscriptions. Use the `commerce` service to identify the products \(premium versions\) to which a user is subscribed**:**

{% page-ref page="commerce-service.md" %}

### **Dialogs Service** 

Use the `dialogs` service to create modal windows \(e.g. to open a modal window from a button registered at a room level\)**:**

{% page-ref page="dialogs-service.md" %}

## Service Interface

Both the Client Extensions API services and your application services use the same interface. Continue here to learn how to implement the Service interface methods:

{% page-ref page="service-interface.md" %}

