'use strict';
(function () {
  window.pluralize = {
    pluralizeWord: (arrayElement, array) => {
      if (arrayElement === 1) {
        return array[0];
      } else {
        return array[1];
      }
    }
  };
})();
