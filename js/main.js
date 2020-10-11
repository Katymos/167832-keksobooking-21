'use strict';

const PIN_OFFSET_X = 25;
const PIN_OFFSET_Y = 70;

const DATA = {
  amount: 8,
  avatar: ['01', '02', '03', '04', '05', '06', '07', '08'],
  title: ['Заголовок предложения 1', 'Заголовок предложения 2', 'Заголовок предложения 3', 'Заголовок предложения 4', 'Заголовок предложения 5', 'Заголовок предложения 6', 'Заголовок предложения 7', 'Заголовок предложения 8'],
  price: {
    min: 0,
    max: 100000
  },
  type: {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало'
  },
  rooms: {
    min: 1,
    max: 100
  },
  guests: {
    min: 0,
    max: 100
  },
  checkin: ['12:00', '13:00', '14:00'],
  checkout: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  descriptions: [`Cтрока с описанием 1`, `Cтрока с описанием 2`, `Cтрока с описанием 3`, `Cтрока с описанием 4`, `Cтрока с описанием 5`, `Cтрока с описанием 6`, `Cтрока с описанием 7`, `Cтрока с описанием 8`],
  photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
};

const getRandomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const map = document.querySelector(`.map`);

const mapPins = document.querySelector(`.map__pins`);
const mapTemplate = document.querySelector(`#pin`).content;

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
      features: DATA.features.slice(0, getRandomInteger(0, DATA.features.length - 1)),
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

// Pins
const renderPin = function (items) {
  const pinItem = mapTemplate.cloneNode(true);

  const pinPositionLeft = parseInt(`${items.location.x} + ${PIN_OFFSET_X}`, 10);
  const pinPositionTop = parseInt(`${items.location.y} + ${PIN_OFFSET_Y}`, 10);

  pinItem.querySelector(`.map__pin`).style.left = `${pinPositionLeft}px`;
  pinItem.querySelector(`.map__pin`).style.top = `${pinPositionTop}px`;
  pinItem.querySelector(`img`).src = items.author.avatar;
  pinItem.querySelector(`img`).alt = items.offer.title; // offers[i].offer.title

  return pinItem;
};

const createPins = function () {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < DATA.amount; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }

  mapPins.appendChild(fragment);
};

//createPins();

// Cards
const mapFiltersContainer = document.querySelector(`.map__filters-container`);
const cardTemplate = document.querySelector(`#card`).content;
const cardItem = cardTemplate.cloneNode(true);

const popupFeatures = cardItem.querySelector(`.popup__features`);
const popupPhotos = cardItem.querySelector(`.popup__photos`);
const popupPhoto = cardItem.querySelector(`.popup__photo`);

const createFeatures = function (item) {
  const arrayFeaturesItems = offers[0].offer.features;
  item.innerHTML = ``;

  for (let i = 0; i < arrayFeaturesItems.length; i++) {
    const element = document.createElement(`li`);
    element.classList.add(`popup__feature`);
    element.classList.add(`popup__feature--${arrayFeaturesItems[i]}`);
    element.textContent = arrayFeaturesItems[i];
    item.appendChild(element);
  }
};

const createPhotos = function (item) {
  item.innerHTML = ``;

  for (let i = 0; i < offers[0].offer.photos.length; i++) {
    const photo = popupPhoto.cloneNode(true);

    photo.src = offers[0].offer.photos[i];
    item.appendChild(photo);
  }
};

const renderCard = function (item) {
  cardItem.querySelector(`.popup__title`).textContent = item.offer.title;
  cardItem.querySelector(`.popup__text--address`).textContent = item.offer.address;
  cardItem.querySelector(`.popup__text--price`).textContent = `${item.offer.price} ₽/ночь`;
  cardItem.querySelector(`.popup__type`).textContent = item.offer.type;
  cardItem.querySelector(`.popup__text--capacity`).textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  cardItem.querySelector(`.popup__text--time`).textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;

  createFeatures(popupFeatures);

  cardItem.querySelector(`.popup__description`).textContent = item.offer.description;

  createPhotos(popupPhotos);

  return cardItem;
};

const createCard = function () {
  map.insertBefore(renderCard(offers[0]), mapFiltersContainer);
};

//createCard();

// States fpage
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

const setActivePage = function (elements) {
  setEnableForm(adFormFieldset);
  setEnableForm(mapFormFieldset);

  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
};

setDisableForm(adFormFieldset);
setDisableForm(mapFormFieldset);

// Start move pin
(function () {
  const mainPin = document.querySelector(`.map__pin`);

  const mainPinWidth = mainPin.offsetWidth;
  const mainPinHeight = mainPin.offsetHeight;

  const mainPinWidthHalf = mainPin.offsetWidth / 2;
  const mainPinHeightHalf = mainPin.offsetHeight / 2;

  const getElementCoords = function (element) {
    const mainPinLeftCoord = Math.ceil(parseInt(element.style.left) + mainPinWidthHalf);
    const mainPinTopCoord = Math.ceil(parseInt(element.style.top) + mainPinHeightHalf);

    return `${mainPinLeftCoord}, ${mainPinTopCoord}`
  }

  inputAddress.value = getElementCoords(mainPin);

  /*const getPinCenter(width, heigh) {                             // Error params ???
    const widthHalf = Math.ceil(width / 2);
    const heightHalf = Math.ceil(height / 2);
  }*/


  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    setActivePage();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      inputAddress.value = getElementCoords(mainPin);

    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    setActivePage();
  }
});

})();

// Form validate
// Rooms
const rooms = adForm.querySelector(`#room_number`);
const roomsOptions = rooms.querySelectorAll(`option`);

// Capacity
const capacity = adForm.querySelector(`#capacity`);


const roomSettings = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

rooms.addEventListener('change', function (evt) {
  const roomValue = evt.target.value;
  const capacityOptions = Array.from(capacity.options);


  capacityOptions.forEach(function (elem) {
    console.log(roomSettings[capacity.value]);
    console.log(typeof elem.value);

    elem.disabled = !roomSettings[capacity.value].includes(elem.value); // [1,2,3].includes(это значение попадает в значение или нет)
  });








  //console.log(roomValue);


  //console.log(roomSettings[roomValue]);

  /*for (let j = 0; j < capacityOptions.length; j++) {
    capacityOptions[j].disabled = true;
  }


    console.log(roomSettings[roomValue]);
    //console.log(capacityOptions[i]);
    //capacityOptions[i].disabled = false;

    roomSettings[roomValue].forEach(function (value) {
      console.log(value);

      //console.log(capacityOptions[value]);
      capacityOptions[value].disabled = false;

    });*/




});

/*rooms.addEventListener('change', function (evt) {
  const roomValue = evt.target.value;
  console.log(roomValue);

  for (var i = 0; i < capacityOptions.length; i++) {

    if (capacityOptions[i].value !== roomValue) {
      capacityOptions[i].disabled = true;
    } else {
      capacityOptions[i].disabled = false;
    }
  }
});*/

capacity.addEventListener('change', function () {

});
