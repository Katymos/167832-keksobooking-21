'use strict';

(function () {

  // Form validate
  // Rooms
  const rooms = document.querySelector(`#room_number`);

  // Capacity
  const capacity = document.querySelector(`#capacity`);
  const roomSettings = {
    1: [`1`],
    2: [`1`, `2`],
    3: [`1`, `2`, `3`],
    100: [`0`]
  };

  const setDisabledElements = function () {
    const capacityOptions = Array.from(capacity.options);

    capacityOptions.forEach(function (elem) {
      elem.disabled = !roomSettings[rooms.value].includes(elem.value);
      elem.selected = !elem.disabled;
    });
  };

  setDisabledElements();

  rooms.addEventListener(`change`, function () {
    setDisabledElements();
  });

  // Title
  const title = document.querySelector(`#title`);

  const TITLE_OPTIONS = {
    minLength: 30,
    maxLength: 100
  };

  // Type
  const type = document.querySelector(`#type`);
  const typeSettings = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  // Price
  const price = document.querySelector(`#price`);
  const MAX_PRICE = 1000000;
  // Times
  const timein = document.querySelector(`#timein`);
  const timeout = document.querySelector(`#timeout`);

  title.addEventListener(`invalid`, function () {
    if (title.validity.tooShort) {
      title.setCustomValidity(`Заголовок должен состоять минимум из ${TITLE_OPTIONS.minLength} символов`);

    } else if (title.validity.tooLong) {
      title.setCustomValidity(`Заголовок не должен превышать ${TITLE_OPTIONS.maxLength} символов`);

    } else if (title.validity.valueMissing) {
      title.setCustomValidity(`Обязательное поле`);
    } else {
      title.setCustomValidity(``);
    }
  });

  type.addEventListener(`change`, function () {
    price.placeholder = `${typeSettings[type.value]}`;
    price.min = `${typeSettings[type.value]}`;
  });

  price.addEventListener(`invalid`, function () {
    if (price.validity.rangeOverflow) {
      price.setCustomValidity(`Максимальная цена за ночь ${MAX_PRICE}`);

    } else if (price.validity.rangeUnderflow) {
      price.setCustomValidity(`Минимальная цена за ночь ${typeSettings[type.value]}`);

    } else {
      price.setCustomValidity(``);
    }
  });

  timein.addEventListener(`change`, function () {
    timeout.selectedIndex = timein.selectedIndex;
  });

  timeout.addEventListener(`change`, function () {
    timein.selectedIndex = timeout.selectedIndex;
  });
})();
