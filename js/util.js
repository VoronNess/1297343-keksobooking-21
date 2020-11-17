'use strict';

(function () {
  const getRandomArrayElement = (arr) => {
    const i = Math.floor(Math.random() * arr.length);
    const random = arr[i];
    return random;
  };

  const getRandomRangeElement = (min, max) => {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
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

  const pluralizeWord = (arrayElement, array) => {
    if (arrayElement === 1) {
      return array[0];
    } else {
      return array[1];
    }
  };

  const disableHTMLElements = (elements) => {
    for (let element of elements) {
      element.setAttribute(`disabled`, `true`);
    }
  };

  const setEnableHTMLElements = (elements) => {
    for (let element of elements) {
      element.removeAttribute(`disabled`);
    }
  };

  const getArrayOfNumbers = (min, max) => {
    const array = [];
    for (let i = min; i <= max; i++) {
      array.push(i);
    }
    return array;
  };

  const hideEmptyString = (check, hidden) => {
    if (check === ``) {
      hidden.classList.add(`hidden`);
    }
  };

  const hideEmptyNumber = (check, hidden) => {
    if (check === 0) {
      hidden.classList.add(`hidden`);
    }
  };

  const checkDataStringsForEmpty = (data, avatar, title, address, type, capacity, price, time, description, photos) => {
    hideEmptyString(data.author.avatar, avatar);
    hideEmptyString(data.offer.title, title);
    hideEmptyString(data.offer.address, address);

    hideEmptyString(data.offer.type, type);
    hideEmptyString(data.offer.price, price);
    hideEmptyString(data.offer.checkin, time);

    hideEmptyString(data.offer.checkout, time);
    hideEmptyString(data.offer.description, description);

    hideEmptyNumber(data.offer.guests, capacity);
    hideEmptyNumber(data.offer.rooms, capacity);
    hideEmptyNumber(data.offer.photos.length, photos);
  };

  const createErrorMessage = (errorMessage) => {
    const node = document.createElement(`div`);

    node.style = `z-index: 3; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;

    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = errorMessage;

    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.util = {
    getRandomArrayElement,
    getRandomRangeElement,
    getShuffledArray,

    pluralizeWord,
    disableHTMLElements,
    setEnableHTMLElements,

    getArrayOfNumbers,
    hideEmptyString,
    hideEmptyNumber,
    checkDataStringsForEmpty,
    createErrorMessage
  };
})();
