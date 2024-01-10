# API Change Management

The API change management policy for endpoints is as follows:

The version of the API Agent that you are using controls the API capabilities and behavior (i.e. what endpoints are available, what parameters are accepted in requests, what fields are returned in responses, etc.). You can check your deployed version of the API Agent by calling the [Health Check](https://developers.symphony.com/restapi/main/info-health-check/health-check-v3) endpoint.

**Backwards Compatibility**

* We may introduce new optional request parameters or add fields to objects in the body of a request for existing API endpoints. If not included, your requests will continue to perform as before. We will use sensible defaults when optional fields are not present.
* We may return new fields in API responses. Any newly added fields will not change the meaning of any existing field. If new fields are added, the API documentation will indicate the version in which the field was added. Unless otherwise specified, it can be assumed that any field was introduced with the endpoint itself.
* We may return new values for existing primitive fields in API responses.
* For collections that return mixed object types, we may add new object types. For example, we may return new event types in our Real Time Events v4 APIs.
* We will not remove or change the URI for an existing resource.
* We will not remove or change fields that are returned in a response.

You should ensure your code is robust and can handle such changes from us. All fields in responses should be considered optional unless explicitly documented as always present.

**Forwards Compatibility**

* We will ignore unrecognized query string arguments and unrecognized HTTP headers.
* We will reject requests containing unrecognized fields in request body.

Most changes to API endpoints will be versioned in the way described above. However, if we discover that endpoints expose customers to security vulnerabilities, we will publish new endpoints immediately and expedite deprecation insecure endpoints.\
