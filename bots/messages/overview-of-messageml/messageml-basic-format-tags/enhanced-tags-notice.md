---
description: >-
  This page describes the changes introduced by the new enhanced tags for
  Symphony developers
---

# Enhanced tags notice

## Introduction to the enhanced tags

Symphony users can now tag financial instruments using the Enhanced Tag feature.&#x20;

<figure><img src="https://lh4.googleusercontent.com/XJN5fiRvqurM65XJM7s7pG7SgwJbjLs5la9zlyX3bR2R-isKC3fko-_IBqDNMqSCsXsPKTlpdtA96uDa_l1xXlt5DpYMkcfeIr5zALq_H9PwdejeCR7i6ZW-bQzasYGtMwYuYAJPxCsa0auMZWW6vMPzbn8g988WLJxSYwFrdpXNUpc5pO1b2cfFDd3kMA" alt=""><figcaption><p>Instrument lookup type-ahead by ticker, name, ISIN, etc.</p></figcaption></figure>

It displays a typeahead when the user presses # in a chat conversation. The upper section of the typeahead shows regular hashtags previously exchanged with that user and the lower section, under INSTRUMENTS shows Stocks, ADRs, ETFs and Indices.

By hovering over the Enhanced Tag, users can see essential reference data like company name, identifiers, exchange and currency.

<figure><img src="https://lh4.googleusercontent.com/2QUWjrYUGrx6eBlAg-OWLvoHsWDJNWcI8e_m8DqhYzQWmwoa767Wo5d6V6DJE5oGXP_UReCeOECZTGd32R1eacfvpQiaxx__bGROuB4-bvq1m4suqoYUK2Z2MNkpK4vrRy7ExekJIioR1yGvQdXjz7yzzGlyWUbnUv09YMKSfLqitrfU2r1fWviftLUSrA" alt=""><figcaption><p>New hovercard for the enhanced tags</p></figcaption></figure>

The enhanced tags replace the existing $cashtags. This means that moving forward your apps and bots will need to handle enhanced tags instead of $cashtags.

## Understanding the impact of the new tags

The impact of the enhanced tags on existing bots & apps has been carefully reviewed to ensure that there is no backward compatibility issue.\
However, we strongly recommend that you conduct some tests to validate the change.

Please read below to understand the changes introduced with the new enhanced tags.

### Bots producing legacy $cashtags

