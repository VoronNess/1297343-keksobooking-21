'use strict';

(function () {
  const mapBlock = document.querySelector(`.map`);
  const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

  const mapFiltersContainer = mapBlock.querySelector(`.map__filters-container`);

  const setCapacityString = (element, data) => {
    const capacity = element.querySelector(`.popup__text--capacity`);
    const roomWordEnding = window.util.pluralizeWord(data.offer.rooms, [`комната`, `комнаты`]);
    const guestWordEnding = window.util.pluralizeWord(data.offer.guests, [`гостя`, `гостей`]);

    const capacityString = `${data.offer.rooms} ${roomWordEnding} ${data.offer.guests} ${guestWordEnding}`;

    capacity.textContent = capacityString;

    window.util.showEmptyElementError(element, `ошибка в функции setCapacityString - 1 аргумент отсутствует`);
    window.util.showEmptyElementError(data, `ошибка в функции setCapacityString - 2 аргумент отсутствует`);

    window.util.showWrongElementTypeError(element, `object`, `ошибка в функции setCapacityString - 1 аргумент передается не в том формате`);
    window.util.showWrongElementTypeError(data, `object`, `ошибка в функции setCapacityString - 2  аргумент передается не в том формате`);
  };

  const setTypeString = (element, data) => {
    const typeInput = element.querySelector(`.popup__type`);

    for (let i = 0; i < window.constants.ADVERTISEMENT_TYPES.length; i++) {
      const currentType = window.constants.ADVERTISEMENT_TYPES[i];

      if (data.offer.type === currentType.id) {
        typeInput.textContent = currentType.translation;
      }
    }
  };

  const setFeaturesBlock = (element, data) => {
    const wifi = element.querySelector(`.popup__feature--wifi`);
    const dishwasher = element.querySelector(`.popup__feature--dishwasher`);
    const parking = element.querySelector(`.popup__feature--parking`);

    const washer = element.querySelector(`.popup__feature--washer`);
    const elevator = element.querySelector(`.popup__feature--elevator`);
    const conditioner = element.querySelector(`.popup__feature--conditioner`);

    wifi.textContent = data.offer.features[0];
    dishwasher.textContent = data.offer.features[1];
    parking.textContent = data.offer.features[2];

    washer.textContent = data.offer.features[3];
    elevator.textContent = data.offer.features[4];
    conditioner.textContent = data.offer.features[5];

    const featuresList = element.querySelector(`.popup__features`);
    const features = featuresList.querySelectorAll(`li`);

    for (const feature of features) {
      window.util.hideEmptyString(feature.textContent, feature);
    }
  };

  const setPhotosBlock = (element, data) => {
    const cardPhotos = element.querySelector(`.popup__photos`);
    const cardPhotosImg = cardPhotos.querySelector(`img`);

    for (const photoUrl of data.offer.photos) {
      cardPhotosImg.src = photoUrl;

      const image = cardPhotosImg.cloneNode(true);

      image.src = photoUrl;
      cardPhotos.appendChild(image);
    }
    cardPhotos.removeChild(cardPhotosImg);
  };

  const createCommonContainer = () => {
    const newCardsContainer = document.createElement(`div`);
    mapBlock.insertBefore(newCardsContainer, mapFiltersContainer);
    newCardsContainer.classList.add(`cards-container`);

  };

  const popupCloseElement = () => {
    const cardsContainer = document.querySelector(`.cards-container`);
    const cards = cardsContainer.querySelectorAll(`.map__card`);

    for (const card of cards) {
      card.classList.add(`hidden`);
    }
  };

  const addElementListener = (element) => {
    element.querySelector(`.popup__close`).addEventListener(`click`, (evt) => {
      if (evt.which === 1) {
        popupCloseElement();
      }
    });

    window.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        popupCloseElement();
      }
    });
  };

  const renderElement = (element, data) => {
    addElementListener(element);

    const avatar = element.querySelector(`.popup__avatar`);
    const title = element.querySelector(`.popup__title`);
    const address = element.querySelector(`.popup__text--address`);

    const type = element.querySelector(`.popup__type`);
    const capacity = element.querySelector(`.popup__text--capacity`);
    const price = element.querySelector(`.popup__text--price`);

    const time = element.querySelector(`.popup__text--time`);
    const description = element.querySelector(`.popup__description`);
    const photosBlock = element.querySelector(`.popup__photos`);
    const photosImg = photosBlock.querySelector(`img`);

    window.util.checkDataStringsForEmpty(data, avatar, title, address, type, capacity, price, time, description, photosImg);

    avatar.src = data.author.avatar;
    title .textContent = data.offer.title;
    address.textContent = data.offer.address;

    setTypeString(element, data);
    setCapacityString(element, data);
    price.textContent = data.offer.price + ` ₽/ночь`;

    time.textContent = `Заезд после ` + data.offer.checkin +
    `, выезд до ` + data.offer.checkout;

    setFeaturesBlock(element, data);
    description.textContent = data.offer.description;
    setPhotosBlock(element, data);
  };

  const renderAllElements = (data) => {
    createCommonContainer();
    const cardsContainer = document.querySelector(`.cards-container`);
    let maxElementsCount = 5;

    if (data.length < maxElementsCount) {
      maxElementsCount = data.length - 1;
    }

    for (let i = 0; i <= maxElementsCount; i++) {
      const cardElement = cardTemplate.cloneNode(true);

      renderElement(cardElement, data[i]);
      cardElement.setAttribute(`id`, `card_${i}`);

      cardElement.classList.add(`hidden`);
      cardsContainer.appendChild(cardElement);
    }
  };

  const hideAllElements = () => {
    const cards = document.querySelectorAll(`.map__card`);

    for (const card of cards) {
      card.classList.add(`hidden`);
    }
  };

  const dellAllElements = () => {
    const cards = document.querySelectorAll(`.map__card`);

    for (const card of cards) {
      card.remove();
    }
  };

  const openElement = (pin) => {
    const id = pin.getAttribute(`id`);
    const cardsContainer = document.querySelector(`.cards-container`);
    const card = cardsContainer.querySelector(`#${id}`);

    hideAllElements();

    card.classList.remove(`hidden`);
  };

  window.card = {
    renderAllElements,
    openElement,
    hideAllElements,
    dellAllElements
  };
})();
