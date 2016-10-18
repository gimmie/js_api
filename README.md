# Sample Gimmie JavaScript App

A demonstration of how the js api is used, including the api file itself in www/js/gimmie-api.js

WARNING: Do not use this on a public site, it has key/secret in plaintext and is not appropriate for browser usage.

## Setup

To run the website use any generic service or use ruby/rack via running `rackup` after they're installed.

Edit the index.html file to include your client_key, client_secret, and api_root.

Choose an event name that exists in your system and POST an event to ensure it's working.

## Usage

To trigger an event:

```javascript
var api = GimmieAPI({
  "client_key"     : "some_client_key",
  "client_secret"  : "some_client_secret",
  "api_root": "http://your-domain.gimmie.io",
  "uid": 'some_uid'
});
api.trigger('some_event_name', {'some_property_name': 'some_property_value'},
function(eventResults) { # success callback
  # eventResults - array of results of the event, like being awarded points or a reward
}, function(statusCode,errorMessage) { # failure callback
  # statusCode - HTTP status code of failure
  # errorMessage - error message returned by the server
})
```

Adjust field values and edit index.html to play around with different settings.

## Dependencies

See the index.html file for javascript dependencies.

## Installing the JavaScript API elsewhere

Ensure you have the proper dependencies set up and then simply copy the gimmie-api.js file.
