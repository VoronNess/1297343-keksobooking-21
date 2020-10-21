'use strict';
const mapBlock = document.querySelector(`.map`);
// const pins = document.querySelector(`.map__pins`);

// const pinsTemplate = document.querySelector(`#pin`).content;
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


const getRandomArrayElement = (arr) => {
  const i = Math.floor(Math.random() * arr.length);
  const random = arr[i];
  return random;
};

const getRandomRangeElement = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomArrayOfNumbers = (min, max) => {
  const array = [];
  for (let i = min; i <= max; i++) {
    array.push(i);
  }
  return array;
};

const getShuffledArray = (arr) => {
  let j; let x; let i;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
};
const shuffledAvatarArray = getShuffledArray(getRandomArrayOfNumbers(1, 8));

const createArrayObjects = (count) => {
  const adressLocationX = getRandomRangeElement(MIN_LOCATION_RANGE, MAX_ADRESS_LOCATION_X_RANGE);
  const adressLocationY = getRandomRangeElement(MIN_LOCATION_RANGE, MAX_ADRESS_LOCATION_Y_RANGE);
  const advertisments = [];

  for (let i = 0; i < count; i++) {
    const author = {};
    author.avatar = `img/avatars/user0` + shuffledAvatarArray[i] + `.png`;

    const offer = {
      title: getRandomArrayElement(ADVERTISEMENT_TITLES),
      address: ` ` + adressLocationX + `,` + adressLocationY + ` `,
      price: getRandomRangeElement(MIN_PRICE_RANGE, MAX_PRICE_RANGE),

      type: getRandomArrayElement(ADVERTISEMENT_TYPES),
      rooms: getRandomRangeElement(MIN_ROOMS_RANGE, MAX_ROOMS_RANGE),
      guests: getRandomRangeElement(MIN_GUESTS_RANGE, MAX_GUESTS_RANGE),

      checkin: `1` + getRandomRangeElement(MIN_TIME_RANGE, MAX_TIME_RANGE) + `:00`,
      checkout: `1` + getRandomRangeElement(MIN_TIME_RANGE, MAX_TIME_RANGE) + `:00`,
      features: getRandomArrayElement(ADVERTISEMENT_FEATURES) +
      `, ` + getRandomArrayElement(ADVERTISEMENT_FEATURES),

      description: getRandomArrayElement(ADVERTISEMENT_DESCRIPTIONS),
      photos: [ADVERTISEMENT_PHOTOS[1], ADVERTISEMENT_PHOTOS[2]],
    };

    const location = {
      x: getRandomRangeElement(MIN_LOCATION_X_RANGE, MAX_LOCATION_X_RANGE),
      y: getRandomRangeElement(MIN_LOCATION_Y_RANGE, MAX_LOCATION_Y_RANGE)
    };

    advertisments.push({
      author,
      offer,
      location
    });
  }
  return advertisments;
};
createArrayObjects(8);
/*
const renderPins = (array) => {
  for (let i = 0; i < array.length; i++) {
    const pinElement = pinsTemplate.cloneNode(true);
    const pinStyle = pinsTemplate.querySelector(`.map__pin`);
    const moveX = 100;
    const moveY = 40;

    pinStyle.setAttribute(`style`, `left:` + (moveX + array[i].location.x)
    + `px; top:` + (moveY + array[i].location.y) + `px;`);

    const pinImg = pinStyle.querySelector(`img`);
    pinImg.src = array[i].author.avatar;
    pinImg.alt = array[i].offer.title;
    pins.appendChild(pinElement);
  }
};
renderPins(createdArray);

const cardsTemplate = document.querySelector(`#card`)
.content
.querySelector(`.map__card`);
const mapFiltersContainer = mapBlock.querySelector(`.map__filters-container`);

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

const ROOMSVARIATIONSARRAY = [`комната`, `комнаты`];
const GUESTSVARIATIONSARRAY = [`гостя`, `гостей`];

const pluralizeWord = (arrayElement, array) => {
  if (arrayElement === 1) {
    return array[0];
  } else {
    return array[1];
  }
};

cardAvatar.src = createdArray[0].author.avatar;
cardTitle.textContent = createdArray[0].offer.title;
cardAddress.textContent = createdArray[0].offer.address;

cardPrice.textContent = createdArray[0].offer.price + `₽/ночь`;
for (let i = 0; i <= ADVERTISEMENT_TYPES.length; i++) {
  const currentType = ADVERTISEMENT_TYPES[i];
  if (createdArray[0].offer.type === currentType) {
    cardType.textContent = currentType.translation;
  }
}
const roomsEnding = pluralizeWord(createdArray[0].offer.rooms, ROOMSVARIATIONSARRAY);
const guestsEnding = pluralizeWord(createdArray[0].offer.guests, GUESTSVARIATIONSARRAY);
cardRoomsGuests.textContent = createdArray[0].offer.rooms + ` ` + roomsEnding +
` для ` + createdArray[0].offer.guests + ` ` + guestsEnding;

cardTime.textContent = `Заезд после ` + createdArray[0].offer.checkin + `, выезд до `
+ createdArray[0].offer.checkout;
cardFeatures.textContent = createdArray[0].offer.features;
cardDescription.textContent = createdArray[0].offer.description;

cardPhotoesImg.src = createdArray[0].offer.photos[getRandomRangeElement(0, 1)];
const photoesImgClone = cardPhotoesImg.cloneNode(true);
cardPhotoes.appendChild(photoesImgClone);

cardPhotoesImg.src = createdArray[0].offer.photos[getRandomRangeElement(0, 1)];
mapBlock.insertBefore(cardElement, mapFiltersContainer);
*/

