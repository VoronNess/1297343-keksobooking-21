'use strict';

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

const setAbleHTMLElements = (elements) => {
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

const addressValueArray = [];
const getAddressValueArray = (array1, array2, count) => {
  for (let i = 0; i < count; i++) {
    const addressValue = `` + (array1[i] + window.constants.HALF_RENDERED_PIN_WIDTH) + `` + `,` + `` + (array2[i] + window.constants.RENDERED_PIN_HEIGHT) + ``;
    addressValueArray.push(addressValue);
  }
  console.log(addressValueArray);
  return addressValueArray;
};

(function () {

  window.util = {
    getRandomArrayElement,
    getRandomRangeElement,

    getShuffledArray,
    pluralizeWord,

    disableHTMLElements,
    setAbleHTMLElements,

    getArrayOfNumbers,
    getAddressValueArray
  };
})();
