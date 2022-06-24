---
description: This section lists the Structured Objects available for use in messages.
---

# Standard Entities

## Standard Entities

### Article

| Field       | Required                                     | Format                                                  | Description                                                      |
| ----------- | -------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------- |
| `title`     | Yes                                          | String                                                  | The headline of the article                                      |
| `subTitle`  | No                                           | String                                                  | The subtitle of the article                                      |
| `blurb`     | No                                           | String                                                  | A summary of the article to display                              |
| `date`      | No                                           | [Unix Epoch Timestamp](https://www.epochconverter.com/) | Date of publication                                              |
| `publisher` | No                                           | String                                                  | Name of the publisher                                            |
| `author`    | No                                           | String                                                  | Name of the author                                               |
| `thumbnail` | No                                           | URL (could be a data url)                               | Image to be displayed - 106x106px                                |
| `id`        | Must provide either `id` or `href`, or both. | String                                                  | An identifier used by the application to deeplink to the article |
| `href`      | Must provide either `id` or `href`, or both. | URL                                                     | URL to the article (opened in a new browser window)              |

### Financial Objects

#### org.symphonyoss.fin.security

| Field | Required | Format           | Description                                                                                                                                                                                                                                                               |
| ----- | -------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type  | Yes      | String           | The type of object. Must be set to `org.symphonyoss.fin.security`.                                                                                                                                                                                                        |
| id    | Yes      | Array of Objects | An array of one or more of the following objects: _org.symphonyoss.fin.security.id.ticker_ org.symphonyoss.fin.security.id.isin _org.symphonyoss.fin.security.id.cusip_ org.symphonyoss.fin.security.id.openfigi  More information about these objects is provided below. |

#### org.symphonyoss.fin.security.id.ticker

| Field | Required | Format | Description                                                                  |
| ----- | -------- | ------ | ---------------------------------------------------------------------------- |
| type  | Yes      | String | The type of object. Must be set to `org.symphonyoss.fin.security.id.ticker`. |
| value | Yes      | String | The name/ID of a ticker.                                                     |

#### org.symphonyoss.fin.security.id.isin

| Field | Required | Format | Description                                                                |
| ----- | -------- | ------ | -------------------------------------------------------------------------- |
| type  | Yes      | String | The type of object. Must be set to `org.symphonyoss.fin.security.id.isin`. |
| value | Yes      | String | The entity's ID.                                                           |

#### org.symphonyoss.fin.security.id.cusip

| Field | Required | Format | Description                                                                 |
| ----- | -------- | ------ | --------------------------------------------------------------------------- |
| type  | Yes      | String | The type of object. Must be set to `org.symphonyoss.fin.security.id.cusip`. |
| value | Yes      | String | The entity's ID.                                                            |

#### org.symphonyoss.fin.security.id.openfigi

| Field | Required | Format | Description                                                                    |
| ----- | -------- | ------ | ------------------------------------------------------------------------------ |
| type  | Yes      | String | The type of object. Must be set to `org.symphonyoss.fin.security.id.openfigi`. |
| value | Yes      | String | The entity's ID.                                                               |

### Image

| Field   | Required | Format | Description                                                    |
| ------- | -------- | ------ | -------------------------------------------------------------- |
| type    | Yes      | String | The type of entity. Must be set to `com.symphony.media.image`. |
| version | Yes      | String | The version.                                                   |
| format  | Yes      | String | The data format. Must be set to `image`.                       |
| url     | Yes      | String | The URL of the image.                                          |

### Taxonomy (mention)

| Field   | Required | Format           | Description                                                                                                                                        |
| ------- | -------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| type    | Yes      | String           | The type of object. Must be set to `com.symphony.user.mention`.                                                                                    |
| version | Yes      | String           | The object's version.                                                                                                                              |
| id      | Yes      | Array of objects | <p>An array of one or more of the following objects: <br>• com.symphony.user.userId<br>More information about these objects is provided below.</p> |

#### com.symphony.user.userId

| Field | Required | Format | Description                                                    |
| ----- | -------- | ------ | -------------------------------------------------------------- |
| type  | Yes      | String | The type of object. Must be set to `com.symphony.user.userId`. |
| value | Yes      | String | The ID of a user.                                              |

### Video

| Field   | Required | Format | Description                                                       |
| ------- | -------- | ------ | ----------------------------------------------------------------- |
| type    | Yes      | String | The type of object. Must be set to `com.symphony.media.video`.    |
| version | Yes      | String | The version.                                                      |
| format  | Yes      | String | The video's format. Must be set to `youtube` or `vimeo`.          |
| url     | Yes      | String | The URL of the video.                                             |
| id      | Yes      | String | The unique ID of the video (can be extracted from the video URL). |

## Go further...

Continue here to learn more about structured objects:

{% content-ref url="structured-objects.md" %}
[structured-objects.md](structured-objects.md)
{% endcontent-ref %}

