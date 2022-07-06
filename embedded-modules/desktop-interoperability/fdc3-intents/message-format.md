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

```javascript
 Example of rich message containing a file (image here) and an fdc3 intent 
 const message: Message = {
   text: {
     'text/markdown': 'Hello @[Yannick Malins](id/723947329), can you see the image and chart attached? Could it affect the price of $AAPL? *italics* **bold**'
   },
   entities: {
     '0': {
       type: EntityTypeEnum.fileAttachment,
       data: {
         name: 'myImage.png',
         dataUri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEU...'
       }
     },
     '1': {
       type: EntityTypeEnum.fdc3Intent,
       data: {
         title: 'Click to view Chart',
         intent: 'ViewChart',
         context: {
           type: 'fdc3.chart',
           instruments: [
             {
               type: 'fdc3.instrument',
               id: {
                 ticker: 'EURUSD'
               }
             }
           ],
           range: {
             type: 'fdc3.dateRange',
             starttime: '2020-09-01T08:00:00.000Z',
             endtime: '2020-10-31T08:00:00.000Z'
           },
           style: 'candle'
         }
       }
     }
   }
}
```
