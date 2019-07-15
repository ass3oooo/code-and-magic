'use strict';

(function() {
  if (!window.backend) {
    window.backend = {};
  }

  window.backend.load = function(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://js.dump.academy/code-and-magick/data", true);

    xhr.addEventListener("loadend", function(evt) {
      var response;

      if (xhr.status === 200) {
        try {
          response = JSON.parse(xhr.responseText);
          onLoad(response);
        } catch (e) {
          console.log(e);
        }
      } else {
        onError(xhr.status + ": " + xhr.statusText);
      }
    });



    xhr.send();
  };

  window.backend.save = function(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var boundary = "##newLine##";

    var response;
    xhr.open("POST", "https://js.dump.academy/code-and-magick", true);
    // xhr.setRequestHeader("Content-Type", "miltipart/form-data; boundary=" + boundary);
    xhr.addEventListener("loadend", function(evt) {
      console.log(evt.target);
      console.log(xhr.status);
      if (xhr.status === 200) {
        response = xhr.responseText;
        onLoad(response);
      } else {
        onError({name: xhr.status + ": " + xhr.statusText, message: xhr.response});
      }
    });

    xhr.send(data);

  }
})();
