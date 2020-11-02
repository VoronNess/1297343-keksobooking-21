'use strict';

(function () {
  const mapBlock = document.querySelector(`.map`);
  const cardsTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

  const mapFiltersContainer = mapBlock.querySelector(`.map__filters-container`);
  const setRoomsGuests = (array, index) => {
    const roomsEnding = window.util.pluralizeWord(array[index].offer.rooms, [`комната`, `комнаты`]);
    const guestsEnding = window.util.pluralizeWord(array[index].offer.guests, [`гостя`, `гостей`]);

    const roomsGuests = array[index].offer.rooms + ` ` + roomsEnding + ` для ` + array[index].offer.guests + ` ` + guestsEnding;
    return roomsGuests;
  };


  const setInfoArray = (array, count) => {
    const cards = [];
    const addressValues = [];
    for (let i = 0; i < count; i++) {
      const cardInfo = {
        avatar: array[i].author.avatar,
        title: array[i].offer.title,
        address: array[i].offer.address,

        price: array[i].offer.price + `₽/ночь`,
        type: array[i].offer.type,
        roomsGuests: array[i].offer.room,

        time: `Заезд после ` + array[i].offer.checkin +
        `, выезд до ` + array[i].offer.checkout,

        features: array[i].offer.features,
        description: array[i].offer.description,
        photoes: array[i].offer.photos,
      };

      cards.push(cardInfo);
      addressValues.push(cardInfo.address);
    }
    return cards;// массив с объектами
  };

  // бахаем элемент для сбора карточек
  const createCardsConteiner = () => {
    const cardsConteiner = document.createElement(`div`);
    mapBlock.insertBefore(cardsConteiner, mapFiltersContainer);
    cardsConteiner.classList.add(`cards-conteiner`);
  };


  const renderAll = (array) => {
    createCardsConteiner();
    const cardsConteiner = document.querySelector(`.cards-conteiner`);

    for (let i = 0; i < array.length; i++) {
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

      cardAvatar.src = array[i].avatar;
      cardTitle.textContent = array[i].title;
      cardAddress.textContent = array[i].address;

      cardPrice.textContent = array[i].price;
      cardType.textContent = array[i].type;
      cardRoomsGuests.textContent = array[i].roomsGuests;

      cardTime.textContent = array[i].time;
      cardFeatures.textContent = array[i].features;
      cardDescription.textContent = array[i].description;

      cardPhotoesImg.src = array[i].photos;
      cardsConteiner.appendChild(cardElement);

      const renderedCards = cardsConteiner.querySelectorAll(`.map__card`);
      for (let renderedCard of renderedCards) {
        renderedCard.classList.add(`hidden`);
      }
    }
  };

  const setactualAddressToCard = (array) => {
    const cardsConteiner = document.querySelector(`.cards-conteiner`);
    const renderedCards = cardsConteiner.querySelectorAll(`.map__card`);
    let i = 1;
    for (let renderedCard of renderedCards) {
      const cardAddress = renderedCard.querySelector(`.popup__text--address`);
      cardAddress.textContent = array[i++];
    }
  };

  const openCard = (pin) => {
    const cardsOpenRules = window.cardsOpen.CARDS_OPEN_RULES;
    for (let s = 0; s <= cardsOpenRules.length; s++) {
      const currentPin = cardsOpenRules[s].pin;
      if (pin === currentPin) {
        currentPin[s].card.classList.remove(`hidden`);
      }
    }
  };

  window.card = {
    setInfoArray,
    setRoomsGuests,
    renderAll,
    setactualAddressToCard,
    openCard,
  };
})();