// module4-task1
const mapFilters = document.querySelectorAll(`.map__filter`);
const advertisementForm = document.querySelector(`.ad-form`);
const advertisementFormHeader = document.querySelector(`.ad-form-header`);

const mainPin = document.querySelector(`.map__pin--main`);
const advertisementFormElements = document.querySelectorAll(`.ad-form__element`);
const advertisementAdressInput = document.querySelector(`#address`);

// до активации формы: считаем координаты середины главного пина
const mainPinHightWidth = 65; // ширина и высота равны
const leftValueMainPin = mainPin.offsetLeft; // числовое значение left
const topValueMainPin = mainPin.offsetTop; // числовое значение top

const halfMainPin = Math.round((mainPinHightWidth / 2)); // так как по дефолту нужен центр главного пина - ищем половину ширины/высоты
const defaultAddressX = leftValueMainPin + halfMainPin; // левый верхний угол пина + половинка пина по "x" и по "y" = центр пина
const defaultAddressY = topValueMainPin + halfMainPin;

advertisementAdressInput.value = defaultAddressX + `, ` + defaultAddressY;// записываем координаты в строку адрес

const roomElement = document.querySelector(`#room_number`);
const guestElement = document.querySelector(`#capacity`);

// считаем координаты указателя пина после активации
const mainPinPointerHight = 22;
const addressX = defaultAddressX; // по горизонтали ничего не меняется
const addressY = defaultAddressY + halfMainPin + mainPinPointerHight;// от центра идем вниз до края круглой части пина, и ниже в высоту указателя

const setAdvertisementAddressValue = () => {
  advertisementAdressInput.value = addressX + `, ` + addressY;// записываем координаты в строку адрес
};

const disableHTMLElements = (elements) => {
  for (let element of elements) {
    element.setAttribute(`disabled`, `true`);
  }
};

const setUnactiveMode = () => {
  disableHTMLElements(mapFilters);
  disableHTMLElements(advertisementFormElements);
  advertisementFormHeader.setAttribute(`disabled`, `true`);
};
setUnactiveMode();