* Existing bots can still produce legacy $cashtags both using the **short tag notation** (`<tag cash="AAPL"/>`), and using a **Standard Entity** (`"type": "org.symphonyoss.fin.security"`)
* Existing bots may experiment with sending messages that would contain enhanced tags now. To do so, you will need to construct the tags as Standard Entities, following the structure described [here](enhanced-tags-notice.md#structure-of-enhanced-tags). There will however be situations where these forged tags and regularly created tags will differ.
* In the future, it will be possible to create enhanced tags more easily thanks to a short tag notation. More information to come.

### Bots consuming legacy $cashtags

* Bots consuming existing $cashtags in received messages are not impacted if they rely on the **structured object** (entityJSON). When they receive an enhanced tag, the exact same structure and properties will be present. There will be additional properties though, and the version field will be set to "2.0" instead of "1.0".
* Bots that rely on the **text representation of the tags** (message field instead of the entityJSON field) will also not be impacted. **However, this is not a recommended practice** as this text representation may change to match the enhanced tag displayed symbol instead of the existing ticker in the future (e.g., text would change from "$TSLA" to "TSLA US"). **If you rely on the text representation of the $cashtag instead of the structured data, you should consider updating the bot** to rely on the structured data included in the entityJSON instead.
* If you plan to upgrade your bot to leverage the new properties of the enhanced tags, please consider that you may still encounter legacy $cashtags for a long period of time, so should build around that. To detect if you are receiving a legacy tag or an enhanced one, you can rely on the version field included in the structure (`org.symphonyoss.fin.security.version`). It is set to "2.0" for the new enhanced tags.

### Signals

* Existing signals will continue to work with the new enhanced tags. Messages containing the new tags will still match with the existing signals, meaning a signal matching "`cash: AAPL`" will match messages containing both "AAPL" and "AAPL US" for example.
* For now, it is not yet possible to create signals based on the newly introduced properties of the enhanced tags, but this will change in the coming months. For example, it is not yet possible to create a signal that will match only on "TSLA US", but if you create a signal that matches on "TSLA", it will match messages containing "TSLA US" as well.&#x20;
* The Signal API has not changed. In the coming months the API may change to adapt to the new tags and in that case this change will be introduced following a notice period provided that there is an impact on the API contract.

### Extension apps

* Existing apps that register a UI extension on $cashtag hovercards continue to receive the existing object for new enhanced tags.
* However, whenever your app is notified of a user click on the hovercard, the app will receive in addition to the existing object a new structure containing the new enhanced tags properties.
* If you decide to upgrade your app to leverage the new properties of the enhanced tags, please consider that you may still encounter legacy $cashtags for a long period of time, so should build around that. To detect if you are receiving a legacy tag or an enhanced one, you can rely on the version field included in the structure (org.symphonyoss.fin.security.version). It is set to "2.0" for the new enhanced tags.

## Message format

Please note below the differences between the structures of the enhanced tags and the legacy $cashtags.

### Structure of legacy $cashtags

> ```json
> // Presentation ML content of the message
> <div data-format="PresentationML" data-version="2.0" class="wysiwyg">
>   <p><span class="entity" data-entity-id="0">$SAN</span></p>
> </div>
>
> // Entities (entityJSON field in the message):
> {
>   "0": {
>     "id": [
>       {
>         "type": "org.symphonyoss.fin.security.id.ticker",
>         "value": "SAN"
>       }
>     ],
>     "type": "org.symphonyoss.fin.security",
>     "version": "1.0"
>   }
> }
> ```

### Structure of enhanced tags

```json
// Presentation ML content of the message
<div data-format="PresentationML" data-version="2.0" class="wysiwyg">
  <p><span class="entity" data-entity-id="0">$SAN</span></p>
</div>

// Entities (entityJSON field in the message):
{
  "0": {
    "id": [
      {
        "type": "org.symphonyoss.fin.security.id.ticker",
        "value": "SAN"
      },
      {
        "type": "org.symphonyoss.fin.security.id.uniqueId",
        "value": "91e3e37d-da68-42e8-ba05-94aa51aebb4e"
      },
      {
        "type": "org.symphonyoss.fin.security.id.fullBbgTicker",
        "value": "SAN FP Equity"
      },
      {
        "type": "org.symphonyoss.fin.security.id.isin",
        "value": "FR0000120578"
      },
      {
        "type": "org.symphonyoss.fin.security.id.figi",
        "value": "BBG000BWBBP2"
      },
      {
        "type": "org.symphonyoss.fin.security.id.localCode",
        "value": "SAN"
      },
      {
        "type": "org.symphonyoss.fin.security.id.operationalMic",
        "value": "XPAR"
      },
      {
        "type": "org.symphonyoss.fin.security.exchangeName",
        "value": "Euronext Paris"
      },
      {
        "type": "org.symphonyoss.fin.security.country",
        "value": "France"
      },
      {
        "type": "org.symphonyoss.fin.security.displayName",
        "value": "Sanofi"
      },
      {
        "type": "org.symphonyoss.fin.security.currency",
        "value": "EUR"
      },
      {
        "type": "org.symphonyoss.fin.security.instrumentTypeCode",
        "value": "EQS"
      },
      {
        "type": "org.symphonyoss.fin.security.instrumentTypeName",
        "value": "Equity Shares"
      },
      {
        "type": "org.symphonyoss.fin.security.rootBbgCompTicker",
        "value": "SAN"
      },
      {
        "type": "org.symphonyoss.fin.security.bbgcompticker",
        "value": "SAN FP"
      }
    ],
    "type": "org.symphonyoss.fin.security",
    "version": "2.0"
  }
} 
```
