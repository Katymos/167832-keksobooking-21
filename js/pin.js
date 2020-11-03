'use strict';

(function () {
  const PIN_OFFSET_X = 25;
  const PIN_OFFSET_Y = 70;

  const mapPins = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);

  const renderPin = function (item) {
    const pinItem = pinTemplate.cloneNode(true);

    const pinPositionLeft = item.location.x + PIN_OFFSET_X;
    const pinPositionTop = item.location.y + PIN_OFFSET_Y;

    pinItem.style.left = `${pinPositionLeft}px`;
    pinItem.style.top = `${pinPositionTop}px`;

    pinItem.querySelector(`img`).src = item.author.avatar;
    pinItem.querySelector(`img`).alt = item.offer.title;

    pinItem.addEventListener(`click`, function () {
      window.card.remove();
      window.card.create(item);
    });

    return pinItem;
  };

  const createPins = function (data) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
      fragment.appendChild(renderPin(data[i]));
    }

    mapPins.appendChild(fragment);
  };

  window.pin = {
    create: createPins,
    // remove: removePins
  };
})();
