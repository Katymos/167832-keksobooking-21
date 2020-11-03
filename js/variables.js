'use strict';

(function () {
  const ENTER_BTN = `Enter`;
  const ESC_BTN = `Escape`;
  const LEFT_BTN = 0;

  window.variables = {
    isEscEvent: function (evt, action) {
      if (evt.code === ESC_BTN) {
        action();
      }
    },
    isEnterEvent: ENTER_BTN,
    isLeftButtonEvent: LEFT_BTN
  };
})();
