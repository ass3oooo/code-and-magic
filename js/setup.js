"use strict";

(function() {
  function nextCoatColor() {
    if (!nextCoatColor.current) nextCoatColor.current = 0;
    if (++nextCoatColor.current > coatColors.length - 1) {
      nextCoatColor.current = 0;
    }
    coatElement.style.fill
        = setup.querySelector("input[name='coat-color']").value
        = coatColors[nextCoatColor.current];
  }

  function nextEyesColor() {
    if (!nextEyesColor.current) nextEyesColor.current = 0;
    if (++nextEyesColor.current > eyesColors.length - 1) {
      nextEyesColor.current = 0;
    }
    eyesElement.style.fill
        = setup.querySelector("input[name='eyes-color']").value
        = eyesColors[nextEyesColor.current];
  }

  function nextFireballColor() {
    if (!nextFireballColor.current) nextFireballColor.current = 0;
    if (++nextFireballColor.current > fireballColors.length - 1) {
      nextFireballColor.current = 0;
    }
    fireballElement.style.backgroundColor
        = setupPlayer.querySelector("input[name='fireball-color']").value
        = fireballColors[nextFireballColor.current];
  }

  function createSimilarWizardNode(template, wizObj) {
    var wizTemp = template.cloneNode(true);
    wizTemp.querySelector(".setup-similar-label").textContent = wizObj.name;
    wizTemp.querySelector(".wizard-coat").style.fill = wizObj.colorCoat;
    wizTemp.querySelector(".wizard-eyes").style.fill = wizObj.colorEyes;

    return wizTemp;
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


  window.renderSimilarWizards = function(count) {
  // function renderSimilarWizards() {
    var setupSimilarList = setup.querySelector(".setup-similar-list");
    var similarWizardsFragment = document.createDocumentFragment();
    var randomSimilarWizards = window.utils.getUniqueFromArray(window.similarWizards, 4);

    for (var key in randomSimilarWizards) {
      var wizard = createSimilarWizardNode
          (similarWizardTemplate, window.similarWizards[key]);
      similarWizardsFragment.appendChild(wizard);
    }

    setupSimilarList.appendChild(similarWizardsFragment);
  }

  var setupUserName;
  var setup = document.querySelector(".setup");
  var setupSimilar = setup.querySelector(".setup-similar");
  var setupUserName = setup.querySelector(".setup-user-name");
  var similarWizardTemplate = document.querySelector("template").content
      .querySelector(".setup-similar-item");
  var setupPlayer = setup.querySelector(".setup-player");
  var coatElement = setup.querySelector(".wizard-coat");
  var eyesElement = setup.querySelector(".wizard-eyes");
  var fireballElement = setup.querySelector(".setup-fireball");

  coatElement.addEventListener("click", nextCoatColor);
  eyesElement.addEventListener("click", nextEyesColor);
  fireballElement.addEventListener("click", nextFireballColor);

  // window.renderSimilarWizards();
  window.backend.load(window.renderSimilarWizards, window.errorMessage);

  setupSimilar.classList.remove("hidden");
})();
