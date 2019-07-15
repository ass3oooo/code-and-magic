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

    window.utils.debounce(window.reRenderSimilarWizards);
  }

  function nextEyesColor() {
    if (!nextEyesColor.current) nextEyesColor.current = 0;
    if (++nextEyesColor.current > eyesColors.length - 1) {
      nextEyesColor.current = 0;
    }
    eyesElement.style.fill
        = setup.querySelector("input[name='eyes-color']").value
        = eyesColors[nextEyesColor.current];

    window.utils.debounce(window.reRenderSimilarWizards);
  }

  function nextFireballColor() {
    if (!nextFireballColor.current) nextFireballColor.current = 0;
    if (++nextFireballColor.current > fireballColors.length - 1) {
      nextFireballColor.current = 0;
    }
    fireballElement.style.backgroundColor
        = setupPlayer.querySelector("input[name='fireball-color']").value
        = fireballColors[nextFireballColor.current];

    window.utils.debounce(window.reRenderSimilarWizards);
  }

  function createSimilarWizardNode(template, wizObj) {
    var wizTemp = template.cloneNode(true);
    
    wizTemp.querySelector(".setup-similar-label").textContent = wizObj.name;
    wizTemp.querySelector(".wizard-coat").style.fill = wizObj.colorCoat;
    wizTemp.querySelector(".wizard-eyes").style.fill = wizObj.colorEyes;

    return wizTemp;
  }





  window.renderSimilarWizards = function(count) {
    var setupSimilarList = setup.querySelector(".setup-similar-list");
    var similarWizardsFragment = document.createDocumentFragment();
    // var randomSimilarWizards = window.utils.getUniqueFromArray(window.wizards, 4);

    for (var i = 0; i < 4; i++) {
      var wizard = createSimilarWizardNode
          (similarWizardTemplate, window.wizards[i]);

      similarWizardsFragment.appendChild(wizard);
    }

    setupSimilarList.appendChild(similarWizardsFragment);
  }

  window.removeSimilarWizards = function() {
    var setupSimilarList = setup.querySelector(".setup-similar-list");
    var wizards = setupSimilarList.querySelectorAll(".setup-similar-item");

    wizards.forEach(function(elem) {
      setupSimilarList.removeChild(elem);
    })
  }

  window.reRenderSimilarWizards = function() {
    window.findSimilarWizards();
    window.removeSimilarWizards();
    window.renderSimilarWizards();
  }

  window.rateWizards = function() {
    var userWizard = {
      artifacts: [],
      colorCoat: coatElement.style.fill,
      colorEyes: eyesElement.style.fill,
      colorFireball: fireballElement.style.backgroundColor
    }

    window.wizards.forEach(function(wiz) {
      wiz.howMuchSimilar = {
        //Каждое свойство принимает значение 1 или 0
        colorCoat: +(wiz.colorCoat === userWizard.colorCoat),
        colorEyes: +(wiz.colorEyes === userWizard.colorEyes)
      };

      //Затем получаем строку - сумму похожести в двоичной системе счисления вида "10"
      // и переводим ее в десятеричную. Таким образом каждое значение похожести
      // соответствует единственной комбинации свойств.
      //Например, похожесть "3" будет соответствовать только комбинации
      // плащ + глаза, и не может быть получено другим путем, даже если количество свойств будет больше
      wiz.howMuchSimilar.total = parseInt("" + wiz.howMuchSimilar.colorCoat + wiz.howMuchSimilar.colorEyes, 2);
    });
  }

  window.findSimilarWizards = function() {
    window.rateWizards();

    window.wizards.sort(function(a, b) {
      return b.howMuchSimilar.total - a.howMuchSimilar.total;
    });
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
      eyesElement.style.fill = "black";
  var fireballElement = setup.querySelector(".setup-fireball");

  coatElement.addEventListener("click", nextCoatColor);
  eyesElement.addEventListener("click", nextEyesColor);
  fireballElement.addEventListener("click", nextFireballColor);

  // window.renderSimilarWizards();
  window.backend.load(window.processWizards, window.errorMessage);

  setupSimilar.classList.remove("hidden");
})();
