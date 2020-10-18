'use strict';

const PIN_OFFSET_X = 25;
const PIN_OFFSET_Y = 70;

const MAIN_PIN_WIDTH = 62;
const MAIN_PIN_HEIGHT = 62;
const MAIN_PIN_ARROW = 22;

const ENTER_BTN = `Enter`;
const ESC_BTN = `Escape`;
const LEFT_BTN = 0;

const DATA = {
  amount: 8,
  avatar: [`01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`],
  title: [`Заголовок предложения 1`, `Заголовок предложения 2`, `Заголовок предложения 3`, `Заголовок предложения 4`, `Заголовок предложения 5`, `Заголовок предложения 6`, `Заголовок предложения 7`, `Заголовок предложения 8`],
  price: {
    min: 0,
    max: 100000
  },
  type: {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  },
  rooms: {
    min: 1,
    max: 100
  },
  guests: {
    min: 0,
    max: 100
  },
  checkin: [`12:00`, `13:00`, `14:00`],
  checkout: [`12:00`, `13:00`, `14:00`],
  features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  descriptions: [`Cтрока с описанием 1`, `Cтрока с описанием 2`, `Cтрока с описанием 3`, `Cтрока с описанием 4`, `Cтрока с описанием 5`, `Cтрока с описанием 6`, `Cтрока с описанием 7`, `Cтрока с описанием 8`],
  photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
};

const getRandomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getOffer = function (index) {
  const locationX = getRandomInteger(50, 1150);
  const locationY = getRandomInteger(130, 630);

  return {
    author: {
      avatar: `img/avatars/user${DATA.avatar[index]}.png`,
    },
    offer: {
      title: DATA.title[index],
      address: `${locationX}, ${locationX}`,
      price: getRandomInteger(DATA.price.min, DATA.price.max),
      type: DATA.type[getRandomInteger(0, Object.keys(DATA.type).length)],
      rooms: getRandomInteger(DATA.rooms.min, DATA.rooms.max),
      guests: getRandomInteger(DATA.guests.min, DATA.guests.max),
      checkin: DATA.checkin[getRandomInteger(0, DATA.checkin.length)],
      checkout: DATA.checkout[getRandomInteger(0, DATA.checkout.length)],
      features: DATA.features.slice(0, getRandomInteger(0, DATA.features.length)),
      description: DATA.descriptions[index],
      photos: DATA.photos,
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

const getOffers = function () {
  const array = [];

  for (let i = 0; i < DATA.amount; i++) {
    array.push(getOffer(i));
  }

  return array;
};

const offers = getOffers();

const map = document.querySelector(`.map`);

// Pins
const mapPins = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content;

const renderPin = function (item) {
  const pinItem = pinTemplate.cloneNode(true);

  const pinPositionLeft = parseInt(`${item.location.x} + ${PIN_OFFSET_X}`, 10);
  const pinPositionTop = parseInt(`${item.location.y} + ${PIN_OFFSET_Y}`, 10);

  pinItem.querySelector(`.map__pin`).style.left = `${pinPositionLeft}px`;
  pinItem.querySelector(`.map__pin`).style.top = `${pinPositionTop}px`;
  pinItem.querySelector(`img`).src = item.author.avatar;
  pinItem.querySelector(`img`).alt = item.offer.title;

  return pinItem;
};

const createPins = function () {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < DATA.amount; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }

  mapPins.appendChild(fragment);
};

// Cards
const mapFiltersContainer = map.querySelector(`.map__filters-container`);

const createFeatures = function (item, card) {
  const arrayFeaturesItems = item.offer.features;
  const popupFeatures = card.querySelector(`.popup__features`);
  popupFeatures.innerHTML = ``;

  for (let i = 0; i < arrayFeaturesItems.length; i++) {
    const element = document.createElement(`li`);
    element.classList.add(`popup__feature`);
    element.classList.add(`popup__feature--${arrayFeaturesItems[i]}`);
    element.textContent = arrayFeaturesItems[i];
    popupFeatures.appendChild(element);
  }
};

const createPhotos = function (item, card) {
  const popupPhotos = card.querySelector(`.popup__photos`);
  const popupPhoto = card.querySelector(`.popup__photo`);
  popupPhotos.innerHTML = ``;

  for (let i = 0; i < item.offer.photos.length; i++) {
    const photo = popupPhoto.cloneNode(true);
    photo.src = item.offer.photos[i];
    popupPhotos.appendChild(photo);
  }
};

const renderCard = function (item) {
  const cardTemplate = document.querySelector(`#card`).content;
  const cardItem = cardTemplate.cloneNode(true);

  cardItem.querySelector(`.popup__title`).textContent = item.offer.title;
  cardItem.querySelector(`.popup__text--address`).textContent = item.offer.address;
  cardItem.querySelector(`.popup__text--price`).textContent = `${item.offer.price} ₽/ночь`;
  cardItem.querySelector(`.popup__type`).textContent = item.offer.type;
  cardItem.querySelector(`.popup__text--capacity`).textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  cardItem.querySelector(`.popup__text--time`).textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
  createFeatures(item, cardItem);
  cardItem.querySelector(`.popup__description`).textContent = item.offer.description;
  createPhotos(item, cardItem);

  return cardItem;
};

const createCard = function (pinId) {
  map.insertBefore(renderCard(offers[pinId]), mapFiltersContainer);
};

const hideCards = function () {
  const cards = map.querySelectorAll(`.map__card`);
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.add(`hidden`);
  }
};

const closePopup = function () {
  hideCards();

  document.removeEventListener(`keydown`, function (evt) {
    if (evt.key === ESC_BTN) {
      evt.preventDefault();
      hideCards();
    }
  });
};

// States page
const adForm = document.querySelector(`.ad-form`);
const adFormFieldset = adForm.querySelectorAll(`fieldset`);

const mapForm = document.querySelector(`.map__filters`);
const mapFormFieldset = mapForm.querySelectorAll(`.map__filter`);

const inputAddress = adForm.querySelector(`[name="address"]`);

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

const setActivePage = function () {
  setEnableForm(adFormFieldset);
  setEnableForm(mapFormFieldset);

  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
};

setDisableForm(adFormFieldset);
setDisableForm(mapFormFieldset);

// Start move pin
(function () {
  const mainPin = document.querySelector(`.map__pin--main`);

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

  mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    /* if (!map.classList.contains(`map--faded`)) {
      return false;
    } */

    if (evt.button === LEFT_BTN) {
      setActivePage();
    }

    getElementCoords(mainPin, MAIN_PIN_ARROW);

    createPins();

    const mapPinItems = mapPins.querySelectorAll(`.map__pin[type="button"]`);

    const setPinsDataAttributes = function () {
      for (let i = 0; i < mapPinItems.length; i++) {
        mapPinItems[i].dataset.id = i;
      }
    };

    setPinsDataAttributes();

    for (let i = 0; i < mapPinItems.length; i++) {
      mapPinItems[i].addEventListener(`click`, function (evt) {
        const pinButton = evt.target.closest(`.map__pin`);
        const pinId = pinButton.dataset.id;

        /* if (pinButton.classList.contains(`map__pin--main`)) {
          return false;
        } */

        hideCards();
        createCard(pinId);

        const cardClose = document.querySelectorAll(`.popup__close`);

        for (let j = 0; j < cardClose.length; j++) {
          cardClose[j].addEventListener(`click`, function () {
            closePopup();
          });

          cardClose[j].addEventListener(`keydown`, function () {
            if (evt.key === ESC_BTN) {
              closePopup();
            }
          });
        }
      });
    }

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
    if (evt.key === ENTER_BTN) {
      setActivePage();
      getElementCoords(mainPin, MAIN_PIN_ARROW);

      createPins();
    }
  });
})();

