'use strict';
const mapBlock = document.querySelector(`.map`);
mapBlock.classList.remove(`map--faded`);
const pins = document.querySelector(`.map__pins`);

const pinsTemplate = document.querySelector(`#pin`).content;
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
const createdArray = createArrayObjects(8);

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
const mapFilter = mapBlock.querySelector(`.map__filters-container`);

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
mapBlock.insertBefore(cardElement, mapFilter);
