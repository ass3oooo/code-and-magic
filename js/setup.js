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

//VARIABLES DECLARATION
var setup = document.querySelector(".setup");
var characterTemplate = document.querySelector("#similar-wizard-template");
var similarList = document.querySelector(".setup-similar-list");
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

//END DECLARATION

//make visible wizard setup menu
setup.classList.remove("hidden");

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
