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
  };

  const setTypeStr = (element, data) => {
    for (let i = 0; i < window.constants.ADVERTISEMENT_TYPES.length; i++) {
      const currentType = window.constants.ADVERTISEMENT_TYPES[i];

      if (data.offer.type === currentType.id) {
        element.querySelector(`.popup__type`).textContent = currentType.translation;
      }
    }
  };

  const setPhotosBlock = (element, mock) => {
    const cardPhotos = element.querySelector(`.popup__photos`);
    const cardPhotosImg = cardPhotos.querySelector(`img`);

    for (const photoUrl of mock.offer.photos) {
      cardPhotosImg.src = photoUrl;
      const image = cardPhotosImg.cloneNode(true);
      image.src = photoUrl;

      cardPhotos.appendChild(image);
    }
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

    element.setAttribute(`id`, data.offer.id);
    element.querySelector(`.popup__avatar`).src = data.author.avatar;
    element.querySelector(`.popup__title`).textContent = data.offer.title;

    element.querySelector(`.popup__text--address`).textContent =
    (window.constants.MOVE_X + data.location.x + window.constants.HALF_RENDERED_PIN_WIDTH) +
    `, ` + (window.constants.MOVE_Y + data.location.y + window.constants.RENDERED_PIN_HEIGHT);

    setTypeStr(element, data);

    setCapacityStr(data, element);

    element.querySelector(`.popup__text--price`).textContent = data.offer.price + ` ₽/ночь`;
    element.querySelector(`.popup__text--time`).textContent = `Заезд после ` + data.offer.checkin +
    `, выезд до ` + data.offer.checkout;

    element.querySelector(`.popup__features`).textContent = data.offer.features;
    element.querySelector(`.popup__description`).textContent = data.offer.description;

    setPhotosBlock(element, cardMock);
  };

  const renderAllElements = (array) => {
    createCommonConteiner();
    const cardsConteiner = document.querySelector(`.cards-conteiner`);

    for (let i = 0; i < array.length; i++) {
      const cardElement = cardTemplate.cloneNode(true);
      renderElement(cardElement, array[i]);

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
