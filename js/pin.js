'use strict';
(function () {
  const pins = document.querySelector(`.map__pins`);
  const pinsTemplate = document.querySelector(`#pin`).content;
  const pinStyle = pinsTemplate.querySelector(`.map__pin`);

  const moveX = 100;
  const moveY = 40;
  const mainPin = document.querySelector(`.map__pin--main`);

  let isEnabledActiveMode = false;

  window.pin = {
    renderPins: (array) => {

      for (let i = 0; i < array.length; i++) {
        const pinElement = pinsTemplate.cloneNode(true);

        pinStyle.setAttribute(`style`, `left:` + (moveX + array[i].location.x)
      + `px; top:` + (moveY + array[i].location.y) + `px;`);

        const pinImg = pinStyle.querySelector(`img`);
        pinImg.src = array[i].author.avatar;
        pinImg.alt = array[i].offer.title;
        pins.appendChild(pinElement);
      }
    },

    activeModeEventListener: (evt) => {
      if (isEnabledActiveMode) {
        return;
      }
      if (evt.which === 1 || evt.key === `Enter`) {
        window.pageMode.setActiveMode();
        isEnabledActiveMode = true;
        mainPin.removeEventListener(`mousedown`, window.pin.activeModeEventListener(evt));
        mainPin.removeEventListener(`keydown`, window.pin.activeModeEventListener(evt));
      }
      mainPin.addEventListener(`mousedown`, window.pin.activeModeEventListener(evt));
      mainPin.addEventListener(`keydown`, window.pin.activeModeEventListener(evt));
    }
  };
})();
