# Images

## Tags

MessageML supports the following tags to embed media into messages:

| Tags               | Description                                                                                                                                                                                               | Attributes                                         |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `<img src="url"/>` | Image. Images have a max height of 256px; otherwise, the default size is the size of the image. For more information on how to send images through API call, refer to [Sending images](broken-reference). | <p>• <code>src</code> <br>• <code>class</code></p> |

## Rules and Limitations via an example

For the following examples, we are sending an SVG image along with the message.

Note that an admin user might have to enable the sending of some specific file types. To do that, go to _AC Portal >> Company Settings >> Edit Entitlements >> File Types_.

• Sending an image via the [Create Message](https://rest-api.symphony.com/v1.54/reference#create-message-v4) API using the image URL

```markup
$ curl -X POST https://yourpod.com/agent/v4/stream/:sid/message/create \
-H 'content-type: multipart/form-data' \
-H 'keyManagerToken: 01008e3fc538...5d82870985576' \
-H 'sessionToken: eyJhbGciOiJSU...6YmlWyim0peFkMA' \
-F 'message=<messageML>Sending attachment via API<img src="https://yourimg.com/test/myimage.svg"></img></messageML>'
```

Sending an image via [Create Message](https://rest-api.symphony.com/v1.54/reference#create-message-v4) API using Data URL (base64 encoding).\
Note that it is necessary to include `data:image/imageType+xml;base64` before the data string, as shown in the following example:

```markup
$ curl -X POST https://yourpod.com/agent/v4/stream/:sid/message/create \
-H 'content-type: multipart/form-data' \
-H 'keyManagerToken: 01008e3fc538...5d82870985576' \
-H 'sessionToken: eyJhbGciOiJSU...6YmlWyim0peFkMA' \
-F 'message=<messageML>Sending attachment via API<img src="data:image/svg+xml;base64,PHN2ZyBpZD0i...DcuMjcsMTYuN="></img></messageML>'
```

{% hint style="warning" %}
### Limit on Image size for Data URL (base64)

This feature is intended to be used for small images, such as custom emoji. Our recommendation is that the total size of base64 encoded embedded images do not exceed 25KB per message.
{% endhint %}
