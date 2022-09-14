# Interactive templates



You can now configure, with the support of your TAM, structured objects to use interactive WhatsApp message templates, which allow you to deliver more information without being restricted by the 24-hour window.&#x20;

The current list includes:

* Messages containing quick reply buttons, where clicking the button sends into the room a reply  **** that the bot is able to read in order to take further action if required.
* Messages containing preview images that act as links to publicly accessible PDF documents, or as attachments that WhatsApp users can download on their device.
* Messages including in the body hyperlinks that redirect the user to an existing WhatsApp Connect chat room (given the customer provides the room information into the JSON structured object). &#x20;

The Agent API (see [https://developers.symphony.com/restapi/reference/create-message-v4](https://developers.symphony.com/restapi/reference/create-message-v4)) is used to send a message in an existing stream which accepts messageML and JSON data formats.

**JSON data** sent in a message can be interpreted in the aim to tell the Agent to display an interactive template on WhatsApp through the WhatsApp gateway.

<figure><img src="broken-reference" alt=""><figcaption><p>Example of the agent API call</p></figcaption></figure>

### Prerequisites <a href="#format-of-the-json-call-to-the-agent" id="format-of-the-json-call-to-the-agent"></a>

Interactive templates need to be created with type="marketing" and approved in Facebook.

### JSON data format used as an input of the Agent API call for interactive templates <a href="#format-of-the-json-call-to-the-agent" id="format-of-the-json-call-to-the-agent"></a>

A WhatsApp template payload is divided into 4 parts:

* A **header** found at the top of the template (optional)**.**
* A **body** that comes after the header and contains the content of the template.
* A **footer** that is at the bottom of the template (optional).
* Any **button** (optional).

These 4 parts correspond to the user interface that is used to define a template in WhatsApp Manager.

<figure><img src="broken-reference" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
These components can be customized using parameters.
{% endhint %}

#### Format to send to the Agent to display the template

```json
{
   "type": "send_template", // call to the send_template action
   "payload": {
      "template_name": "welcome_terms_conditions_v3",// name of the template to call
      "header": {}, // variable to send to the header (only one is accepted)
      "body": [], // variables to send to the body
      "buttons": [] // buttons to display
   }
}
```

{% hint style="info" %}
The template name is case-sensitive.
{% endhint %}

We can use the data object above to ask customers to provide all the information we need to send the template:

* Template name
* Parameters in the header (optional)
* Parameters in the body (optional)
* Buttons (optional)

Unlike the body and the header, the footer does not contain any parameters, only static data.

The **type** field allows to define the action targeted by the JSON message. In the ‘**send\_template’** case, the WhatsApp gateway interprets all the information from the payload object, and then sends the related template on WhatsApp.

### Header format

The header property value is a JSON object which contains either the text value of a variable, or a link to a file.

#### Example 1: Text

<figure><img src="broken-reference" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
WhatsApp Manager only supports 1 variable in the header text.
{% endhint %}

```json
"header": {
   "type": "TEXT",
   "text": "<value>" // replaces {{1}} in the screenshot above
}
```

#### Example 2: Redirection parameter

<figure><img src="broken-reference" alt=""><figcaption></figcaption></figure>

```json
"header": {
   "type": "REDIRECT",
   "streamId": "<streamId where the link should be redirected>"
   "text": "<text that replaces the link>" // optional property displayed instead of the link
                     // if the link couldn't be computed
}
```

In the example above:

* If the streamId matches the right room, the template will be displayed as below (the wa.me URL is built from the streamId):&#x20;

`Click on the link to contact your advisor:`` `<mark style="color:blue;">`https://wa.me/1XXXXXXXXXX`</mark>

* If the streamId is not correct, or does not match the right room, the template will be displayed as below:

`Click on the link to contact your advisor:`` `<mark style="color:blue;">`<text that replaces the link>`</mark>

#### Example 3: Send a template with a PDF file in the header

<figure><img src="broken-reference" alt=""><figcaption></figcaption></figure>

```json
"header": {
  "type": "DOCUMENT":
  "link": "<public link to the document>"
}
```

#### Example 4: Send a template with a PDF file in the header (and a file sent in the request body)

```json
"header": {
    "type": "DOCUMENT"
}
```

The document parameters can be one of the following three types: `IMAGE`, `VIDEO` or `DOCUMENT`.

{% hint style="info" %}
Currently, only the DOCUMENT type is supported.
{% endhint %}

{% hint style="info" %}
The link associated to the document must be publicly accessible.
{% endhint %}

* If the link of the document is present, the template will retrieve it, and then use a related PDF file found as an attachment field of the template message.
* If both a link and an attachment are present (the link of the document in the payload, and the attachment in the request body), the link will be used.
* If no link is present and there are multiple attachments in the request body, the first attachment in the template will be used.

<figure><img src="broken-reference" alt=""><figcaption><p>Example of agent API call</p></figcaption></figure>

In the example above, the backend checks if the `parameters` object contains the type `DOCUMENT`, and if the `attachment` field is pointing to a file link.

If the corresponding file is correctly retrieved, it will extract the data and the fileName in order to upload it directly on WhatsApp.

{% hint style="info" %}
When performing a file upload operation using a business API, the content type must be set to **application/pdf** in order for the message to be sent.&#x20;
{% endhint %}

### Body format

The body field is an array that can be either empty or contain a sub-object as JSON object.&#x20;

Each sub-object represents the text value of a variable declared in the related template.

The order of the sub-objects follows the order of the variables declaration in the template.

The sub-object must have a **type** attribute which supports two possible values: **TEXT** or **REDIRECT:**

* If the sub-object is **TEXT**, an additional attribute named **`text`** must be filled.
* If the sub-object is **REDIRECT**, the additional field named **`text`** is optional, unlike the field **`streamId`** which is mandatory.

#### Example of a body object

```json
"body": [
  {
    // {{1}}
    "type": "TEXT",
    "text": "<value as string variable1>"
  },
  {
    // {{2}}
    "type": "TEXT",
    "text": "<value as string variable2>"
  },
  {
    // you can have a look at the example described on header secgtion
    "type": "REDIRECT",
    "streamId": "<streamId where the link should be redirected>"
    "text": "<value>"
    // optional property displayed instead of the link,if the link couldn't be computed
  },
]
```

For example, you can have the template below:

<figure><img src="broken-reference" alt=""><figcaption></figcaption></figure>

With the following JSON data:&#x20;

```json
"body": [
  {
    // {{1}}
    "type": "TEXT",
    "text": "John"
  },
  {
    // {{2}}
    "type": "TEXT",
    "text": "Interactive templates"
  },
  {
    // {{2}}
    "type": "TEXT",
    "text": "June 22, 2022"
  }
]
```

### Footer format

Nothing needs to be provided in the JSON data, as the footer is static.

### Button format

The **JSON data** should only contain data for buttons using the **dynamic URL type**. For static URLs, the information is already present in the WhatsApp templates.

#### Dynamic URL

<figure><img src="broken-reference" alt=""><figcaption></figcaption></figure>

#### Static URL

<figure><img src="broken-reference" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
**Static URL** buttons and **QUICK\_REPLY** buttons do not require any parameter.
{% endhint %}

```json
"buttons": [
  {
    "type": "URL",
    "index": 0, // corresponds to the index of the buttons listed in the WhatsApp template
    "path": "<path of the URL>"
  }
]
```

{% hint style="warning" %}
**wa.me** URLs cannot be used in buttons.
{% endhint %}

#### **Example 1: Dynamic URL in first place**

<figure><img src="broken-reference" alt=""><figcaption></figcaption></figure>

Data needs to be provided for the first dynamic URL button ("index": 0):

```json
"buttons": [
  {
    "type": "URL",
    "index": 0, // corresponds to the index of the buttons listed in the WhatsApp template
    "path": "<path of the URL>" // replace {{1}} in the first button with the dynamic URL
  }
]
```

**Example 2: Dynamic URL in second place**

Data needs to be provided for the second dynamic URL button ("index": 1)

<figure><img src="broken-reference" alt=""><figcaption></figcaption></figure>

```json
"buttons": [
  {
    "type": "URL",
    "index": 1, // corresponds to the index of the second button
    "path": "<path of the URL>" // replace {{1}} in the second button with the dynamic URL
  }
]
```

{% hint style="info" %}
If the WhatsApp [guidelines for message templates](https://developers.facebook.com/docs/whatsapp/message-templates/guidelines/) are not followed, messages will not be sent.
{% endhint %}
