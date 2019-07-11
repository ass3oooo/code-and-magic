'use strict';

(function() {
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
      eyesColor: eyesColors[1],
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


  // window.similarWizards = similarWizards;
  window.firstNames = firstNames;
  window.secondNames = secondNames;
  window.coatColors = coatColors;
  window.eyesColors = eyesColors;
  window.fireballColors = fireballColors;
})();
