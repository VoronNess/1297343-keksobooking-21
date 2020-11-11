'use strict';

(function () {
  const mapBlock = document.querySelector(`.map`);
  const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

  const mapFiltersContainer = mapBlock.querySelector(`.map__filters-container`);

  const setCapacityStr = (array, element) => {
    const roomWordEnding = window.util.pluralizeWord(array.offer.rooms, [`комната`, `комнаты`]);
    const guestWordEnding = window.util.pluralizeWord(array.offer.guests, [`гостя`, `гостей`]);
    const capacityStr = array.offer.rooms + ` ` + roomWordEnding + ` для ` + array.offer.guests + ` ` + guestWordEnding;

    element.querySelector(`.popup__text--capacity`).textContent = capacityStr;

    if (array.offer.guests === 0 || array.offer.rooms === 0) {
      element.querySelector(`.popup__text--capacity`).classList.add(`hidden`);
    }
  };

  const setTypeStr = (element, data) => {
    for (let i = 0; i < window.constants.ADVERTISEMENT_TYPES.length; i++) {
      const currentType = window.constants.ADVERTISEMENT_TYPES[i];

      if (data.offer.type === currentType.id) {
        element.querySelector(`.popup__type`).textContent = currentType.translation;
      }
    }

    if (data.offer.type === ``) {
      element.querySelector(`.popup__type`).classList.add(`.hidden`);
    }
  };

  const setFeaturesBlock = (element, data) => {
    element.querySelector(`.popup__feature--wifi`).textContent = data.offer.features[0];
    element.querySelector(`.popup__feature--dishwasher`).textContent = data.offer.features[1];
    element.querySelector(`.popup__feature--parking`).textContent = data.offer.features[2];

    element.querySelector(`.popup__feature--washer`).textContent = data.offer.features[3];
    element.querySelector(`.popup__feature--elevator`).textContent = data.offer.features[4];
    element.querySelector(`.popup__feature--conditioner`).textContent = data.offer.features[5];

    const featuresList = element.querySelector(`.popup__features`);
    const features = featuresList.querySelectorAll(`li`);

    for (let feature of features) {
      if (feature.textContent === ``) {
        feature.classList.add(`hidden`);
      }
    }
  };

  const setPhotosBlock = (element, data) => {
    const cardPhotos = element.querySelector(`.popup__photos`);
    const cardPhotosImg = cardPhotos.querySelector(`img`);

    if (data.offer.photos.length === 0) {
      cardPhotosImg.classList.add(`hidden`);
    }

    for (const photoUrl of data.offer.photos) {
      cardPhotosImg.src = photoUrl;

      const image = cardPhotosImg.cloneNode(true);

      image.src = photoUrl;
      cardPhotos.appendChild(image);
    }
  };

  const deleteBagPhoto = (cardElement) => {
    const cardPhotos = cardElement.querySelector(`.popup__photos`);

    const lastPhoto = cardPhotos.lastChild;
    cardPhotos.removeChild(lastPhoto);
  };

  const createCommonConteiner = () => {
    const cardsConteiner = document.createElement(`div`);
    mapBlock.insertBefore(cardsConteiner, mapFiltersContainer);
    cardsConteiner.classList.add(`cards-conteiner`);
  };

  const closeElement = () => {
    const cardsConteiner = document.querySelector(`.cards-conteiner`);
    const cards = cardsConteiner.querySelectorAll(`.map__card`);

    for (let card of cards) {
      card.classList.add(`hidden`);
    }
  };

  const addElementListener = (element) => {
    element.querySelector(`.popup__close`).addEventListener(`click`, (evt) => {
      if (evt.which === 1) {
        closeElement();
      }
    });

    window.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        closeElement();
      }
    });
  };

  const renderElement = (element, data) => {
    const cardMock = data;
    addElementListener(element);

    element.querySelector(`.popup__avatar`).src = data.author.avatar;
    if (data.author.avatar === ``) {
      element.querySelector(`.popup__avatar`).classList.add(`.hidden`);
    }

    element.querySelector(`.popup__title`).textContent = data.offer.title;
    if (data.offer.avatar === ``) {
      element.querySelector(`.popup__title`).classList.add(`.hidden`);
    }

    element.querySelector(`.popup__text--address`).textContent = data.offer.address;
    if (data.offer.address === ``) {
      element.querySelector(`.popup__title`).classList.add(`.hidden`);
    }

    setTypeStr(element, data);

    setCapacityStr(data, element);

    element.querySelector(`.popup__text--price`).textContent = data.offer.price + ` ₽/ночь`;
    if (data.offer.price === ``) {
      element.querySelector(`.popup__text--time`).classList.add(`.hidden`);
    }

    element.querySelector(`.popup__text--time`).textContent = `Заезд после ` + data.offer.checkin +
    `, выезд до ` + data.offer.checkout;

    if (data.offer.checkin === ``) {
      element.querySelector(`.popup__text--price`).classList.add(`.hidden`);
    }

    setFeaturesBlock(element, data);

    element.querySelector(`.popup__description`).textContent = data.offer.description;
    if (data.offer.description === ``) {
      element.querySelector(`.popup__description`).classList.add(`.hidden`);
    }

    setPhotosBlock(element, cardMock);
  };

  const renderAllElements = (array) => {
    createCommonConteiner();
    const cardsConteiner = document.querySelector(`.cards-conteiner`);

    for (let i = 0; i <= window.constants.MAX_DATA_ELEMENTS_COUNT; i++) {
      const cardElement = cardTemplate.cloneNode(true);
      renderElement(cardElement, array[i]);
      cardElement.setAttribute(`id`, `card_${i}`);

      deleteBagPhoto(cardElement);
      cardElement.classList.add(`hidden`);
      cardsConteiner.appendChild(cardElement);
    }
  };

  const hideAllElements = () => {
    const cards = document.querySelectorAll(`.map__card`);

    cards.forEach((card) => {
      card.classList.add(`hidden`);
    });
  };

  const openElement = (pin) => {
    const id = pin.getAttribute(`id`);
    const cardsConteiner = document.querySelector(`.cards-conteiner`);
    const card = cardsConteiner.querySelector(`#${id}`);

    hideAllElements();

    card.classList.remove(`hidden`);
  };


  window.card = {
    renderAllElements,
    openElement,
  };
})();
