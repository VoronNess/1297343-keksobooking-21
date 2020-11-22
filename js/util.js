'use strict';

(function () {

  const checkArrayForTypeAndFull = (array) => {
    if (typeof array === `undefined`) {
      throw new Error(`Данные не могут быть пусты`);
    }

    if (!Array.isArray(array)) {
      throw new Error(`В параметр, в котором должен быть array, передеаются данные не в том формате`);
    }
  };

  const checkElementForFull = (element) => {
    if (typeof element === `undefined`) {
      throw new Error(`Нет данных в запрашиваемом элементе`);
    }
  };

  const checkElementForType = (element, type) => {
    if (typeof element !== type) {
      throw new Error(`В параметр передеаются данные не в том формате`);
    }
  };
  const pluralizeWord = (arrayElement, array) => {
    checkArrayForTypeAndFull(array);
    checkElementForFull(arrayElement);
    checkElementForType(arrayElement, `number`);

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

  const hideEmptyString = (check, hidden) => {
    checkElementForFull(hidden);
    checkElementForFull(check);

    if (check === ``) {
      hidden.classList.add(`hidden`);
    }
  };

  const hideEmptyNumber = (check, hidden) => {
    checkElementForFull(hidden);
    checkElementForFull(check);

    if (check === 0) {
      hidden.classList.add(`hidden`);
    }
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

  const renderData = (data) => {
    checkArrayForTypeAndFull(data);

    window.pin.dellAllElements();
    window.card.dellAllElements();

    window.pin.renderAllElements(data);
    window.card.renderAllElements(data);
  };

  window.util = {
    pluralizeWord,
    disableHTMLElements,
    setEnableHTMLElements,

    createErrorMessage,
    renderData,
    checkArrayForTypeAndFull,

    hideEmptyString,
    hideEmptyNumber
  };
})();
