'use strict';

(function() {
  window.processWizards = function(data) {
    window.writeWizards(data);
    window.findSimilarWizards();
    window.renderSimilarWizards();
  }
})();

(function() {
  window.writeWizards = function(data) {
    window.wizards = data;
  }
})();
