'use strict';

(function () {

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
    {
      id: `any`,
      translation: `Любой тип жилья`
    }
  ];

  const MIN_LOCATION_Y_RANGE = 130;
  const MAX_LOCATION_Y_RANGE = 630;

  const MAIN_PIN_SIZE = 62;
  const MAIN_PIN_POINTER_HEIGHT = 22;
  const HALF_MAIN_PIN = Math.round(MAIN_PIN_SIZE / 2);

  const MOVE_X = 100;
  const MOVE_Y = 40;
  const MIN_ADVERTISEMENT_TITLE_LENGTH = 30;

  const SHOW_MIN_ADVERTISEMENT_TITLE_LENGTH = 25;
  const MAX_ADVERTISEMENT_TITLE_LENGTH = 100;
  const MAX_PRICE_VALUE = 1000000;

  const HALF_RENDERED_PIN_WIDTH = 25;
  const RENDERED_PIN_HEIGHT = 70;
  const DEFAULT_ADDRESS_X = HALF_MAIN_PIN;

  const DEFAULT_ADDRESS_Y = HALF_MAIN_PIN;
  const PAGE_IS_ACTIVE_ADDRESS_X = HALF_MAIN_PIN;
  const PAGE_IS_ACTIVE_ADDRESS_Y = HALF_MAIN_PIN + MAIN_PIN_POINTER_HEIGHT;

  const MAX_DATA_ELEMENTS_COUNT = 5;
  const URL_GET_DATA = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_SEND_DATA = `https://21.javascript.pages.academy/keksobooking`;

  const TIMEOUT_IN_MS = 10000;
  const MAIN_PIN_DEFUALT_LEFT = `570px`;
  const MAIN_PIN_DEFUALT_TOP = `375px`;

  window.constants = {

    ADVERTISEMENT_TYPES,
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
    DEFAULT_ADDRESS_X,
    DEFAULT_ADDRESS_Y,

    PAGE_IS_ACTIVE_ADDRESS_X,
    PAGE_IS_ACTIVE_ADDRESS_Y,
    MAX_DATA_ELEMENTS_COUNT,

    URL_GET_DATA,
    URL_SEND_DATA,
    TIMEOUT_IN_MS,

    SHOW_MIN_ADVERTISEMENT_TITLE_LENGTH,
    MAIN_PIN_DEFUALT_LEFT,
    MAIN_PIN_DEFUALT_TOP,
  };
})();
