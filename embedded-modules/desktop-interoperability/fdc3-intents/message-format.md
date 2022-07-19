# Message format

### **Message structure**

The StartChat intent can take an optional message property, that will contain a preset message that the user can preview and send in the chat.

The message can be a single string for plain text or a rich text in markdown. It can also include entities such as mentions, cashtags, hashtags, or attachments (including images).

See below the definition of the message structure, in addition to an example of a formatted message.

```javascript
export const enum TextMimeTypeEnum {
  'text/plain',
  'text/markdown'
}

export const enum EntityTypeEnum {
  'fileAttachment',
  'fdc3Intent'
}

export interface FileAttachmentEntity {
  type: EntityTypeEnum.fileAttachment;
  data: {
    name: string;
    dataUri: string; // Base64 encoded file - 'data:image/png;base64,{BASE64_DATA}';
  };
}

export interface FDC3IntentEntity {
  type: EntityTypeEnum.fdc3Intent;
  data: {
    title: string; // Text displayed on the button raising the intent
    intent: Intents; // Intent type (ViewChart, etc...)
    context: Context;
    app?: TargetApp;
  };
}

type Entity = FileAttachmentEntity | FDC3IntentEntity | SymphonyEntity;

export interface SharedMessage {
  text: Partial<Record<keyof typeof TextMimeTypeEnum, string>>;
  entities?: Record<string, Entity>;
}
```

{% tabs %}
{% tab title="Message with an image and an action button" %}
```json
 {
  "type": "fdc3.chat.initSettings",
  "message": {
    "text": {
      "text/markdown": "Hello @[Jane Doe](email/jane.doe@example.com), can you see the image and chart attached? Could it affect the price of $AAPL? *italics* **bold**"
    },
    "entities": {
      "0": {
        "type": 0,
        "data": {
          "name": "myImage.png",
          "dataUri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
        }
      },
      "1": {
        "type": "EntityTypeEnum.fdc3Intent",
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
