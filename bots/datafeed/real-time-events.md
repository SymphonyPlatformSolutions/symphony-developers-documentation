# Real-Time Events

The following events are returned when reading from a real time messages and events from the datafeed:

* [Message Sent](real-time-events.md#message-sent)
* [Messages Suppressed](real-time-events.md#messages-suppressed)
* [Symphony Elements Action](real-time-events.md#symphony-elements-action)
* [Shared Wall Post](real-time-events.md#shared-wall-posts)
* [IM Created](real-time-events.md#im-created)
* [Room Created](real-time-events.md#room-created)
* [Room Updated Message](real-time-events.md#room-updated-message)
* [Room Deactivated Message](real-time-events.md#room-deactivated-message)
* [Room Reactivated Message](real-time-events.md#room-reactivated-message)
* [User Requested to Join Room](real-time-events.md#user-requested-to-join-room)
* [User Joined Room](real-time-events.md#user-joined-room)
* [User Left Room](real-time-events.md#user-left-room)
* [Room Member Promoted To Owner](real-time-events.md#room-member-promoted-to-owner)
* [Room Member Demoted From Owner](real-time-events.md#room-member-demoted-from-owner)
* [Connection Requested](real-time-events.md#connection-requested)
* [Connection Accepted](real-time-events.md#connection-accepted)
* [Generic System Event](real-time-events.md#generic-system-event)

All events follow the structure below:

* `id`: A randomly generated ID for the event, distinct from the ID of the message or chatroom or other objects that the event pertains to. These IDs are unique, except in the situation where two activities are performed simultaneously in the Symphony client (for example, members are added during the creation of a room). In this case, the two associated events will share the same id. This is for Symphony internal use.
* `timestamp`: The timestamp for when the event occurred in Unix timestamp milliseconds format. For certain events, this will be equivalent to the created timestamp of the object the event pertains to (for instance, room creation timestamp).
* `type`: The type of event that occurred (for instance, a "MessageSent" or "RoomCreated" event).
* `initiator`: The actor that initiated the event. Currently, initiator will always be a user. The initiator user may be distinct from the affected user (for instance, when one user adds another user to a chatroom).
* `payload`: An object containing event-specific information that is keyed off the event type.

### Message Sent

Generated when a message is sent in an 1-1 chat or chatroom of which the user in context is a member, including messages sent by the user him/herself.

```javascript
{
    "id": "",
    "timestamp": 0,
    "type": "MESSAGESENT",
    "initiator": {
        "user": {
            "userId": 0,
            "firstName": "",
            "lastName": "",
            "displayName": "",
            "email": "",
            "userName": ""
        }
    },
    "payload": {
        "messageSent": {
            "message": {
                "messageId": "",
                "timestamp": 0,
                "message": "<div data-format='PresentationML' data-version='2.0'>Message content. With <span class='entity' data-entity-id='mention1'>@user name</span>, <span class='cashTag' data-entity-id='cashtag2'>$ticker</span>, and <span class='hashTag' data-entity-id='hashtag3'>#keyword</span>.</div>",
                "data": "{
          \"mention1\": {
            \"type\": \"com.symphony.user.mention\",
            \"version\": \"1.0\",
            \"id\": [{
              \"type\": \"com.symphony.user.userId\",
              \"value\": 123456789
            }]
          },
          \"cashtag2\": {
            \"type\": \"org.symphonyoss.fin.security\",
            \"version\": \"1.0\",
            \"id\": [{
              \"type\": \"org.symphonyoss.fin.security.id.ticker\",
              \"value\": \"ibm\"
            }]
          },
          \"hashtag3\": {
            \"type\": \"org.symphonyoss.taxonomy\",
            \"version\": \"1.0\",
            \"id\": [{
              \"type\": \"org.symphonyoss.taxonomy.hashtag\",
              \"value\": \"unexpected\"
            }]
          }
        }",
                "attachments": [],
                "user": {
                    "userId": 0,
                    "firstName": "",
                    "lastName": "",
                    "displayName": "",
                    "email": "",
                    "username": ""
                },
                "externalRecipients": false,
                "stream": {
                    "streamId": "",
                    "streamType": "IM"
                },
                "userAgent": "Agent-2.2.5-Linux-4.9.77-31.58.amzn1.x86_64",
                "originalFormat": "com.symphony.messageml.v2"
            }
        }
    }
}
```

Events attributes details:

* `version`: version of the message payload, set when the message was created
* `message`: the message itself
* `attachments`: list of attachments to the message, not present if there are no attachments
* `user`: author of the message
* `externalRecipients`: indicates whether that message is sent to external users.
  * `false`: the message was only sent to users internal to the company.
  * `true`: the message was sent to at least one user outside of the company.
* `stream`: stream the message was posted into.
  * `streamId`: identifier for the stream.
  * `streamType`: stream type can be `ROOM`, `IM (1-1 chat)`, `MIM (deprecated)`, or `POST`.
* `data`: JSON structure contained inside an escaped string, NOT an actual JSON structure.

{% hint style="info" %}
Note:

* The event `initiator` and the message `user` are the same
* Hashtags and cashtags in EntityJSON have no '#' or '$'
* An external chatroom can contain messages with `externalRecipients` set to `false` in cases where external users have not been added to the chatroom yet. &#x20;
{% endhint %}

### Messages Suppressed

Generated when messages are suppressed:

```javascript
{
      "id": "V2Jdlz",
      "messageId": "qsOkkR1Z170QKVu54QU8WX___qRaa2y5bw",
      "timestamp": 1493131629382,
      "type": "MESSAGESUPPRESSED",
      "initiator": {
                "user": {
                    "userId": 8933531976380
                    }
            },
            "payload": {
                "messageSuppressed": {
                    "messageId": "QasBvaApRVqAIGPcqUTOAn___qRaa6hwdA",
                        "stream": {
                            "streamId": "ksuDd0xGnAGW1B4plItFyn___qRfGLBsdA"
                        }
                    }
            }
}
```

### Symphony Elements Action

Generated when a user replies to a bot message that contains an interactive form with UX components such as text fields, radio buttons, checkboxes, person selectors and more.  Please refer to [Symphony Elements](../messages/overview-of-messageml/symphony-elements-1/) for more information. &#x20;

```javascript
[
    {
        "id": "HHZFPX",
        "messageId": "StQDPAYMXNz1ue4fcr5W7H___pQENqrGbQ",
        "timestamp": 1563297404217,
        "type": "SYMPHONYELEMENTSACTION",
        "initiator": {
            "user": {
                "userId": 7078106482890,
                "firstName": "User",
                "lastName": "Bot",
                "displayName": "User",
                "email": "User_bot@symphony.com",
                "username": "user_bot"
            }
        },
        "payload": {
            "symphonyElementsAction": {
                "stream": {
                    "streamId": "YuK1c2y2yuie6+UfQnjSPX///pQEn69idA=="
                },
                "formMessageId": "xtZqqBNGwLDkLuvuQTyjH3///pQENvjudA==5454",
                "formId": "form_id",
                "formValues": {
                    "action": "submit_button",
                    "name_01": "John",
                    "email_01": "john@email.com",
                    "country": "opt1",
                    "example_radio": "option_01",
                    "checkbox_1": "value01",
                    "checkbox_2": "value02",
                    "comment": "my comment"
                }
            }
        }
    }
]
```

{% hint style="info" %}
Note that since Symphony v20.3.1, the event payload returned by the Datafeed has changed. The attribute `actionStream` has been removed and the `formStream` attribute has been renamed to `stream`.
{% endhint %}

### Shared Wall Posts

Generated when either:

* The user in context shares a wall post written by another user.
* Another user shares a wall post written by the user in context.

```javascript
{
  "id": "",
  "timestamp": 0,
  "type": "SHAREDPOST",
  "initiator": {
    "user": {
      "userId": 0,
      "firstName": "",
      "lastName": "",
      "displayName": "",
      "email": "",
      "username": ""
    }
  },
  "payload": {
    "sharedPost": {
      "message": {
        "messageId": "",
        "timestamp": 0,
        "message": "<div data-format='PresentationML' data-version='2.0'>Sent when sharing the original post</div>",
        "data" : "{ }",
        "attachments": [],
        // This is the user who is sharing the wall post.
        "user": {
          "userId": 0,
          "firstName": "",
          "lastName": "",
          "displayName": "",
          "email": "",
          "username": ""
        },
        "externalRecipients": false,
        "stream": {
          // This is the ID of the sharing user's wall.
          "streamId": "",
          // For a shared wall post, the destination stream type will always be POST.
          "streamType": "POST"
        }
      },
      // This is the original wall post that is being shared.
      "sharedMessage": {
        "messageId": "",
        "timestamp": 0,
        "message": "<div data-format='PresentationML' data-version='2.0'>Original Post</div>",,
        "data" : "{}",
        "attachments": [],
        // This is the author of the original wall post.
        "user": {
          "userId": 0,
          "firstName": "",
          "lastName": "",
          "displayName": "",
          "email": "",
          "username": ""
        },
        "externalRecipients": false,
        "stream": {
          // This is the ID of the original poster's wall.
          "streamId": "",
          // For a shared wall post, the originating stream type will always be POST.
          "streamType": "POST"
        }
      }
    }
  }
}
```

### IM Created

Generated when an IM (1-1 chat) is created with the user in context as a member, initiated either by the user in context or another user:

```javascript
{
  "id": "",
  "timestamp": 0,
  "type": "INSTANTMESSAGECREATED",
  "initiator": {
    "user": {
        "userId": 0,
      "firstName": "",
      "lastName": "",
      "displayName": "",
      "email": "",
      "username": ""
    }
  },
  "payload": {
    "instantMessageCreated": {
      "stream": {
        "streamId": "",
        // Stream type can be either IM (1-1 chat) or MIM (Deprecated).
        "streamType": "IM",
        "members": [
          { "userId": 0 },
          { "userId": 1 }
        ],
        "external": false
      }
    }
  }
}
```

### Room Created

Generated when a room is created by the user in context:

```javascript
[
    {
        "id": "uW6hmX",
        "messageId": "nn-TBGB...",
        "timestamp": 1535146379937,
        "type": "ROOMCREATED",
        "initiator": {
            "user": {
                "userId": 14568...,
                "displayName": "Local Bot",
                "email": "bot.user@test.symphony.com",
                "username": "bot.user"
            }
        },
        "payload": {
            "roomCreated": {
                "stream": {
                    "streamId": "tVtJmEG...",
                    "streamType": "ROOM",
                    "roomName": "pub12",
                    "external": false,
                    "crossPod": false
                },
                "roomProperties": {
                    "name": "pub12",
                    "description": "#twelfth",
                    "creatorUser": {
                        "userId": 14568...,
                        "displayName": "Local Bot",
                        "email": "bot.user@test.symphony.com",
                        "username": "bot.user"
                    },
                    "createdDate": 1535146379931,
                    "external": false,
                    "crossPod": false,
                    "copyProtected": false,
                    "readOnly": false,
                    "discoverable": false,
                    "membersCanInvite": false,
                    "canViewHistory": false,
                    "public": true
                }
            }
        }
    }
]
```

### Room Updated Message

Generated when a room of which the user in context is a member is updated, including rooms updated by the user him/herself:

```javascript
{
    "id": "",
  "timestamp": 0,
  "type": "ROOMUPDATED",
  "initiator": {
    "user": {
        "userId": 0,
      "firstName": "",
      "lastName": "",
      "displayName": "",
      "email": "",
      "username": ""
    }
  },
  "payload": {
    "roomUpdated": {
        "stream": {
        "streamId": "",
        "streamType": "ROOM",
        "roomName": "",
        "external": false
      },
      // These fields represent the current state of these attributes. At least one of them was updated by this operation.
      "newRoomProperties": {
        "name": "",
        "description": "",
        "discoverable": false,
        "membersCanInvite": false
      }
    }
  }
}
```

### Room Deactivated Message

Generated when a room of which the user in context is a member is deactivated, including rooms deactivated by the user him/herself:

```
{
    "id": "",
  "timestamp": 0,
  "type": "ROOMDEACTIVATED",
  "initiator": {
    "user": {
        "userId": 0,
      "firstName": "",
      "lastName": "",
      "displayName": "",
      "email": "",
      "username": ""
    }
  },
  "payload": {
    "roomDeactivated": {
        "stream": {
        "streamId": "",
        "streamType": "ROOM"
      }
    }
  }
}
```

{% hint style="info" %}
The `ROOMDEACTIVATED` event does not include the `roomName` or `external` fields.
{% endhint %}

### Room Reactivated Message

Generated when a room of which the user in context is a member is reactivated, including rooms reactivated by the user him/herself:

```javascript
{
    "id": "",
  "timestamp": 0,
  "type": "ROOMREACTIVATED",
  "initiator": {
    "user": {
        "userId": 0,
      "firstName": "",
      "lastName": "",
      "displayName": "",
      "email": "",
      "username": ""
    }
  },
  "payload": {
    "roomReactivated": {
        "stream": {
        "streamId": "",
        "streamType": "ROOM",
        "roomName": "",
        "external": false
      }
    }
  }
}
```

### User Requested to Join Room

Generated when a user requests to join a room. Only the user who requested to join the room and the owners of that room will receive this event on their datafeeds.\
The `affectedUsers` attribute represents the owners of the room.\
Available in Agent 2.56.0.

```javascript
[
    {
        "id": "LSWslw",
        "messageId": "lwu0jF0reb7Sbw",
        "timestamp": 1574439227693,
        "type": "USERREQUESTEDTOJOINROOM",
        // This is the user who initiated the action, in this case, the user who has requested to join the room. 
        "initiator": {
            "user": {
                "userId": 68719476737,
                "firstName": "John",
                "lastName": "Doe",
                "displayName": "John Doe",
                "email": "john_doe@symphony.com",
                "username": "john_doe@symphony.com"
            }
        },
        "payload": {
            "userRequestedToJoinRoom": {
                "stream": {
                    "streamId": "cVHHJfFJbjyQ4bmHsHJBcdA",
                    "members": []
                },
               //These are the users who own the room.
                "affectedUsers": [
                    {
                        "userId": 68719476759,
                        "displayName": "owner1",
                        "email": "owner1@email.com",
                        "username": "owner1"
                    },
                    {
                        "userId": 68719476760,
                        "firstName": "owner2",
                        "lastName": "owner2",
                        "displayName": "owner2 owner2",
                        "email": "owner2@mail.com",
                        "username": "owner2"
                    }
                ]
            }
        }
    }
]
```

### User Joined Room

Generated when a new user joins or is added to a room of which the user in context is a member, including when the user himself joins or is added to a room.:

```javascript
{
    "id": "",
  "timestamp": 0,
  "type": "USERJOINEDROOM",
  // This is the user who initiated the action (i.e. added the user to the room). If the initiator and and affected user are the same, the user joined the room of his own accord.
  "initiator": {
    "user": {
        "userId": 0,
      "firstName": "",
      "lastName": "",
      "displayName": "",
      "email": "",
      "username": ""
    }
  },
  "payload": {
    "userJoinedRoom": {
        "stream": {
        "streamId": "",
        "streamType": "ROOM",
        "roomName": "",
        "external": false
      },
      // This is the user who was affected by the action (i.e. joined the room).
      "affectedUser": {
                "userId": 0,
        "firstName": "",
        "lastName": "",
        "displayName": "",
        "email": "",
        "username": ""
      }
    }
  }
}
```

### User Left Room

Generated when a user leaves or is removed from a room of which the user in context is a member, including when the user himself leaves or is removed from a room:

```javascript
{
    "id": "",
  "timestamp": 0,
  "type": "USERLEFTROOM",
  // This is the user who initiated the action (i.e. removed the user from the room). If the initiator and and affected user are the same, the user left the room of his own accord.
  "initiator": {
    "user": {
        "userId": 0,
      "firstName": "",
      "lastName": "",
      "displayName": "",
      "email": "",
      "username": ""
    }
  },
  "payload": {
    "userLeftRoom": {
        "stream": {
        "streamId": "",
        "streamType": "ROOM",
        "roomName": "",
        "external": false
      },
      // This is the user who was affected by the action (i.e. left the room).
      "affectedUser": {
                "userId": 0,
        "firstName": "",
        "lastName": "",
        "displayName": "",
        "email": "",
        "username": ""
      }
    }
  }
}
```

### Room Member Promoted to Owner

Generated when a user is promoted from a participant to an owner of a room of which the user in context is a member, including when the user himself is promoted to an owner or promotes another user.:

```javascript
{
    "id": "",
  "timestamp": 0,
  "type": "ROOMMEMBERPROMOTEDTOOWNER",
  // This is the user who performed the promotion.
  "initiator": {
    "user": {
        "userId": 0,
      "firstName": "",
      "lastName": "",
      "displayName": "",
      "email": "",
      "username": ""
    }
  },
  "payload": {
    "roomMemberPromotedToOwner": {
        "stream": {
        "streamId": "",
        "streamType": "ROOM",
        "roomName": "",
        "external": false
      },
      // This is the user who was promoted.
      "affectedUser": {
                "userId": 0,
        "firstName": "",
        "lastName": "",
        "displayName": "",
        "email": "",
        "username": ""
      }
    }
  }
}
```

### Room Member Demoted from Owner

Generated when a user is demoted from an owner to a participant of a room of which the user in context is a member, including when the user himself is demoted to a participant or demotes another user:

```javascript
{
    "id": "",
  "timestamp": 0,
  "type": "ROOMMEMBERDEMOTEDFROMOWNER",
  // This is the user who performed the demotion.
  "initiator": {
    "user": {
        "userId": 0,
      "firstName": "",
      "lastName": "",
      "displayName": "",
      "email": "",
      "username": ""
    }
  },
  "payload": {
    "roomMemberDemotedFromOwner": {
        "stream": {
        "streamId": "",
        "streamType": "ROOM",
        "roomName": "",
        "external": false
      },
      // This is the user who was demoted.
      "affectedUser": {
                "userId": 0,
        "firstName": "",
        "lastName": "",
        "displayName": "",
        "email": "",
        "username": ""
      }
    }
  }
}
```

### Connection Requested

Generated when a connection request is sent, either:

* Sent by the user in context to another user.
* Sent to the user in context by another user.

```javascript
{
    "id": "",
  "timestamp": 0,
  "type": "CONNECTIONREQUESTED",
  // This is the user who sent the request.
  "initiator": {
    "user": {
        "userId": 0,
      "firstName": "",
      "lastName": "",
      "displayName": "",
      "email": "",
      "username": ""
    }
  },
  "payload": {
    "connectionRequested": {
      // This is the user to whom the request was sent.
      "toUser": {
        "userId": 0,
        "firstName": "",
        "lastName": "",
        "displayName": ""
      }
    }
  }
}
```

### Connection Accepted

Generated when a connection request is accepted, either:

* Sent by the user in context and accepted by another user.
* Sent by another user and accepted by the user in context.

```javascript
{
    "id": "",
  "timestamp": 0,
  "type": "CONNECTIONACCEPTED",
  // This is the user who accepted the request.
  "initiator": {
    "user": {
        "userId": 0,
      "firstName": "",
      "lastName": "",
      "displayName": "",
      "email": "",
      "username": ""
    }
  },
  "payload": {
    "connectionAccepted": {
      // This is the user who sent the request.
      "fromUser": {
        "userId": 0,
        "firstName": "",
        "lastName": "",
        "displayName": "",
        "email": ""
      }
    }
  }
}
```

### Generic System Event

Generic System Event is a new category of generic real time event, that is generated in various situations, such as phone calls, events specific to federated chats, and more.

The event is generic, and its structure depends on the event's subtype (`genericSystemEvent.eventSubtype`).

Most generic events are related to internal processes and are not useful for Bots, so you can just ignore them. When Symphony introduces events that can be relevant to Bots, they will be documented in this page.

The common structure to all Generic System Events is described below. The `parameters` section will vary depending on the subtype of the event.

```json
{
  "id": "chiKiF",
  "messageId": "XB1kb8IWoQJiPm7EIp-Qan___m_USNrLbw",
  "timestamp": 1718720341300,
  "type": "GENERICSYSTEMEVENT",
  "initiator": {
    "user": {
      "userId": 12345678,
      "displayName": "connect-bot",
      "email": "connect-bot@symphony.com",
      "username": "connect-bot"
    }
  },
  "payload": {
    "genericSystemEvent": {
      "stream": {
        "streamId": "_tiUL8zamhwqo8J0tRGRmH___nF1ABgsdA",
        "external": true,
        "crossPod": true
      },
      "eventTimestamp": 1718717111858,
      "sourceSystem": "federation",
      "eventSubtype": "test.event",
      "parameters": {
        ... (depends on subtype)
      }
    }
  }
}
```

{% hint style="info" %}
Always rely on the `eventSubtype` to filter the events that are relevant to you, as new subtypes with a different structure may be introduced in the future.&#x20;
{% endhint %}
