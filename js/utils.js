'use strict';

(function () {
  const getRandomInteger = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  window.utils = {
    getRandom: getRandomInteger
  };
})();
