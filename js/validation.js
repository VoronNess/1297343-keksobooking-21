'use strict';

(function () {
  const roomElement = document.querySelector(`#room_number`);
  const guestElement = document.querySelector(`#capacity`);
  const ROOM_FOR_ONE_VALIDATION_KEY = 1;
  const ROOM_FOR_TWO_VALIDATION_KEY = 2;
  const ROOM_FOR_THREE_VALIDATION_KEY = 3;
  const ROOM_NOT_FOR_GUESTS_VALIDATION_KEY = 100;

  const validationRules = {
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

  const validateInput = (rooms, guests) => {
    const roomsValue = Number(rooms);// переводим дефолтное строчное значение roomsValue в число
    const guestsValue = Number(guests);// также как и с roomsValue

    const validationRule = window.validation.validationRules[roomsValue];

    if (validationRule.validate(guestsValue)) {
      roomElement.setCustomValidity(validationRule.text);
    } else {
      roomElement.setCustomValidity(``);
    }
  };

  const roomElementListener = () => {
    roomElement.addEventListener(`input`, (evt) => {
      const target = evt.target; // элемент на котором случилось событие
      const roomValue = target.value; // значение элемента, на котором случилось событие
      const guestValue = guestElement.value; // значение селекта #capacity = значение текущего option

      window.validation.validateInput(roomValue, guestValue);
      roomElement.reportValidity();
    });
  };

  const guestElementListener = () => {
    guestElement.addEventListener(`input`, (evt) => {
      const target = evt.target;
      const guestValue = target.value; // тут уже отслеживаем значение для guest
      const roomValue = roomElement.value;

      window.validation.validateInput(roomValue, guestValue);
      guestElement.reportValidity();
    });
  };

  window.validation = {
    validationRules,
    validateInput,

    roomElementListener,
    guestElementListener,
  };
})();
