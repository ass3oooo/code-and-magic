'use strict';

(function() {
  var ENTER_KEYCODE = 13;
  var ESCAPE_KEYCODE = 27;

  var setup = document.querySelector(".setup");
  var setupOpen = document.querySelector(".setup-open");
  var setupClose = setup.querySelector(".setup-close");
  var dragElement = setup.querySelector(".upload");
  var submitButton = setup.querySelector(".setup-submit");

  dragElement.addEventListener("mousedown", onMousedownDragElement);

  setupOpen.addEventListener("click", popupOpen);
  setupOpen.addEventListener("keydown", function(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      popupOpen();
    }
  });

  setupClose.addEventListener("click", popupClose);
  setupClose.addEventListener("keydown", function(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      popupClose();
    }
  });

  submitButton.addEventListener("click", function(evt) {
    evt.preventDefault();

    var form = setup.querySelector(".setup-wizard-form");
    var formData = new FormData(form);

    window.backend.save(formData, popupClose, window.errorMessage);
  })

  function onMousedownDragElement(evt) {

    function onMousemoveDragElement(moveEvt) {
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords.x = startCoords.x - shift.x;
      startCoords.y = startCoords.y - shift.y;


      setup.style.left = (setup.offsetLeft - shift.x) + "px";
      setup.style.top = (setup.offsetTop - shift.y) + "px";
    }

    function onMouseupDragElement(upEvt) {
      if (dragged) {
        function onClickPreventDefault(evt) {
          evt.preventDefault();
          setup.removeEventListener("click", onClickPreventDefault);
        }
        setup.addEventListener("click", onClickPreventDefault);
      }

      document.removeEventListener("mousemove", onMousemoveDragElement);
      document.removeEventListener("mouseup", onMouseupDragElement);
    };

    var dragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener("mousemove", onMousemoveDragElement);
    document.addEventListener("mouseup", onMouseupDragElement);
  };


  function popupOpen(evt) {
    setup.classList.remove("hidden");

    document.addEventListener("keydown", onPopupEscPress);
  }

  function popupClose(evt) {
    setup.classList.add("hidden");
    setup.style.left = '';
    setup.style.top = '';

    document.removeEventListener("keydown", onPopupEscPress);
  }

  function onPopupEscPress(evt) {
    if (evt.keyCode === ESCAPE_KEYCODE
      && evt.target != setupUserName) {
      popupClose();
    }
  }
})();
