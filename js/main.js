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
  type: ['palace', 'flat', 'house', 'bungalow'],
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

const map = document.querySelector('.map');
map.classList.remove('map--faded');

const mapPins = document.querySelector('.map__pins');
const mapTemplate = document.querySelector('#pin').content;

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
      type: DATA.type[getRandomInteger(0, DATA.type.length)],
      rooms: getRandomInteger(DATA.rooms.min, DATA.rooms.max),
      guests: getRandomInteger(DATA.guests.min, DATA.guests.max),
      checkin: DATA.checkin[getRandomInteger(0, DATA.checkin.length)],
      checkout: DATA.checkout[getRandomInteger(0, DATA.checkout.length)],
      features: DATA.features.slice(0, getRandomInteger(0, DATA.features.length - 1)),
      description: DATA.descriptions[index],
      photos: DATA.photos[getRandomInteger(0, DATA.photos.length)]
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

getOffers();

const renderPin = function (items) {
  const pinItem = mapTemplate.cloneNode(true);

  const pinPositionLeft = parseInt(`${items.location.x} + ${PIN_OFFSET_X}`, 10);
  const pinPositionTop = parseInt(`${items.location.y} + ${PIN_OFFSET_Y}`, 10);

  pinItem.querySelector('.map__pin').style.left = `${pinPositionLeft}px`;
  pinItem.querySelector('.map__pin').style.top = `${pinPositionTop}px`;
  pinItem.querySelector('img').src = items.author.avatar;
  pinItem.querySelector('img').alt = items.offer.title;

  return pinItem;
};

const createPins = function () {
  const offers = getOffers();
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < DATA.amount; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }

  mapPins.appendChild(fragment);
};

createPins();
