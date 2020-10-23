'use strict';
(function () {
  window.data = {
    getArrayOfNumbers: (min, max) => {
      const array = [];
      for (let i = min; i <= max; i++) {
        array.push(i);
      }
      return array;
    },

    createArrayObjects: (count) => {
      const ADVERTISEMENT_TITLES = [
        `И снова Торонто!`,
        `Нью-Йорк, Нью-Йорк!`,
        `Велкам ту Сингапур!`,
        `Здравствуй, Прага!`,
        `Бонжур, Париж!`,
        `Будапешт, Hello!`,
        `Панама-Нама`,
        `Свободный Амстердам`
      ];
      const ADVERTISEMENT_TYPES = [
        {
          id: `flat`,
          translation: `Квартира`
        },
        {
          id: `bungalow`,
          translation: `Бунгало`
        },
        {
          id: `house`,
          translation: `Дом`
        },
        {
          id: `palace`,
          translation: `Дворец`
        },
      ];
      const ADVERTISEMENT_FEATURES = [
        `wifi`,
        `dishwasher`,
        `parking`,
        `washer`
      ];
      const ADVERTISEMENT_DESCRIPTIONS = [
        `qui ratione voluptatem sequi nesciunt`,
        `quia voluptas sit`,
        `aspernatur aut odit aut fugit`,
        `taque earum rerum hic tenetur`
      ];
      const ADVERTISEMENT_PHOTOS = [
        `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
        `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
        `http://o0.github.io/assets/images/tokyo/hotel1.jpg`
      ];
      const MIN_PRICE_RANGE = 1000;
      const MAX_PRICE_RANGE = 35000;
      const MIN_ROOMS_RANGE = 1;

      const MAX_ROOMS_RANGE = 4;
      const MIN_GUESTS_RANGE = 1;
      const MAX_GUESTS_RANGE = 6;

      const MIN_TIME_RANGE = 2;
      const MAX_TIME_RANGE = 4;
      const MIN_LOCATION_RANGE = 130;

      const MAX_ADRESS_LOCATION_X_RANGE = 760;
      const MAX_ADRESS_LOCATION_Y_RANGE = 480;
      const MIN_LOCATION_X_RANGE = -60;

      const MAX_LOCATION_X_RANGE = 680;
      const MIN_LOCATION_Y_RANGE = 130;
      const MAX_LOCATION_Y_RANGE = 560;

      const adressLocationX = window.randomizer.getRandomRangeElement(MIN_LOCATION_RANGE, MAX_ADRESS_LOCATION_X_RANGE);
      const adressLocationY = window.randomizer.getRandomRangeElement(MIN_LOCATION_RANGE, MAX_ADRESS_LOCATION_Y_RANGE);
      const advertisments = [];

      const shuffledAvatarArray = window.randomizer.getShuffledArray(window.data.getArrayOfNumbers(1, 8));

      for (let i = 0; i < count; i++) {
        const author = {};
        author.avatar = `img/avatars/user0` + shuffledAvatarArray[i] + `.png`;

        const offer = {
          title: window.randomizer.getRandomArrayElement(ADVERTISEMENT_TITLES),
          address: ` ` + adressLocationX + `,` + adressLocationY + ` `,
          price: window.randomizer.getRandomRangeElement(MIN_PRICE_RANGE, MAX_PRICE_RANGE),

          type: window.randomizer.getRandomArrayElement(ADVERTISEMENT_TYPES),
          rooms: window.randomizer.getRandomRangeElement(MIN_ROOMS_RANGE, MAX_ROOMS_RANGE),
          guests: window.randomizer.getRandomRangeElement(MIN_GUESTS_RANGE, MAX_GUESTS_RANGE),

          checkin: `1` + window.randomizer.getRandomRangeElement(MIN_TIME_RANGE, MAX_TIME_RANGE) + `:00`,
          checkout: `1` + window.randomizer.getRandomRangeElement(MIN_TIME_RANGE, MAX_TIME_RANGE) + `:00`,
          features: window.randomizer.getRandomArrayElement(ADVERTISEMENT_FEATURES) +
          `, ` + window.randomizer.getRandomArrayElement(ADVERTISEMENT_FEATURES),

          description: window.randomizer.getRandomArrayElement(ADVERTISEMENT_DESCRIPTIONS),
          photos: [ADVERTISEMENT_PHOTOS[1], ADVERTISEMENT_PHOTOS[2]],
        };

        const location = {
          x: window.randomizer.getRandomRangeElement(MIN_LOCATION_X_RANGE, MAX_LOCATION_X_RANGE),
          y: window.randomizer.getRandomRangeElement(MIN_LOCATION_Y_RANGE, MAX_LOCATION_Y_RANGE)
        };

        advertisments.push({
          author,
          offer,
          location
        });
      }
      return advertisments;
    }
  };
})();
