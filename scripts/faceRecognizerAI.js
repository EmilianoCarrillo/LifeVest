var subscriptionKey = "a5fa1fd8be1745b38b157fb8f08c9c47";
function getFaceAlike(key, source1,source2, callback){
  var uriBase="https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
  var params = {
      "returnFaceId": "true"
  };
  $.ajax({
      url: uriBase + "?" + $.param(params),

      // Request headers.
      beforeSend: function(xhrObj){
          xhrObj.setRequestHeader("Content-Type","application/json");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
      },
      type: "POST",
      // Request body.
      data: '{"url": ' + '"' + source1 + '"}',
  })
  .done(function(data) {
          var id_1=data[0].faceId;
          $.ajax({
              url: uriBase + "?" + $.param(params),

              // Request headers.
              beforeSend: function(xhrObj){
                  xhrObj.setRequestHeader("Content-Type","application/json");
                  xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
              },
              type: "POST",
              // Request body.
              data: '{"url": ' + '"' + source2 + '"}',
          })
          .done(function(data2) {
              var id_2=data2[0].faceId;
              uriBase ="https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify";
              // Perform the REST API call.
              $.ajax({
                  url: uriBase ,
                  // Request headers.
                  beforeSend: function(xhrObj){
                      xhrObj.setRequestHeader("Content-Type","application/json");
                      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
                  },
                  type: "POST",
                  // Request body.
                  data: '{"faceId1":"' + id_1 + '", "faceId2":"' + id_2 + '"}',
              })
              .done(function(data3) {
                    if(data3.isIdentical==true)
                    {
                        if(data3.confidence>maxConf){
                            maxConf=data3.confidence;
                            respuesta=key;
                            console.log(respuesta);
                            callback(respuesta);
                        }
                    }
              })
              .fail(function(jqXHR, textStatus, errorThrown) {
                  // Display error message.
                  var errorString = (errorThrown === "") ?
                      "Error. " : errorThrown + " (" + jqXHR.status + "): ";
                  errorString += (jqXHR.responseText === "") ?
                      "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                          jQuery.parseJSON(jqXHR.responseText).message :
                              jQuery.parseJSON(jqXHR.responseText).error.message;
                  alert(errorString);
              });
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
              // Display error message.
              var errorString = (errorThrown === "") ?
                  "Error. " : errorThrown + " (" + jqXHR.status + "): ";
              errorString += (jqXHR.responseText === "") ?
                  "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                      jQuery.parseJSON(jqXHR.responseText).message :
                          jQuery.parseJSON(jqXHR.responseText).error.message;
              alert(errorString);
          });
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
          // Display error message.
          var errorString = (errorThrown === "") ?
              "Error. " : errorThrown + " (" + jqXHR.status + "): ";
          errorString += (jqXHR.responseText === "") ?
              "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                  jQuery.parseJSON(jqXHR.responseText).message :
                      jQuery.parseJSON(jqXHR.responseText).error.message;
          alert(errorString);
  });
}