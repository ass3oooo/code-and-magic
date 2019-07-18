'use strict';

(function() {
  var FORMATS = ["jpeg", "jpg", "png", "svg"];

  var upload = document.querySelector(".upload");
  var userPic = upload.querySelector("img.setup-user-pic");
  var input = upload.querySelector("input[type='file']");

  function onChangeShowPreview(evt) {
    var file = input.files[0];

    var match = FORMATS.some(function(elem) {
      return file.name.endsWith(elem);
    });

    if (match) {
      var fileReader = new FileReader();

      fileReader.addEventListener("load", function() {
        userPic.src = fileReader.result;
      });

      fileReader.readAsDataURL(file);
    }
  }

  input.addEventListener("change", onChangeShowPreview);
})();
