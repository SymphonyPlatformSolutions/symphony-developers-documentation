# Message format

### **Message structure**

The StartChat intent can take an optional message property, that will contain a preset message that the user can preview and send in the chat.

The message can be a single string for plain text or a rich text in markdown. It can also include entities such as mentions, cashtags, hashtags, or attachments (including images).

See below few examples of messages showing how messages are structured.

{% hint style="info" %}
**Note**: The formal definition of the supported format will be specified in the fdc3 standard shortly. Small breaking changes may still be introduced.
{% endhint %}

{% tabs %}
{% tab title="Mentions and tags" %}
```json
{
  "type": "fdc3.chat.initSettings",
  "message": {
    "text": {
      "text/markdown": "Example of a cashtag $AAPL, a hastag #fdc3  and a mention @[Jane Doe](email/jane.doe@example.com) !"
    }
  },
  "members": {
      "type": "fdc3.contactList",
      "contacts": [
        {
          "type": "fdc3.contact",
          "id": {
              "email": "jane.doe@example.com"
          }
        }
      ]
  }
}
```
{% endtab %}

{% tab title="Image and an action button" %}
```json
 {
  "type": "fdc3.chat.initSettings",
  "message": {
    "text": {
      "text/markdown": "Hello @[Jane Doe](email/jane.doe@example.com), can you see the image and chart attached? Could it affect the price of $AAPL? *italics* **bold**"
    },
    "entities": {
      "0": {
        "type": 0, // type 0 for attachments
        "data": {
          "name": "myImage.png",
          "dataUri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
        }
      },
      "1": {
        "type": 2, // type 2 for fdc3 action buttons
        "data": {
          "title": "Click to view Chart",
          "intent": "ViewChart",
          "context": {
            "type": "fdc3.chart",
            "instruments": [
              {
                "type": "fdc3.instrument",
                "id": {
                  "ticker": "EURUSD"
                }
              }
            ],
            "range": {
              "type": "fdc3.dateRange",
              "starttime": "2020-09-01T08:00:00.000Z",
              "endtime": "2020-10-31T08:00:00.000Z"
            },
            "style": "candle"
          }
        }
      }
    }
  },
  "members": {
    "type": "fdc3.contactList",
    "contacts": [
      {
        "type": "fdc3.contact",
        "id": {
          "email": "jane.doe@example.com"
        }
      }
    ]
  }
}
```
{% endtab %}
{% endtabs %}
