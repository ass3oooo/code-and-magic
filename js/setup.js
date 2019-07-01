"use strict;"

//FUNCTIONS DECLARATION
function getIntRandom(from = 0, to = 1) {


  return +from <= +to ? Math.floor(Math.random() * +to) + +from : false;
}

function createSimilarCharacter(names, secondNames, coatColors, eyesColors) {


  return {
    "name": names[getIntRandom(1, names.length - 1)] +
            " " +
            secondNames[getIntRandom(1, secondNames.length - 1)],
    "coatColor": coatColors[getIntRandom(1, coatColors.length - 1)],
    "eyesColor": eyesColors[getIntRandom(1, eyesColors.length - 1)]
  }
}

function createNodeSimilarCharacter(template, character) {

  let temp = template.content.cloneNode(true);

  temp.querySelector(".setup-similar-label").textContent = character.name;
  temp.querySelector(".wizard-coat").setAttribute("fill", character.coatColor);
  temp.querySelector(".wizard-eyes").setAttribute("fill", character.eyesColor);


  return temp;
}

function openPopup() {
  setup.classList.remove("hidden");
  document.addEventListener("keydown", onPopupEscapePress);

}

function closePopup() {
  setup.classList.add("hidden");
  document.removeEventListener("keydown", onPopupEscapePress);
}

function onPopupEscapePress(evt) {
  if (evt.keyCode === ESCAPE_KEYCODE
      && evt.target != setupUserName) {
    console.log(evt);
    closePopup();
  }
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


// function setupSubmitClickHandler(evt) {
//   console.log("pressed");
// }

//VARIABLES DECLARATION
var ENTER_KEYCODE = 13;
var ESCAPE_KEYCODE = 27;

var setup = document.querySelector(".setup");
var characterTemplate = document.querySelector("#similar-wizard-template");
var similarList = document.querySelector(".setup-similar-list");
var setupOpen = document.querySelector(".setup-open");
var setupClose = setup.querySelector(".setup-close");
var setupUserName = setup.querySelector(".setup-user-name");
var setupSubmit = setup.querySelector(".setup-submit");
var wizardCoat = setup.querySelector(".wizard-coat");
var wizardEyes = setup.querySelector(".wizard-eyes");
var wizardFireball = setup.querySelector(".setup-fireball-wrap");
// var setupOpenIcon = document.querySelector(".setup-open-icon");
var similarCharacters = [];
var similarCharactersNodes = [];
var countOfSimilarCharacters = 4;

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
]

//make visible wizard setup menu
// setup.classList.remove("hidden");
setupOpen.addEventListener("click", openPopup);
setupOpen.addEventListener("keydown", function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener("click", closePopup);
setupClose.addEventListener("keydown", function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

wizardCoat.addEventListener("click", nextCoatColor);
wizardEyes.addEventListener("click", nextEyesColor);
wizardFireball.addEventListener("click", nextFireballColor);

// setupSubmit.addEventListener("click", setupSubmitClickHandler);
// setupSubmit.addEventListener("keydown", setupSubmitClickHandler);


for (let i = 0; i < countOfSimilarCharacters; i++) {
  //creating similar character object
  similarCharacters.push(createSimilarCharacter(firstNames, secondNames,
          coatColors, eyesColors));
  //creating similar character Node
  similarCharactersNodes.push(createNodeSimilarCharacter(characterTemplate, similarCharacters[i]));
  //insert similar character Node into html
  similarList.appendChild(similarCharactersNodes[i]);
}

//make visible similar list
document.querySelector(".setup-similar").classList.remove("hidden");
