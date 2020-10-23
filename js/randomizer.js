'use strict';
(function () {
  window.randomizer = {
    getRandomArrayElement: (arr) => {
      const i = Math.floor(Math.random() * arr.length);
      const random = arr[i];
      return random;
    },

    getRandomRangeElement: (min, max) => {
      const rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },

    getShuffledArray: (arr) => {
      let j; let x; let i;
      for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
      }
      return arr;
    }
  };
})();