const setActiveCollectionElements = (elements) => {
  for (let element of elements) {
    element.removeAttribute(`disabled`, `true`);
  }
};
// активное состояние
const setActiveMode = () => {
  mapBlock.classList.remove(`map--faded`);
  advertisementFormHeader.removeAttribute(`disabled`, `true`);
  setActiveCollectionElements(advertisementFormElements);

  setActiveCollectionElements(mapFilters);
  advertisementForm.classList.remove(`ad-form--disabled`);
  setAdvertisementAddressValue();

  if (Number(roomElement.value) < Number(guestElement.value)) { // тут проверка значений селектов комнат и гостей сразу после активации
    roomElement.setCustomValidity(`Ошибка!Размещение в 1-ой комнате расчитано только на 1 гостя.
    Пожалуйста, выберете в графе "Количество мест" пункт "для 1 гостя"`);
  }// без этой проверки, если пользователь не меняет никакое значение в комнатах и гостях и тыкает сабмит, будет отправляться неправильные "1 комната для 3 гостей"
};

let isEnabledActiveMode = false;

const enableActiveModeEventListener = (evt) => {
  // если уже включили активный режим, то при клике ничего не делаем
  if (isEnabledActiveMode) {
    return;
  }

  if (evt.which === 1 || evt.key === `Enter`) {
    setActiveMode();
    isEnabledActiveMode = true;
    mainPin.removeEventListener(`mousedown`, enableActiveModeEventListener);
    mainPin.removeEventListener(`keydown`, enableActiveModeEventListener);
  }
};
// когда идет клик или нажатие на кнопку- отрабатывает все по порядку, потом remove слушателей
mainPin.addEventListener(`mousedown`, enableActiveModeEventListener);
mainPin.addEventListener(`keydown`, enableActiveModeEventListener);

// валидация гостей и комнат

const validationRules = {
  1: {
    validate: (guests) => {
      return guests !== 1;
    },
    text: `Ошибка!Размещение в 1-ой комнате расчитано только на 1 гостя.
    Пожалуйста, выберете в графе "Количество мест" пункт "для 1 гостя"`
  },

  2: {
    validate: (guests) => {
      return guests === 0 || guests === 3;
    },
    text: `Ошибка!Размещение в 2-х комнатах расчитано только на 1 гостя или на 2-х гостей.
    Пожалуйста, выберете в графе "Количество мест" пункт "для 1 гостя" или "для 2 гостей"`
  },

  3: {
    validate: (guests) => {
      return guests === 0;
    },
    text: `Ошибка!Размещение в 3-х комнатах расчитано только на 1 гостя, 2-х гостей или 3-ч гостей.
    Пожалуйста, выберете в графе "Количество мест" пункт "для 1 гостя", "для 2 гостей" или "для 3 гостей"`
  },

  100: {
    validate: (guests) => {
      return guests !== 0;
    },
    text: `Ошибка!При выборе 100 комнат действуют специальные условия!
    Пожалуйста выберете в графе "Количество мест" пункт "не для гостей"`
  }
};

function validateInput(rooms, guests) {
  const roomsValue = Number(rooms);// переводим дефолтное строчное значение roomsValue в число
  const guestsValue = Number(guests);// также как и с roomsValue

  const validationRule = validationRules[roomsValue];

  if (validationRule.validate(guestsValue)) {
    roomElement.setCustomValidity(validationRule.text);
  } else {
    roomElement.setCustomValidity(``);
  }
}

// вешаем обработчик на select с комнатами (#room_number), так как значение текущего option переходят в select
roomElement.addEventListener(`input`, (evt) => {
  const target = evt.target; // элемент на котором случилось событие
  const roomValue = target.value; // значение элемента, на котором случилось событие
  const guestValue = guestElement.value; // значение селекта #capacity = значение текущего option

  validateInput(roomValue, guestValue);
});

// вешаем такой же обработчик событий как и на roomElement
guestElement.addEventListener(`input`, (evt) => {
  const target = evt.target;
  const guestValue = target.value; // тут уже отслеживаем значение для guest
  const roomValue = roomElement.value;

  validateInput(roomValue, guestValue);
});
