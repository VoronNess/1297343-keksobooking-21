'use strict';

(function () {
  const roomElement = document.querySelector(`#room_number`);
  const guestElement = document.querySelector(`#capacity`);
  const titleElement = document.querySelector(`#title`);

  const priceElement = document.querySelector(`#price`);
  const apartmentsElement = document.querySelector(`#type`);
  const ROOM_FOR_ONE_VALIDATION_KEY = 1;

  const ROOM_FOR_TWO_VALIDATION_KEY = 2;
  const ROOM_FOR_THREE_VALIDATION_KEY = 3;
  const ROOM_NOT_FOR_GUESTS_VALIDATION_KEY = 100;

  const ONE_GUEST_VALIDATION_KEY = 1;
  const TWO_GUEST_VALIDATION_KEY = 2;
  const THREE_GUEST_VALIDATION_KEY = 3;
  const NOT_FOR_GUESTS_VALIDATION_KEY = 0;

  const roomRules = {

    [ROOM_FOR_ONE_VALIDATION_KEY]: {
      validate: (guests) => {
        return guests !== 1;
      },
      text: `Ошибка!Размещение в 1-ой комнате расчитано только на 1 гостя.
      Пожалуйста, выберете в графе "Количество мест" пункт "для 1 гостя"`
    },

    [ROOM_FOR_TWO_VALIDATION_KEY]: {
      validate: (guests) => {
        return guests === 0 || guests === 3;
      },
      text: `Ошибка!Размещение в 2-х комнатах расчитано только на 1 гостя или на 2-х гостей.
      Пожалуйста, выберете в графе "Количество мест" пункт "для 1 гостя" или "для 2 гостей"`
    },

    [ROOM_FOR_THREE_VALIDATION_KEY]: {
      validate: (guests) => {
        return guests === 0;
      },
      text: `Ошибка!Размещение в 3-х комнатах расчитано только на 1 гостя, 2-х гостей или 3-ч гостей.
      Пожалуйста, выберете в графе "Количество мест" пункт "для 1 гостя", "для 2 гостей" или "для 3 гостей"`
    },

    [ROOM_NOT_FOR_GUESTS_VALIDATION_KEY]: {
      validate: (guests) => {
        return guests !== 0;
      },
      text: `Ошибка!При выборе 100 комнат действуют специальные условия!
      Пожалуйста выберете в графе "Количество мест" пункт "не для гостей"`
    }
  };

  const guestRules = {

    [NOT_FOR_GUESTS_VALIDATION_KEY]: {
      validate: (rooms) => {
        return rooms !== 100;
      },
      text: `Ошибка! Размещение "Не для гостей", возможно только по специальным условиям.
      Пожалуйста, выберете в графе "Количество комнат" пункт "100 комнат" и напишите в "Описании" свои пожелания"`
    },

    [ONE_GUEST_VALIDATION_KEY]: {
      validate: (rooms) => {
        return rooms === 100;
      },
      text: `Ошибка! Размещение 1 гостя возможно в 1 комнате, 2 комнатах и 3 комнатах.
      Пожалуйста, выберете в графе "Количество комнат" один из пунктов: "1 комната", "2 комнты" или "3 комнты"`
    },

    [TWO_GUEST_VALIDATION_KEY]: {
      validate: (rooms) => {
        return rooms !== 2 || rooms === 100;
      },
      text: `Ошибка! Размещение 2 гостей возможно в 2 комнатах и 3 комнатах.
      Пожалуйста, выберете в графе "Количество комнат" один из пунктов: "2 комнты" или "3 комнты"`
    },

    [THREE_GUEST_VALIDATION_KEY]: {
      validate: (rooms) => {
        return rooms !== 3;
      },
      text: `Ошибка! Размещение 3 гостей возможно в 3 комнатах.
      Пожалуйста, выберете в графе "Количество комнат" пункт "3 комнты"`
    }
  };

  const typesAndPriceRules = {
    bungalow: {
      placeholder: 0,
      validate: (price) => {
        return price > 999;
      },
      text: `Ошибка! Стоимость размещения в "Бунгало": от "0" до "999". Пожалуйста, выберете соответствующую цену.`
    },

    flat: {
      placeholder: 1000,
      validate: (price) => {
        return price < 1000 || price > 4999;
      },
      text: `Ошибка! Стоимость размещения в "Квартире": от "1 000" до "4 999". Пожалуйста, выберете соответствующую цену.`
    },

    house: {
      placeholder: 5000,
      validate: (price) => {
        return price < 5000 || price > 9999;
      },
      text: `Ошибка! Стоимость размещения в "Доме": от "5 000" до "9 999". Пожалуйста, выберете соответствующую цену.`
    },

    palace: {
      placeholder: 10000,
      validate: (price) => {
        return price < 9999;
      },
      text: `Ошибка! Стоимость размещения во "Дворце": от "10 000" до "1 000 000". Пожалуйста, выберете соответствующую цену.`
    },
  };

  const checkTitleInput = (valueLength) => {
    if (valueLength < window.constants.MIN_ADVERTISEMENT_TITLE_LENGTH) {
      titleElement.setCustomValidity(`Длина заголовка = минимум 30 символов. Добавьте ещё ` + (window.constants.MIN_ADVERTISEMENT_TITLE_LENGTH - valueLength) + ` симв.`);
    } else if (valueLength > window.constants.MAX_ADVERTISEMENT_TITLE_LENGTH) {
      titleElement.setCustomValidity(`Удалите ` + (valueLength - window.constants.MAX_ADVERTISEMENT_TITLE_LENGTH) + ` симв.`);

    } else {
      titleElement.setCustomValidity(``);
    }
  };

  const addTitleInputListener = () => {
    titleElement.addEventListener(`input`, (evt) => {
      const target = evt.target;
      const titleValueLength = target.value.length;

      checkTitleInput(titleValueLength);
      titleElement.reportValidity();
    });
  };

  const checkPriceInput = (value) => {
    if (value > window.constants.MAX_PRICE_VALUE) {

      priceElement.setCustomValidity(`Наши самые дорогие апартаменты стоят 1 000 000.
      Если вы хотите зарегистрировать еще более привилегированное размещение - напишите в пункте "цена за ночь - 1 000 000",
      а в поле "Описание" оставьте комментарии, почему цена за ночь в ваших апартаментах больше 1 000 000`);

      priceElement.reportValidity();

    } else {
      priceElement.setCustomValidity(``);
    }
  };

  const checkTypeAndPriceInput = (apartments, price) => {
    const validationRule = typesAndPriceRules[apartments];
    const pricesValue = Number(price);

    priceElement.placeholder = validationRule.placeholder;

    if (validationRule.validate(pricesValue)) {
      priceElement.setCustomValidity(validationRule.text);

    } else {
      priceElement.setCustomValidity(``);
    }
  };

  const addPriceInputListener = () => {
    priceElement.addEventListener(`input`, (evt) => {
      const target = evt.target;
      const priceValue = target.value;
      const apartmentsValue = apartmentsElement.value;

      checkPriceInput(priceValue);
      checkTypeAndPriceInput(apartmentsValue, priceValue);

      priceElement.reportValidity();
    });
  };

  const addTypeInputListener = () => {
    apartmentsElement.addEventListener(`input`, (evt) => {
      const target = evt.target;
      const apartmentsValue = target.value;
      const priceValue = priceElement.value;

      checkPriceInput(priceValue);
      checkTypeAndPriceInput(apartmentsValue, priceValue);

      apartmentsElement.reportValidity();
    });
  };

  const checkRoomInput = (rooms, guests) => {
    const roomsValue = Number(rooms);
    const guestsValue = Number(guests);
    const validationRule = roomRules[roomsValue];

    if (validationRule.validate(guestsValue)) {
      return roomElement.setCustomValidity(validationRule.text);
    }

    return roomElement.setCustomValidity(``);
  };

  const addRoomInputListener = () => {
    roomElement.addEventListener(`input`, (evt) => {
      const target = evt.target;
      const roomValue = target.value;
      const guestValue = guestElement.value;

      checkRoomInput(roomValue, guestValue);

      roomElement.reportValidity();
    });
  };

  const checkGuestInput = (rooms, guests) => {
    const roomsValue = Number(rooms);
    const guestsValue = Number(guests);
    const validationRule1 = guestRules[guestsValue];

    if (validationRule1.validate(roomsValue)) {
      return guestElement.setCustomValidity(validationRule1.text);
    }

    return guestElement.setCustomValidity(``);
  };

  const addGuestInputListener = () => {
    guestElement.addEventListener(`input`, (evt) => {
      const target = evt.target;
      const guestValue = target.value;
      const roomValue = roomElement.value;

      checkGuestInput(roomValue, guestValue);

      guestElement.reportValidity();
    });
  };

  const timeinElement = document.querySelector(`#timein`);
  const timeoutElement = document.querySelector(`#timeout`);

  const checkTimeinInput = () => {
    if (timeinElement.value) {
      timeoutElement.value = timeinElement.value;
    }
  };

  const addTimeinListener = () => {
    timeinElement.addEventListener(`input`, () => {
      checkTimeinInput();
    });
  };

  const checkTimeoutInput = () => {
    if (timeoutElement.value) {
      timeinElement.value = timeoutElement.value;
    }
  };

  const addTimeoutListener = () => {
    timeoutElement.addEventListener(`input`, () => {
      checkTimeoutInput();
    });
  };

  const addAllFormInputsListener = () => {
    addTitleInputListener();
    addPriceInputListener();
    addTypeInputListener();

    addRoomInputListener();
    addGuestInputListener();
    addTimeinListener();

    addTimeoutListener();
  };

  window.validation = {
    addAllFormInputsListener
  };
})();
