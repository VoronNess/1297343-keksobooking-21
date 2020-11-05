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

  const addElementListener = (renderedPin) => {
    renderedPin.addEventListener(`click`, (evt) => {
      const clickedPin = evt.currentTarget;

      window.card.openElement(clickedPin);
    });
  };

  const renderAllElements = (array) => {
    for (let i = 0; i < array.length; i++) {
      const pinElement = pinTemplate.cloneNode(true);

      pinElement.setAttribute(`id`, array[i].offer.id);

      const pinLeftPosition = window.constants.MOVE_X + array[i].location.x;
      const pinTopPosition = window.constants.MOVE_Y + array[i].location.y;

      pinElement.style.left = `${pinLeftPosition}px`;
      pinElement.style.top = `${pinTopPosition}px`;

      const pinImg = pinTemplate.querySelector(`img`);
      pinImg.src = array[i].author.avatar;
      pinImg.alt = array[i].offer.title;

      pinsConteiner.appendChild(pinElement);

      addElementListener(pinElement);
    }
  };

  const pageIsActiveListener = () => {
    if (window.main.isActive) {
      return;
    }

    mainPin.addEventListener(`mousedown`, createActiveListener);
    mainPin.addEventListener(`keydown`, createActiveListener);
  };

  window.pin = {
    renderAllElements,
    pageIsActiveListener,
    addElementListener,
  };
})();
