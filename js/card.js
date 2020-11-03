'use strict';

(function () {
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  const map = document.querySelector(`.map`);

  const createFeatures = function (features, popupFeatures) {
    popupFeatures.innerHTML = ``;

    for (let i = 0; i < features.length; i++) {
      const element = document.createElement(`li`);
      element.classList.add(`popup__feature`, `popup__feature--${features[i]}`);
      element.textContent = features[i];
      popupFeatures.appendChild(element);
    }
  };

  const createPhotos = function (photos, popupPhotos) {
    const popupPhoto = popupPhotos.querySelector(`.popup__photo`);
    popupPhotos.innerHTML = ``;

    for (let i = 0; i < photos.length; i++) {
      const photo = popupPhoto.cloneNode(true);
      photo.src = photos[i];
      popupPhotos.appendChild(photo);
    }
  };

  const cardTemplate = document.querySelector(`#card`)
    .content
    .querySelector(`.map__card`);

  const declensionWords = function (item) {
    let roomsCount = item.offer.rooms;
    let guestsCount = item.offer.guests;

    let rooms;
    let guests;

    if (roomsCount > 20) {
      roomsCount = roomsCount % 10;
    }

    if (roomsCount === 1) {
      rooms = `комнатa`;
    } else if (roomsCount > 1 && roomsCount < 5) {
      rooms = `комнаты`;
    } else {
      rooms = `комнат`;
    }

    if (guestsCount > 20) {
      guestsCount = guestsCount % 10;
    }

    if (guestsCount === 1) {
      guests = `гостя`;
    } else {
      guests = `гостей`;
    }

    return `${item.offer.rooms} ${rooms} для ${item.offer.guests} ${guests}`;
  };

  const hideCard = function () {
    const card = document.querySelector(`.map__card`);

    if (card) {
      card.querySelector(`.popup__close`).removeEventListener(`click`, onCloseClick);
      document.removeEventListener(`keydown`, onCloseKeydown);

      card.remove();
    }
  };

  const onCloseKeydown = function (evt) {
    window.variables.isEscEvent(evt, hideCard);
  };

  const onCloseClick = function () {
    hideCard();
  };

  const createCard = function (item) {
    const cardItem = cardTemplate.cloneNode(true);
    cardItem.querySelector(`.popup__title`).textContent = item.offer.title;
    cardItem.querySelector(`.popup__text--address`).textContent = item.offer.address;
    cardItem.querySelector(`.popup__text--price`).textContent = `${item.offer.price} ₽/ночь`;
    cardItem.querySelector(`.popup__type`).textContent = item.offer.type;
    cardItem.querySelector(`.popup__text--capacity`).textContent = declensionWords(item);
    cardItem.querySelector(`.popup__text--time`).textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
    createFeatures(item.offer.features, cardItem.querySelector(`.popup__features`));
    cardItem.querySelector(`.popup__description`).textContent = item.offer.description;
    createPhotos(item.offer.photos, cardItem.querySelector(`.popup__photos`));

    map.insertBefore(cardItem, mapFiltersContainer);

    cardItem.querySelector(`.popup__close`).addEventListener(`click`, onCloseClick);
    document.addEventListener(`keydown`, onCloseKeydown);
  };

  window.card = {
    create: createCard,
    remove: hideCard
  };
})();
