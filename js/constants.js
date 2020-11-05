'use strict';

(function () {
  const ADVERTISEMENT_TITLES = [
    `Трешка за цент!`,
    `Не дорого, но и не богато.`,
    `До центра - рукой подать!`,
    `Тишина и покой`,
    `Места хватит всееем!`,
    `Ми-ми-ми-шный интерьер ^_^`,
    `Накормим, напоим, спать уложим`,
    `"the Best" of "The Best"`
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
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
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

  const MAIN_PIN_SIZE = 65;
  const MAIN_PIN_POINTER_HEIGHT = 22;
  const HALF_MAIN_PIN = Math.round(MAIN_PIN_SIZE / 2);

  const MOVE_X = 100;
  const MOVE_Y = 40;
  const MIN_ADVERTISEMENT_TITLE_LENGTH = 30;

  const MAX_ADVERTISEMENT_TITLE_LENGTH = 100;
  const MAX_PRICE_VALUE = 1000000;
  const HALF_RENDERED_PIN_WIDTH = 25;

  const RENDERED_PIN_HEIGHT = 70;

  window.constants = {

    ADVERTISEMENT_TITLES,
    ADVERTISEMENT_TYPES,
    ADVERTISEMENT_FEATURES,

    ADVERTISEMENT_DESCRIPTIONS,
    ADVERTISEMENT_PHOTOS,
    MIN_PRICE_RANGE,

    MAX_PRICE_RANGE,
    MIN_ROOMS_RANGE,
    MAX_ROOMS_RANGE,

    MIN_GUESTS_RANGE,
    MAX_GUESTS_RANGE,
    MIN_TIME_RANGE,

    MAX_TIME_RANGE,
    MIN_LOCATION_RANGE,
    MAX_ADRESS_LOCATION_X_RANGE,

    MAX_ADRESS_LOCATION_Y_RANGE,
    MIN_LOCATION_X_RANGE,
    MAX_LOCATION_X_RANGE,

    MIN_LOCATION_Y_RANGE,
    MAX_LOCATION_Y_RANGE,
    MAIN_PIN_SIZE,

    MAIN_PIN_POINTER_HEIGHT,
    HALF_MAIN_PIN,
    MOVE_X,

    MOVE_Y,
    MIN_ADVERTISEMENT_TITLE_LENGTH,
    MAX_ADVERTISEMENT_TITLE_LENGTH,

    MAX_PRICE_VALUE,
    HALF_RENDERED_PIN_WIDTH,
    RENDERED_PIN_HEIGHT,
  };
})();
