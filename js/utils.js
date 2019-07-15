'use strict';

(function() {
  if (!window.utils) {
    window.utils = {};
  }

  window.utils.getIntRandom = function getIntRandom(from = 0, to = 1) {
    return +from <= +to ? Math.floor(Math.random() * +to) + +from : false;
  };

  window.utils.getUniqueFromArray = function(array, count = 1) {
    if (count < 0) {
      return false;
    }

    var usedIndexes = {};

    for (var i = 0; i < count; i++) {
      var randIndex = window.utils.getIntRandom(0, array.length - 1);

      if (!usedIndexes[randIndex]) {
        usedIndexes[randIndex] = true;
      } else {
        var startIndex = randIndex++;
        while (randIndex != startIndex) {
          if (randIndex >= array.length) {
            randIndex = 0;
          }
          if (!usedIndexes[randIndex]) {
            usedIndexes[randIndex] = true;
            break;
          }
          randIndex++;
        }
      }

    }
    return usedIndexes;
  }

  // {name: <error header>, message: <error text>}
  window.errorMessage = function(e) {
    // alert(typeof error);
    var eHeader = document.createElement("h3");
    var eMessage = document.createElement("p");
    if (typeof e == "object") {
      eHeader.textContent = e.name;
      eMessage.textContent = e.message;
    } else if (typeof e == "string") {
      eHeader.textContent = "Ошибка!";
      eMessage.textContent = e;
    }

    var closeButton = document.createElement("span");
    closeButton.style.display = "block";
    closeButton.style.cursor = "pointer";
    closeButton.textContent = "[x]";
    closeButton.style.fontSize = "16px";
    closeButton.style.position = "absolute";
    closeButton.style.left = "10px";
    closeButton.style.top = "10px";
    closeButton.style.textDecoration = "none";
    closeButton.style.color = "white";

    var autoCloseTimer = document.createElement("span");
    autoCloseTimer.position = "absolute";
    // autoCloseTimer.style.display = "block";
    autoCloseTimer.textContent = "5";
    autoCloseTimer.style.right = "10px";

    var autoCloseText = document.createElement("span");
    autoCloseText.position = "absolute";
    // autoCloseText.style.display = "block";
    autoCloseText.textContent = "Скроется через ... ";
    autoCloseText.style.right = "30px";

    var hr = document.createElement("hr");

    // eMessage.style.width = "300px";

    var eNode = document.createElement("div");
    eNode.style.position = "fixed";
    eNode.style.left = "0";
    eNode.style.top = "0";
    eNode.style.textAlign = "center";
    eNode.style.zIndex = 10;
    eNode.style.fontSize = "12px";
    eNode.style.minWidth = "300px";
    eNode.style.maxWidth = "600px";
    eNode.style.paddingLeft = "30px";
    eNode.style.backgroundColor = "#c4001d";
    eNode.style.boxShadow = "10px 10px 0px 0px rgba(0,0,0,0.75)";
    eNode.style.opacity = "0";

    eNode.appendChild(eHeader);
    eNode.appendChild(eMessage);
    eNode.appendChild(hr);
    eNode.appendChild(closeButton);
    eNode.appendChild(autoCloseText);
    eNode.appendChild(autoCloseTimer);

    document.body.appendChild(eNode);

    var timer = setTimeout(function showMessageSmoothly() {
      eNode.style.opacity = +eNode.style.opacity + 0.1;

      if (eNode.style.opacity < 1) {
        setTimeout(showMessageSmoothly, 20);
      } else {
        startAutocloseTimer();
      }
    }, 20);

    closeButton.addEventListener("click", onClickCloseEMessage);

    function onClickCloseEMessage() {
      if (eNode.timer) {
        clearTimeout(eNode.timer);
      }
      document.body.removeChild(eNode);
      document.removeEventListener("click", onClickCloseEMessage);
    }

    function startAutocloseTimer() {
      eNode.timer = setTimeout(function closeTimer() {
        +autoCloseTimer.textContent--;
        console.log(timer);
        if (+autoCloseTimer.textContent < 0) {
          if (eNode) {
            onClickCloseEMessage();
          }
          clearTimeout(eNode.timer);
        } else {
          clearTimeout(eNode.timer);
          eNode.timer = setTimeout(closeTimer, 1000);
        }
      }, 1000);
    }
  }
})();

(function() {
  window.utils.debounce = function(callback, timeout = 500) {
    console.log(callback.debounceTimer);
    if (callback.debounceTimer) {
      clearTimeout(callback.debounceTimer);
    };

    callback.debounceTimer = setTimeout(function() {
      callback.apply(null, arguments);
    }, timeout);
  }
})();
