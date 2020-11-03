'use strict';

(function () {
  const MAIN_PIN_WIDTH = 62;
  const MAIN_PIN_HEIGHT = 62;
  const MAIN_PIN_ARROW = 22;

  const map = document.querySelector(`.map`);

  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldset = adForm.querySelectorAll(`fieldset`);

  const mapForm = document.querySelector(`.map__filters`);
  const mapFormFieldset = mapForm.querySelectorAll(`.map__filter`);

  // Start move pin
  const mainPin = document.querySelector(`.map__pin--main`);
  const inputAddress = adForm.querySelector(`[name="address"]`);

  const mainPinWidthHalf = mainPin.offsetWidth / 2;
  const mainPinHeightHalf = mainPin.offsetHeight / 2;

  const limitsMapSize = {
    top: map.offsetTop,
    right: map.offsetWidth - MAIN_PIN_WIDTH,
    bottom: map.offsetHeight - MAIN_PIN_HEIGHT,
    left: map.offsetLeft - MAIN_PIN_WIDTH
  };

  const getElementCoords = function (element, gap) {
    const mainPinLeftCoord = Math.ceil(parseInt(element.style.left, 10) + mainPinWidthHalf);
    const mainPinTopCoord = Math.ceil(parseInt(element.style.top, 10) + mainPinHeightHalf + gap);

    inputAddress.value = `${mainPinLeftCoord}, ${mainPinTopCoord}`;
  };

  getElementCoords(mainPin, 0);

  // Page states

  const setDisableForm = function (elements) {
    elements.forEach((element) => {
      element.disabled = true;
    });
  };

  const setEnableForm = function (elements) {
    elements.forEach((element) => {
      element.disabled = false;
    });
  };

  setDisableForm(adFormFieldset);
  setDisableForm(mapFormFieldset);

  // let isActivePage = false;

  const setActivePage = function () {
    setEnableForm(adFormFieldset);
    setEnableForm(mapFormFieldset);

    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    // isActivePage = true;
  };

  mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    // Добавить проверку isActivePage

    if (evt.button === window.variables.isLeftButtonEvent) {
      setActivePage();
    }

    getElementCoords(mainPin, MAIN_PIN_ARROW);

    window.pin.create(window.data);

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((mainPin.offsetLeft - shift.x) < limitsMapSize.left) {
        mainPin.style.left = limitsMapSize.left + `px`;
      } else if ((mainPin.offsetLeft - shift.x) > limitsMapSize.right) {
        mainPin.style.left = limitsMapSize.right + `px`;
      }

      if ((mainPin.offsetTop - shift.y) < limitsMapSize.top) {
        mainPin.style.top = limitsMapSize.top + `px`;
      } else if ((mainPin.offsetTop - shift.y) > limitsMapSize.bottom) {
        mainPin.style.top = limitsMapSize.bottom + `px`;
      }

      mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;
      mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;

      getElementCoords(mainPin, MAIN_PIN_ARROW);
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === window.variables.isEnterEvent) {
      setActivePage();
      getElementCoords(mainPin, MAIN_PIN_ARROW);

      window.pin.create(window.data);
    }
  });
})();
