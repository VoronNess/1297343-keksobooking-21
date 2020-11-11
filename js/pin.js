'use strict';

(function () {
  const pinsConteiner = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

  const mainPin = pinsConteiner.querySelector(`.map__pin--main`);

  const createActiveListener = () => {
    if (window.main.isActive) {
      return;
    }
    window.main.setActive();

    mainPin.removeEventListener(`mousedown`, createActiveListener);
    mainPin.removeEventListener(`keydown`, createActiveListener);
  };

  const pageIsActiveListener = () => {
    if (window.main.isActive) {
      return;
    }
    mainPin.addEventListener(`mousedown`, createActiveListener);
    mainPin.addEventListener(`keydown`, createActiveListener);
  };

  const addElementListener = (renderedPin) => {
    renderedPin.addEventListener(`click`, (evt) => {
      const clickedPin = evt.currentTarget;

      renderedPin.classList.add(`map__pin--active`);

      if (renderedPin.classList.contains(`map__pin--active`)) {
        renderedPin.classList.remove(`map__pin--active`);
      }

      window.card.openElement(clickedPin);
    });
  };

  const renderElement = (element, data) => {
    const pinLeftPosition = window.constants.MOVE_X + data.location.x;
    const pinTopPosition = window.constants.MOVE_Y + data.location.y;

    element.style.left = `${pinLeftPosition}px`;
    element.style.top = `${pinTopPosition}px`;

    element.querySelector(`img`).src = data.author.avatar;
    element.querySelector(`img`).alt = data.offer.title;
  };

  const renderAllElements = (array) => {
    for (let i = 0; i < window.constants.MAX_DATA_ELEMENTS_COUNT; i++) {
      const pinElement = pinTemplate.cloneNode(true);

      pinElement.setAttribute(`id`, `card_${i}`);

      renderElement(pinElement, array[i]);

      pinsConteiner.appendChild(pinElement);
      addElementListener(pinElement);
    }
  };

  /*
    const renderElement = (data) => {
    const pinElement = pinTemplate.cloneNode(true);

    pinElement.setAttribute(`id`, `card_${data}`);

    const pinLeftPosition = window.constants.MOVE_X + data.location.x;
    const pinTopPosition = window.constants.MOVE_Y + data.location.y;

    pinElement.style.left = `${pinLeftPosition}px`;
    pinElement.style.top = `${pinTopPosition}px`;

    pinElement.querySelector(`img`).src = data.author.avatar;
    pinElement.querySelector(`img`).alt = data.offer.title;

    return pinElement;
  };


  const renderAllFragments = (array) => {
    const pinFragment = document.createDocumentFragment();

    for (let i = 0; i <= window.constants.MAX_DATA_ELEMENTS_COUNT; i++) {

      pinFragment.appendChild(renderElement(array[i]));
    }

    pinsConteiner.appendChild(pinFragment);
    addElementListener(pinFragment);
  };


  window.pin = {
    pageIsActiveListener,
    addElementListener,
    renderAllFragments,

  };
})();
  */

  window.pin = {
    renderAllElements,
    pageIsActiveListener,
    addElementListener,
  };
})();
