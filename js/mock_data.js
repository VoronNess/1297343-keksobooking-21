'use strict';

(function () {
  const advertisments = [];

  const createMapCards = (count) => {
    const addressLocationX = window.util.getRandomRangeElement(window.constants.MIN_LOCATION_RANGE, window.constants.MAX_ADRESS_LOCATION_X_RANGE);
    const addressLocationY = window.util.getRandomRangeElement(window.constants.MIN_LOCATION_RANGE, window.constants.MAX_ADRESS_LOCATION_Y_RANGE);
    const shuffledAvatarArray = window.util.getShuffledArray(window.util.getArrayOfNumbers(1, 8));

    for (let i = 0; i < count; i++) {
      const author = {};
      author.avatar = `img/avatars/user0` + shuffledAvatarArray[i] + `.png`;

      const offer = {

        id: `card_${i}`,
        title: window.util.getRandomArrayElement(window.constants.ADVERTISEMENT_TITLES),
        address: ` ` + addressLocationX + `,` + addressLocationY + ` `,
        price: window.util.getRandomRangeElement(window.constants.MIN_PRICE_RANGE, window.constants.MAX_PRICE_RANGE),

        type: (window.util.getRandomArrayElement(window.constants.ADVERTISEMENT_TYPES)).id,
        rooms: window.util.getRandomRangeElement(window.constants.MIN_ROOMS_RANGE, window.constants.MAX_ROOMS_RANGE),
        guests: window.util.getRandomRangeElement(window.constants.MIN_GUESTS_RANGE, window.constants.MAX_GUESTS_RANGE),

        checkin: `1` + window.util.getRandomRangeElement(window.constants.MIN_TIME_RANGE, window.constants.MAX_TIME_RANGE) + `:00`,
        checkout: `1` + window.util.getRandomRangeElement(window.constants.MIN_TIME_RANGE, window.constants.MAX_TIME_RANGE) + `:00`,
        features: window.util.getRandomArrayElement(window.constants.ADVERTISEMENT_FEATURES) +
        `, ` + window.util.getRandomArrayElement(window.constants.ADVERTISEMENT_FEATURES),

        description: window.util.getRandomArrayElement(window.constants.ADVERTISEMENT_DESCRIPTIONS),
        photos: [window.util.getRandomArrayElement(window.constants.ADVERTISEMENT_PHOTOS), window.util.getRandomArrayElement(window.constants.ADVERTISEMENT_PHOTOS), window.util.getRandomArrayElement(window.constants.ADVERTISEMENT_PHOTOS)],
      };

      const location = {
        x: window.util.getRandomRangeElement(window.constants.MIN_LOCATION_X_RANGE, window.constants.MAX_LOCATION_X_RANGE),
        y: window.util.getRandomRangeElement(window.constants.MIN_LOCATION_Y_RANGE, window.constants.MAX_LOCATION_Y_RANGE)
      };

      advertisments.push({
        author,
        offer,
        location
      });
    }
    return advertisments;
  };

  createMapCards(8);

  window.mockData = {
    createMapCards,
    advertisments
  };
})();
