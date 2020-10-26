'use strict';

(function () {
  const mapBlock = document.querySelector(`.map`);
  const cardsTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

  const mapFiltersContainer = mapBlock.querySelector(`.map__filters-container`);

  const cardElement = cardsTemplate.cloneNode(true);
  const cardAvatar = cardElement.querySelector(`.popup__avatar`);
  const cardTitle = cardElement.querySelector(`.popup__title`);

  const cardAddress = cardElement.querySelector(`.popup__text--address`);
  const cardPrice = cardElement.querySelector(`.popup__text--price`);
  const cardType = cardElement.querySelector(`.popup__type`);

  const cardRoomsGuests = cardElement.querySelector(`.popup__text--capacity`);
  const cardTime = cardElement.querySelector(`.popup__text--time`);
  const cardFeatures = cardElement.querySelector(`.popup__features`);

  const cardDescription = cardElement.querySelector(`.popup__description`);
  const cardPhotoes = cardElement.querySelector(`.popup__photos`);
  const cardPhotoesImg = cardPhotoes.querySelector(`img`);

  const setCardInfo = (array) => {
    cardAvatar.src = array[0].author.avatar;
    cardTitle.textContent = array[0].offer.title;

    cardAddress.textContent = array[0].offer.address;
    cardPrice.textContent = array[0].offer.price + `₽/ночь`;

    for (let i = 0; i <= window.constants.ADVERTISEMENT_TYPES.length; i++) {
      const currentType = window.constants.ADVERTISEMENT_TYPES[i];

      if (array[0].offer.type === currentType) {
        cardType.textContent = currentType.translation;
      }
    }

    const roomsEnding = window.util.pluralizeWord(array[0].offer.rooms, [`комната`, `комнаты`]);
    const guestsEnding = window.util.pluralizeWord(array[0].offer.guests, [`гостя`, `гостей`]);

    cardRoomsGuests.textContent = array[0].offer.rooms + ` ` + roomsEnding +
    ` для ` + array[0].offer.guests + ` ` + guestsEnding;

    cardTime.textContent = `Заезд после ` + array[0].offer.checkin +
    `, выезд до ` + array[0].offer.checkout;

    cardFeatures.textContent = array[0].offer.features;
    cardDescription.textContent = array[0].offer.description;
    cardPhotoesImg.src = array[0].offer.photos[window.util.getRandomRangeElement(0, 1)];

    const photoesImgClone = cardPhotoesImg.cloneNode(true);
    cardPhotoes.appendChild(photoesImgClone);
    cardPhotoesImg.src = array[0].offer.photos[window.util.getRandomRangeElement(0, 1)];

    mapBlock.insertBefore(cardElement, mapFiltersContainer);
  };

  window.card = {
    setCardInfo,
  };
})();
