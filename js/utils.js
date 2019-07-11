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
})();
