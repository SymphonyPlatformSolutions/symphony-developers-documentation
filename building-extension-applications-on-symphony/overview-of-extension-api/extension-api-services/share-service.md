# Share Service

Use the `share` service to allow users to share content from your application into Symphony conversation:

```javascript
// To use the share service, you must subscribe to it from your application
var shareService = SYMPHONY.services.subscribe("share");
```

When the share function is invoked, a modal dialog is launched and populated with the shared object content (for example, the article options). The end user can then select conversations (IMs or chatrooms) into which to share the article.

Once the article is shared, it appears in the conversation view in a card format. The article will be linked either to a webpage (if the `href` option is provided) or deep linked into the app (if the `id` option is provided).

![](../../../.gitbook/assets/2584e4f-share-2.png)

In order to view article contents in an application (for example, if the article `id` is provided), the user must have the application installed.

If the recipient of a shared article does not have the application installed, the user will be prompted to install the application (provided that the user's enterprise has that application enabled).

If the recipient of a shared article does not have the application installed, and the application is not enabled for the user's enterprise, the user can view the content via the link (if `href` is provided). If a link is not provided, the user will be notified that the article cannot be viewed because the application is disabled for the enterprise.

The following methods are available on the `share` service:

## share()

Launches the "Share on Symphony" modal from your application, allowing the user to share content from your application into a Symphony conversation (IM or chatroom):

```javascript
function share(type, content, options)
```

| Parameter | Type   | Required | Description                                                                                                         |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| type      | String | Yes      | The type of content that is being shared.                                                                           |
| content   | Object | Yes      | An object that describes the content being shared. For a list of objects see [standard entities](broken-reference). |
| options   | Object | No       | An object that describes options that can be used to enhance the share service                                      |

The following JavaScript shows an example of an article being shared:

```javascript
// This code will live in your application view.

// Assume there is a button element with id "share" on the application module
// If that button is clicked, launch the Share modal.

var shareButton = document.getElementById("share");

var articleContent = {
  title: "Symphony Launches Mobile App",
  subTitle: "Application is mobile device management (MDM) compatible.",
  blurb: "Symphony Communication Services, a Palo Alto, Calif.-based messaging startup, announced its enterprise-ready mobile app for Apple iPhone is now available for download.",
  date : new Date("07 June 2016").getTime() / 1000,
  publisher: "Waters Technology",
  author: "Dan DeFrancesco",
  id: "symphony-article",
  thumbnail: 'https://symphony.com/example/image.png',
  href: 'https://symphony.com'
};

var shareOptions = {
  prepopulateUsers: ['71811853190920', '71811853190903']
};

// Launch Symphony's share modal when the Share button is clicked
shareButton.addEventListener("click", function(){
  shareService.share(
    "article",
    articleContent,
    shareOptions
  );
});
```

The following table shows the article content:

| Field       | Required                                    | Format                                                  | Description                                                      |
| ----------- | ------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------- |
| `title`     | Yes                                         | String                                                  | The headline of the article                                      |
| `subTitle`  | No                                          | String                                                  | The subtitle of the article                                      |
| `blurb`     | No                                          | String                                                  | A summary of the article to display                              |
| `date`      | No                                          | [Unix Epoch Timestamp](https://www.epochconverter.com/) | Date of publication                                              |
| `publisher` | No                                          | String                                                  | Name of the publisher                                            |
| `author`    | No                                          | String                                                  | Name of the author                                               |
| `thumbnail` | No                                          | URL (could be a data url)                               | Image to be displayed - 106px-106px                              |
| `id`        | Must provide either `id` or `href`, or both | String                                                  | An identifier used by the application to deeplink to the article |
| `href`      | Must provide either `id` or `href`, or both | URL                                                     | URL to the article (opened in a new browser window)              |

The following table shows the share options:

| Field              | Required | Format           | Description                                                                                                                                                                                                                                                                                                                                |
| ------------------ | -------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `prepopulateUsers` | No       | Array of strings | <p>The users (UserIds) who will be listed initially as recipients in the share modal.<br></p><p><em>Available only for authenticated apps, and only for Client 2.0.</em></p><p><em>It is recommended to limit the number of pre-populated users so the Symphony end user can easily review the list of recipients before sharing.</em></p> |

## Sharing Third Party Content

The `share` function can also be used to share custom, third-party entity types. In this case, the `data` parameter must be populated with the following fields:

| Field          | Description                                                                                                                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| inputAutofill  | Use this to fill the comment field in the share dialog to provide initial text. Cash tags and hash tags that are specified in the text will be converted to the correct entity.                                                              |
| plaintext      | The markdown representation of the entity, supporting a limited set of markdown features. The value of this field will be displayed on mobile devices and other older clients.                                                               |
| presentationML | The default presentation of the entity using [presentationML](../../../building-bots-on-symphony/messages/overview-of-presentationml.md). This will be seen by everybody who does not have an app with a custom renderer for the given type. |
| entityJSON     | The object being shared.                                                                                                                                                                                                                     |
| format         | The format of the message being sent. This must be set to "com.symphony.messageml.v2".                                                                                                                                                       |

The following JavaScript shows an example of a custom third party entity being shared:

```javascript
share : function(gameNbr, time)
{
    var fullTime = time;
    var hours = Math.floor(time / 60 / 60 / 1000);
    time -= hours * 60 * 60 * 1000;
    var minutes = Math.floor(time / 60 / 1000);
    time -= minutes * 60 * 1000;
    var seconds = Math.floor(time / 1000);
    var duration = hours.toString() + ':' + minutes.toString().pad(2, '0', 'left') + ':' + seconds.toString().pad(2, '0', 'left');

    var title = 'Somebody you know won at Mah Jongg Solitaire';
    var blurb = 'try to beat their time of ' + duration;
    var date = new Date().getTime() / 1000;
    var thumbnail = this.thumb;
    var id = JSON.stringify({gameNbr: gameNbr, time: fullTime});

    var presentationML =`
        <entity>
            <table><tr>
                <td><img src="${thumbnail}" /></td>
                <td>
                    <h1>${title}</h1>
                    ${blurb}
                </td>
            </tr></table>
        </entity>`;

    var entityJSON = {
        date: date,
        thumbnail: thumbnail,
        results: id,
        time : time,
        gameNbr : gameNbr,
    };

    var data = {
        plaintext: `*${title}*\n${blurb}\n`,
        presentationML : presentationML,
        entityJSON: entityJSON,
        entity: {},
        format: 'com.symphony.messageml.v2',
        inputAutofill : 'I ROCK!',
    }
    this.shareService.share('com.symfuny.invite.won', data);
}
```

In this example, the following modal dialog is launched and populated with the shared object content:

![](../../../.gitbook/assets/3de51d4-shared-mj.jpg)

## handleLink()

You must specify your own application service for handling clicks on shared articles using `handleLink` if you use the `id` field for deep linking articles into your application.

You must implement the `link` method on your application service in order to handle clicks on shared articles in conversations.

```javascript
// This code will live in your application controller.

// The application service that will be used to handle clicks on shared articles
var helloControllerService = SYMPHONY.services.register("hello:controller");

// Assume you have registered your application with the Symphony client and subscribed to the Share service.

shareService.handleLink("article", "hello:controller");

helloControllerService.implement({
    // You only need to implement this function if you intend to deeplink articles into your app by specifying an id for the article. If you use href, then article links will open in a new browser window.
  link: function(type, articleId) {
    if(type == "article") {
      // Implement this
      // For example, you might launch a new application module with a url that includes the articleId in the query parameters
      console.log("Article with id: " + articleId + " was clicked.");
    }    
  }
});
```
