'use strict';

const avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
const titles = [
  'Заголовок предложения 1',
  'Заголовок предложения 2',
  'Заголовок предложения 3',
  'Заголовок предложения 4',
  'Заголовок предложения 5',
  'Заголовок предложения 6',
  'Заголовок предложения 7',
  'Заголовок предложения 8'
];

let getRandomInteger = function (min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const addresses = [
  {
    x: getRandomInteger(130, 630),
    y: getRandomInteger(130, 630)
  },
  {
    x: getRandomInteger(130, 630),
    y: getRandomInteger(130, 630)
  },
  {
    x: getRandomInteger(130, 630),
    y: getRandomInteger(130, 630)
  },
  {
    x: getRandomInteger(130, 630),
    y: getRandomInteger(130, 630)
  },
  {
    x: getRandomInteger(130, 630),
    y: getRandomInteger(130, 630)
  },
  {
    x: getRandomInteger(130, 630),
    y: getRandomInteger(130, 630)
  },
  {
    x: getRandomInteger(130, 630),
    y: getRandomInteger(130, 630)
  },
  {
    x: getRandomInteger(130, 630),
    y: getRandomInteger(130, 630)
  }
];

const prices = [1050, 1060, 1070, 1080, 1090, 2000, 2010, 2020];
const typeHouses = ['palace', 'flat', 'house', 'bungalow'];
const rooms = [1, 2, 3, 4, 5];
const guests = [1, 2, 3];
const checkinTimes = ['12:00', '13:00', '14:00'];
const checkoutTimes = ['12:00', '13:00', '14:00'];
const featureses = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const descriptions = [
  `Cтрока с описанием 1`,
  `Cтрока с описанием 2`,
  `Cтрока с описанием 3`,
  `Cтрока с описанием 4`,
  `Cтрока с описанием 5`,
  `Cтрока с описанием 6`,
  `Cтрока с описанием 7`,
  `Cтрока с описанием 8`
];
const photos = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

const PIN_OFFSET_X = 25;
const PIN_OFFSET_Y = 70;

const map = document.querySelector('.map');
map.classList.remove('map--faded');

const mapPins = document.querySelector('.map__pins');
const mapTemplate = document.querySelector('#pin').content;

const similarAdsLength = 8;
const similarAdsData = [];

const createItem = function (items, length) {
  for (let i = 0; i < length; i++) {
    items[i] = {
      "author": {
        "avatar": `img/avatars/user${avatars[i]}.png`,
      },
      "offer": {
        "title": `${titles[i]}`,
        "address": `${addresses[i].x}  ${addresses[i].y}`,
        "price": `${prices[i]}`,
        "type": `${typeHouses[getRandomInteger(0, typeHouses.length - 1)]}`,
        "rooms": `${rooms[getRandomInteger(0, rooms.length - 1)]}`,
        "guests": `${guests[getRandomInteger(0, guests.length - 1)]}`,
        "checkin": `${checkinTimes[getRandomInteger(0, checkinTimes.length - 1)]}`,
        "checkout": `${checkoutTimes[getRandomInteger(0, checkoutTimes.length - 1)]}`,
        "features": `${featureses[getRandomInteger(0, featureses.length - 1)]}`,
        "description": `${descriptions[i]}`,
        "photos": `${photos[getRandomInteger(0, photos.length - 1)]}`
      },
      "location": {
        "x": `${getRandomInteger(50, 1150)}`,
        "y": `${getRandomInteger(130, 630)}`
      }
    };

    items.push(items[i]);
  }
};

createItem(similarAdsData, similarAdsLength);

const renderPins = function (items) {
  const pinItem = mapTemplate.cloneNode(true);

  const pinPositionLeft = parseInt(`${items.location.x} + ${PIN_OFFSET_X}`, 10);
  const pinPositionTop = parseInt(`${items.location.y} + ${PIN_OFFSET_Y}`, 10);

  pinItem.querySelector('img').setAttribute('src', items.author.avatar);
  pinItem.querySelector('img').setAttribute('alt', `${items.offer.title}`);
  pinItem.querySelector('.map__pin').setAttribute('style', `left: ${pinPositionLeft}px; top: ${pinPositionTop}px;`);

  return pinItem;
};

const createPins = function () {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < similarAdsData.length; i++) {
    fragment.appendChild(renderPins(similarAdsData[i]));
  }

  mapPins.appendChild(fragment);
};

createPins();
