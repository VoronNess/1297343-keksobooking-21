'use strict';
const mapBlock = document.querySelector(`.map`);
mapBlock.classList.remove(`map--faded`);

const pins = document.querySelector(`.map__pins`);
const pinsTemplate = document.querySelector(`#pin`).content;

const titleContent = [`И снова Торонто!`, `Нью-Йорк, Нью-Йорк!`, `Велкам ту Сингапур!`, `Здравствуй, Прага!`, `Бонжур, Париж!`, `Будапешт, Hello!`, `Панама-Нама`, `Свободный Амстердам`];
const typeContent = [`bungalow`, `flat`, `house`, `palace`];
const featuresContent = [`wifi`, `dishwasher`, `parking`, `washer`];
const descriptionContent = [`qui ratione voluptatem sequi nesciunt`, `quia voluptas sit`, `aspernatur aut odit aut fugit`, `taque earum rerum hic tenetur`];
const photosContent = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel1.jpg`];

const minTitleRange = 0;
const maxTitleRange = 7;
const minPriceRange = 1000;
const maxPriceRange = 35000;
const minTypeRange = 0;
const maxTypeRange = 3;
const minRoomsRange = 1;
const maxRoomsRange = 4;
const minGuestsRange = 1;
const maxGuestsRange = 6;
const minInOutRange = 2;
const maxInOutRange = 4;
const minFeaturesRange = 0;
const maxFeaturesRange = 3;
const minDescriptionRange = 0;
const maxDescriptionRange = 3;

const MINRANGELOCATION = 130;
const maxRangeLocationY = 480;
const maxRangeLocationX = 760;

const minLocationX = -60;
const maxLocationX = 680;
const minLocationY = 130;
const maxLocationY = 560;


const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// добавление диапазона чисел в массив
const getRandomArray = (min, max) => {
  const array = [];
  for (let i = min; i <= max; i++) {
    array.push(i);
  }
  return array;
};

const shuffle = (arr) => {
  let j; let x; let i;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
};

// задаем перемешанному массиву переменную со значением диапазона avatar
const shuffleArray = shuffle(getRandomArray(1, 8));

const getObject = (iter) => {

  const locationY = randomInteger(MINRANGELOCATION, maxRangeLocationY);
  const locationX = randomInteger(MINRANGELOCATION, maxRangeLocationX);

  let objectsAll = [];

  for (let i = 0; i < iter; i++) {
    let author = {};
    author.avatar = `img/avatars/user0` + shuffleArray[i] + `.png`;
    let offer = {
      title: titleContent[randomInteger(minTitleRange, maxTitleRange)],
      address: ` ` + locationY + `,` + locationX + ` `,
      price: randomInteger(minPriceRange, maxPriceRange),
      type: typeContent[randomInteger(minTypeRange, maxTypeRange)],
      rooms: randomInteger(minRoomsRange, maxRoomsRange),
      guests: randomInteger(minGuestsRange, maxGuestsRange),
      checkin: `1` + randomInteger(minInOutRange, maxInOutRange) + `:00`,
      checkout: `1` + randomInteger(minInOutRange, maxInOutRange) + `:00`,
      features: featuresContent[randomInteger(minFeaturesRange, maxFeaturesRange)] + `, ` + featuresContent[randomInteger(minFeaturesRange, maxFeaturesRange)],
      description: descriptionContent[randomInteger(minDescriptionRange, maxDescriptionRange)],
      photos: [photosContent[1], photosContent[2]],
    };
    let location = {x: randomInteger(minLocationX, maxLocationX), y: randomInteger(minLocationY, maxLocationY)};

    objectsAll.push({author, offer, location});
  }

  return objectsAll;
};

let finArray = getObject(8);

const renderPins = (array) => {
  for (let i = 0; i < array.length; i++) {
    let pinElement = pinsTemplate.cloneNode(true);
    let pinStyle = pinsTemplate.querySelector(`.map__pin`);
    let moveX = 100;
    let moveY = 40;

    pinStyle.setAttribute(`style`, `left:` + (moveX + array[i].location.x) + `px; top:` + (moveY + array[i].location.y) + `px;`);
    let pinImg = pinStyle.querySelector(`img`);
    pinImg.src = array[i].author.avatar;
    pinImg.alt = array[i].offer.title;


    pins.appendChild(pinElement);
  }
};
renderPins(finArray);


const cardsTemplate = document.querySelector(`#card`)
.content
.querySelector(`.map__card`);

const mapFilter = mapBlock.querySelector(`.map__filters-container`);

let cardElement = cardsTemplate.cloneNode(true);
let cardAvatar = cardElement.querySelector(`.popup__avatar`);
let cardTitle = cardElement.querySelector(`.popup__title`);
let cardAddress = cardElement.querySelector(`.popup__text--address`);
let cardPrice = cardElement.querySelector(`.popup__text--price`);
let cardType = cardElement.querySelector(`.popup__type`);
let cardRoomsGuests = cardElement.querySelector(`.popup__text--capacity`);
let cardTime = cardElement.querySelector(`.popup__text--time`);
let cardFeatures = cardElement.querySelector(`.popup__features`);
let cardDescription = cardElement.querySelector(`.popup__description`);
let cardPhotoes = cardElement.querySelector(`.popup__photos`);
let cardPhotoesImg = cardPhotoes.querySelector(`img`);
let arr = finArray[0].offer;
cardAvatar.src = finArray[0].author.avatar;
cardTitle.textContent = arr.title;
cardAddress.textContent = arr.address;
cardPrice.textContent = arr.price + `₽/ночь`;

const getCardType = (english, rus) => {
  if (arr.type === english) {
    cardType.textContent = rus;
  }
  return cardType.textContent;
};
getCardType(`flat`, `Квартира`);
getCardType(`bungalow`, `Бунгало`);
getCardType(`house`, `Дом`);
getCardType(`palace`, `Дворец`);

let endingRooms = `ы`;
let endingGuests = `ей`;
if (arr.rooms === 1) {
  endingRooms = `а`;
}
if (arr.guests === 1) {
  endingGuests = `я`;
}
cardRoomsGuests.textContent = arr.rooms + ` комнат` + endingRooms + ` для ` + arr.guests + ` гост` + endingGuests;
cardTime.textContent = `Заезд после ` + arr.checkin + `, выезд до ` + arr.checkout;
cardFeatures.textContent = arr.features;
cardDescription.textContent = arr.description;


cardPhotoesImg.src = arr.photos[randomInteger(0, 1)];
let photoesImgClone = cardPhotoesImg.cloneNode(true);
cardPhotoes.appendChild(photoesImgClone);
cardPhotoesImg.src = arr.photos[randomInteger(0, 1)];

mapBlock.insertBefore(cardElement, mapFilter);

const isOfferChildExist = (child, hidden) => {
  if (arr.contains(!child)) {
    hidden.classList.add(`.hidden`);
  }
};
isOfferChildExist(arr.title, cardTitle);
isOfferChildExist(arr.address, cardAddress);
isOfferChildExist(arr.price, cardPrice);
isOfferChildExist(arr.type, cardType);
isOfferChildExist(arr.rooms, cardRoomsGuests);
isOfferChildExist(arr.guests, cardRoomsGuests);
isOfferChildExist(arr.checkin, cardTime);
isOfferChildExist(arr.checkout, cardTime);
isOfferChildExist(arr.description, cardDescription);
isOfferChildExist(arr.photos, cardPhotoes);
