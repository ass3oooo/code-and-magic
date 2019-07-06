"use strict;"

//FUNCTIONS DECLARATION
function getIntRandom(from = 0, to = 1) {


  return +from <= +to ? Math.floor(Math.random() * +to) + +from : false;
}


function nextCoatColor() {
  if (!nextCoatColor.current) nextCoatColor.current = 0;
  if (++nextCoatColor.current > coatColors.length - 1) {
    nextCoatColor.current = 0;
  }
  console.log(nextCoatColor.current);
  wizardCoat.style.fill
      = setup.querySelector("input[name='coat-color']").value
      = coatColors[nextCoatColor.current];
}

function nextEyesColor() {
  if (!nextEyesColor.current) nextEyesColor.current = 0;
  if (++nextEyesColor.current > eyesColors.length - 1) {
    nextEyesColor.current = 0;
  }
  wizardEyes.style.fill
      = setup.querySelector("input[name='eyes-color']").value
      = eyesColors[nextEyesColor.current];
}

function nextFireballColor() {
  if (!nextFireballColor.current) nextFireballColor.current = 0;
  if (++nextFireballColor.current > fireballColors.length - 1) {
    nextFireballColor.current = 0;
  }
  wizardFireball.style.backgroundColor
      = wizardFireball.querySelector("input[name='fireball-color']").value
      = fireballColors[nextFireballColor.current];
}

function createSimilarWizardNode(template, wizObj) {
  var wizTemp = template.cloneNode(true);
  wizTemp.querySelector(".setup-similar-label").textContent = wizObj.name;
  wizTemp.querySelector(".wizard-coat").style.fill = wizObj.coatColor;
  wizTemp.querySelector(".wizard-eyes").style.fill = wizObj.eyesColor;

  return wizTemp;
}

function renderSimilarWizards() {
  var setupSimilarList = setup.querySelector(".setup-similar-list");
  var similarWizardsFragment = document.createDocumentFragment();

  for (var i = 0; i < similarWizards.length; i++) {
    var wizard = createSimilarWizardNode(similarWizardTemplate, similarWizards[i]);
    similarWizardsFragment.appendChild(wizard);
  }

  setupSimilarList.appendChild(similarWizardsFragment);
}

//VARIABLES DECLARATION
var ENTER_KEYCODE = 13;
var ESCAPE_KEYCODE = 27;

var setupUserName;
var setup = document.querySelector(".setup");
var setupSimilar = setup.querySelector(".setup-similar");
var similarWizardTemplate = document.querySelector("template").content
    .querySelector(".setup-similar-item");


var firstNames = [
  "Иван",
  "Хуан Себастьян",
  "Мария",
  "Кристоф",
  "Виктор",
  "Юлия",
  "Люпита",
  "Вашингтон",
];

var secondNames = [
  "да Марья",
  "Верон",
  "Мирабелла",
  "Вальц",
  "Онопко",
  "Топольницкая",
  "Нионго",
  "Ирвинг",
];

var coatColors = [
  "rgb(101, 137, 164)",
  "rgb(241, 43, 107)",
  "rgb(146, 100, 161)",
  "rgb(56, 159, 117)",
  "rgb(215, 210, 55)",
  "rgb(0, 0, 0)",
];

var eyesColors = [
  "black",
  "red",
  "blue",
  "yellow",
  "green",
];

var fireballColors = [
  "#ee4830",
  "#30a8ee",
  "#5ce6c0",
  "#e848d5",
  "#e6e848",
];

var similarWizards = [
  {
    name: firstNames[0] + " " + secondNames[0],
    coatColor: coatColors[0],
    eyesColor: eyesColors[0],
  },
  {
    name: firstNames[1] + " " + secondNames[1],
    coatColor: coatColors[1],
    eyesColor: eyesColors[0],
  },
  {
    name: firstNames[2] + " " + secondNames[2],
    coatColor: coatColors[2],
    eyesColor: eyesColors[2],
  },
  {
    name: firstNames[3] + " " + secondNames[3],
    coatColor: coatColors[3],
    eyesColor: eyesColors[3],
  },
];

renderSimilarWizards();

setup.classList.remove("hidden");
setupSimilar.classList.remove("hidden");
