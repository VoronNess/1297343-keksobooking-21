'use strict';

(function () {
  const pinsContainer = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

  const mainPin = pinsContainer.querySelector(`.map__pin--main`);

  const createActiveListener = () => {
    if (window.main.isActive) {
      return;
    }
    window.main.setActive();

    mainPin.removeEventListener(`mouseup`, createActiveListener);
    mainPin.removeEventListener(`keydown`, createActiveListener);
  };

  const pageIsActiveListener = () => {
    if (window.main.isActive) {
      return;
    }
    mainPin.addEventListener(`mouseup`, createActiveListener);
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
    window.util.hideEmptyNumber(data.offer.length, element);

    element.classList.add(`map__pin--rendered`);
  };

  const renderAllElements = (array) => {
    if (array.length < window.constants.MAX_DATA_ELEMENTS_COUNT) {
      window.constants.MAX_DATA_ELEMENTS_COUNT = array.length;
    }

    for (let i = 0; i < window.constants.MAX_DATA_ELEMENTS_COUNT; i++) {
      const pinElement = pinTemplate.cloneNode(true);

      pinElement.setAttribute(`id`, `card_${i}`);

      renderElement(pinElement, array[i]);

      pinsContainer.appendChild(pinElement);
      addElementListener(pinElement);
    }
  };
  const dellAllElements = () => {
    const pins = document.querySelectorAll(`.map__pin--rendered`);

    for (const pin of pins) {
      pin.remove();
    }
  };

  window.pin = {
    renderAllElements,
    pageIsActiveListener,
    addElementListener,
    dellAllElements
  };
})();
