//$.(function(){
  GimmieAPI = function(options) {
    var key = options.client_key;
    var secret = options.client_secret;
    var uid = options.uid;
    var apiRoot = options.api_root || 'example.com'
    return {
      trigger: function(event_name, event_data, successCallback, errorCallback){
        var oauth = OAuth({
          consumer: {
            public: key,
            secret: secret
          },
          signature_method: 'HMAC-SHA1'
        });

        var token = {
          public: key,
          secret: secret
        };

        var request_data = {
          url: apiRoot+'/gm/',
          method: 'GET'
        };

        $.ajax({
          url: request_data.url,
          type: request_data.method,
          data: oauth.authorize(request_data, token)
        }).done(function(data, status, jqxhr) {
          var request_data = {
            url: data._links['gm:trigger_event'].href,
            method: 'POST',
            data: {
              event_name: event_name,
              event_data: JSON.stringify(event_data),
              uid: uid
            }
          };

          $.ajax({
            url: request_data.url,
            type: request_data.method,
            data: oauth.authorize(request_data, token)
          }).done(function(data, status, jqxhr) {
            successCallback(data._embedded.item);
          }).fail(function(jqxhr) {
            errorCallback(jqxhr.statusCode().status,jqxhr.responseJSON.error);
          });
        }).fail(function(jqxhr) {
          errorCallback(jqxhr.statusCode().status,jqxhr.responseJSON.error);
        });

        return;
      }
    }
  }
//});

