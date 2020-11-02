'use strict';
(function () {
  const pins = document.querySelector(`.map__pins`); // change name of variable  - pinsConteiner
  const pinsTemplate = document.querySelector(`#pin`).content;
  const pinStyle = pinsTemplate.querySelector(`.map__pin`);

  const mainPin = pins.querySelector(`.map__pin--main`);
  const renderedPinsTopValueArray = [];
  const renderedPinsLeftValueArray = [];

  let isEnabledActiveMode = false;

  const createActiveListener = (evt) => {
    if (evt.which === 1 || evt.key === `Enter`) {
      window.main.setActive();
      isEnabledActiveMode = true;
      const pinClicked = evt.target;

      window.card.openCard(pinClicked);
      mainPin.removeEventListener(`mousedown`, createActiveListener);
      mainPin.removeEventListener(`keydown`, createActiveListener);
    }
  };

  const renderAll = (array) => {
    for (let i = 0; i < array.length; i++) {
      const pinElement = pinsTemplate.cloneNode(true);

      pinStyle.setAttribute(`style`, `left:` + (window.constants.MOVE_X + array[i].location.x)
    + `px; top:` + (window.constants.MOVE_Y + array[i].location.y) + `px;`);

      const pinImg = pinStyle.querySelector(`img`);
      pinImg.src = array[i].author.avatar;
      pinImg.alt = array[i].offer.title;
      pins.appendChild(pinElement);
      window.pin.pinElementListener();
    }
  };

  const activeModeEventListener = () => {
    if (isEnabledActiveMode) {
      return;
    }
    mainPin.addEventListener(`mousedown`, createActiveListener);
    mainPin.addEventListener(`keydown`, createActiveListener);
  };

  const getPinsLeftCoordinatesArray = () => {
    const renderedPins = pins.querySelectorAll(`.map__pin`);
    for (let renderedPin of renderedPins) {
      renderedPinsLeftValueArray.push(renderedPin.offsetLeft);
    }
    return renderedPinsLeftValueArray;
  };

  const getPinsTopCoordinatesArray = () => {
    const renderedPins = pins.querySelectorAll(`.map__pin`);

    for (let renderedPin of renderedPins) {
      renderedPinsTopValueArray.push(renderedPin.offsetTop);
    }
    return renderedPinsTopValueArray;
  };

  const pinElementListener = () => {
    const renderedPins = pins.querySelectorAll(`.map__pin`);

    for (let renderedPin of renderedPins) {
      renderedPin.addEventListener(`click`, (evt) => {
        const pinClicked = evt.target;
        window.card.openCard(pinClicked);
      });
    }
  };

  window.pin = {
    renderAll,
    activeModeEventListener,
    getPinsLeftCoordinatesArray,

    getPinsTopCoordinatesArray,
    pinElementListener,
  };
})();
/*

*/
