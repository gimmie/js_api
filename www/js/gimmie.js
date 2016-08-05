//$.(function(){
  Gimmie = function(options) {
    var key = options.key;
    var secret = options.secret;
    var uid = options.user.uid;
    var apiHostname = options.apiHostname || 'example.com'
    return {
      trigger: function(event_name, data, successCallback, errorCallback){
        var oauth = OAuth({
          consumer: {
            public: key,
            secret: secret
          },
          signature_method: 'HMAC-SHA1'
        });

        var request_data = {
          url: 'http://'+apiHostname+'/gm/events',
          method: 'POST',
          data: {
            event_name: event_name,
            event_data: JSON.stringify(data),
            uid: uid
          }
        };

        var token = {
          public: key,
          secret: secret
        };

        $.ajax({
          url: request_data.url,
          type: request_data.method,
          data: oauth.authorize(request_data, token)
        }).done(function(data, status, jqxhr) {
          successCallback(jqxhr.statusCode().status)
          //process your data here
        }).fail(function(jqxhr) {
          errorCallback(jqxhr.statusCode().status)
        });
      }
    }
  }
//});

