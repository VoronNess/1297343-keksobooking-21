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
const ZERO = 0;
const ONE = 1;
const TWO = 2;
const THREE = 3;
const FOUR = 4;
const SIX = 6;
const MINRANGELOCATION = 130;
const maxRangeLocationY = 480;
const maxRangeLocationX = 760;
const minLocationX = -60;
const maxLocationX = 680;
const minLocationY = 130;
const maxLocationY = 560;
const priceMin = 1000;
const priceMax = 35000;

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
      title: titleContent[randomInteger(ZERO, iter - ONE)],
      address: ` ` + locationY + `,` + locationX + ` `,
      price: randomInteger(priceMin, priceMax),
      type: typeContent[randomInteger(ZERO, THREE)],
      rooms: randomInteger(ONE, FOUR),
      guests: randomInteger(ZERO, SIX),
      checkin: `1` + randomInteger(TWO, FOUR) + `:00`,
      checkout: `1` + randomInteger(TWO, FOUR) + `:00`,
      features: featuresContent[randomInteger(ZERO, THREE)] + `,` + featuresContent[randomInteger(ZERO, THREE)],
      description: descriptionContent[randomInteger(ZERO, THREE)],
      photos: photosContent[randomInteger(ZERO, TWO)] + `,` + photosContent[randomInteger(ZERO, TWO)],
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
