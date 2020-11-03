'use strict';

(function () {
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


  const getOffer = function (index) {
    const locationX = window.utils.getRandom(50, 1150);
    const locationY = window.utils.getRandom(130, 630);

    return {
      author: {
        avatar: `img/avatars/user${DATA.avatar[index]}.png`,
      },
      offer: {
        title: DATA.title[index],
        address: `${locationX}, ${locationX}`,
        price: window.utils.getRandom(DATA.price.min, DATA.price.max),
        type: DATA.type[window.utils.getRandom(0, Object.keys(DATA.type).length)],
        rooms: window.utils.getRandom(DATA.rooms.min, DATA.rooms.max),
        guests: window.utils.getRandom(DATA.guests.min, DATA.guests.max),
        checkin: DATA.checkin[window.utils.getRandom(0, DATA.checkin.length)],
        checkout: DATA.checkout[window.utils.getRandom(0, DATA.checkout.length)],
        features: DATA.features.slice(0, window.utils.getRandom(0, DATA.features.length)),
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

  window.data = getOffers();
})();
