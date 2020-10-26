'use strict';
(function () {
  const pins = document.querySelector(`.map__pins`);
  const pinsTemplate = document.querySelector(`#pin`).content;
  const pinStyle = pinsTemplate.querySelector(`.map__pin`);

  const mainPin = document.querySelector(`.map__pin--main`);
  let isEnabledActiveMode = false;

  const createActiveListener = (evt) => {
    if (evt.which === 1 || evt.key === `Enter`) {
      window.main.setActive();
      isEnabledActiveMode = true;
      mainPin.removeEventListener(`mousedown`, createActiveListener);
      mainPin.removeEventListener(`keydown`, createActiveListener);
    }
  };

  const renderPins = (array) => {
    for (let i = 0; i < array.length; i++) {
      const pinElement = pinsTemplate.cloneNode(true);

      pinStyle.setAttribute(`style`, `left:` + (window.constants.MOVE_X + array[i].location.x)
    + `px; top:` + (window.constants.MOVE_Y + array[i].location.y) + `px;`);

      const pinImg = pinStyle.querySelector(`img`);
      pinImg.src = array[i].author.avatar;
      pinImg.alt = array[i].offer.title;
      pins.appendChild(pinElement);
    }
  };

  const activeModeEventListener = () => {
    if (isEnabledActiveMode) {
      return;
    }

    mainPin.addEventListener(`mousedown`, createActiveListener);
    mainPin.addEventListener(`keydown`, createActiveListener);
  };

  window.pin = {
    renderPins,
    activeModeEventListener,
  };
})();