// Form validate
// Rooms
const rooms = adForm.querySelector(`#room_number`);

// Capacity
const capacity = adForm.querySelector(`#capacity`);
const roomSettings = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};

const setDisabledElements = function () {
  const capacityOptions = Array.from(capacity.options);

  capacityOptions.forEach(function (elem) {
    elem.disabled = !roomSettings[rooms.value].includes(elem.value); // [1,2,3].includes(это значение попадает в значение или нет)
    elem.selected = !elem.disabled;
  });
};

setDisabledElements();

rooms.addEventListener(`change`, function () {
  setDisabledElements();
});

// Title
const title = document.querySelector(`#title`);
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
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
    title.setCustomValidity(`Заголовок должен состоять минимум из ${MIN_TITLE_LENGTH} символов`);

  } else if (title.validity.tooLong) {
    title.setCustomValidity(`Заголовок не должен превышать ${MAX_TITLE_LENGTH} символов`);

  } else if (title.validity.valueMissing) {
    title.setCustomValidity(`Обязательное поле`);
  } else {
    title.setCustomValidity(``);
  }
});

type.addEventListener(`change`, function () {
  if (price.value < typeSettings[type.value]) {
    price.setCustomValidity(`Минимальная цена за ночь ${typeSettings[type.value]}`);
  }
});

price.addEventListener(`invalid`, function () {
  if (price.validity.rangeOverflow) {
    price.setCustomValidity(`Максимальная цена за ночь ${MAX_PRICE}`);

  } else if (price.value < typeSettings[type.value]) {
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
