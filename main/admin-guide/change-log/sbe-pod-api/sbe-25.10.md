# SBE 25.10

## SBE API changes

### **Updated APIs**

* [pod/v3/room/search](https://rest-api.symphony.com/main/streams-conversations/room-endpoints/search-rooms-v3#v3-room-search): new `searchFields` parameter introduced to introduce the ability to specify the room attribute(s) on which the search needs to occur, whether it is either the room name, the room description, the room keywords, or any combination of the three. Previously, whenever the search term appeared in any of those locations, the room would be returned.
