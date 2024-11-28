# Extension API Services

The Client Extension API uses services for communication between your application and the Symphony client. The Client Extension API provides a set of services that your application can leverage to extend the Symphony Client and to create custom workflows and experiences.

## Client Extension API Services:

The Client Extensions API provides the following remote services:

### **Modules Service**

Use the `modules` service to create application-specific module&#x73;**:**

{% content-ref url="modules-service.md" %}
[modules-service.md](modules-service.md)
{% endcontent-ref %}

### **Applications-Nav Service**

The Applications navigation section is found at the bottom of the left-hand sidebar of the Symphony client workspace. Use the `applications-nav` service to create a navigation item for your applicatio&#x6E;**:**

{% content-ref url="applications-nav-service.md" %}
[applications-nav-service.md](applications-nav-service.md)
{% endcontent-ref %}

### **UI Service**

Use the `ui` service to extend various parts of the Symphony client user interface. For example, add buttons on IM, MIM, and chatroom modules or add links to the **#**&#x68;ashtag and $cashtag hovercards:

{% content-ref url="ui-service/" %}
[ui-service](ui-service/)
{% endcontent-ref %}

### **Share Service**

Use the `share` service to allow users to share content from your application into Symphony conversation&#x73;**:**

{% content-ref url="share-service.md" %}
[share-service.md](share-service.md)
{% endcontent-ref %}

### **Entity Service**

Use the `entity` service to allow your app to render a Structured Object within a within a message sent by the REST API:

{% content-ref url="entity-service/" %}
[entity-service](entity-service/)
{% endcontent-ref %}

### **Commerce Service**

Apps can offer premium functionality through licensed subscriptions. Use the `commerce` service to identify the products (premium versions) to which a user is subscribe&#x64;**:**

{% content-ref url="commerce-service.md" %}
[commerce-service.md](commerce-service.md)
{% endcontent-ref %}

### **Dialogs Service**

Use the `dialogs` service to create modal windows (e.g. to open a modal window from a button registered at a room level)**:**

{% content-ref url="dialogs-service.md" %}
[dialogs-service.md](dialogs-service.md)
{% endcontent-ref %}

## Service Interface

Both the Client Extensions API services and your application services use the same interface. Continue here to learn how to implement the Service interface methods:

{% content-ref url="service-interface.md" %}
[service-interface.md](service-interface.md)
{% endcontent-ref %}
