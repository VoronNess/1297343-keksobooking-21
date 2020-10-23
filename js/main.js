'use strict';
// const createdArray = window.data.createArrayObjects(8);
// window.pin.renderPins(createdArray);
// window.card.setCardInfo(createdArray);

window.pageMode.setUnactiveMode();
const mainPin = document.querySelector(`.map__pin--main`);
let isEnabledActiveMode = false;

const activeModeEventListener = (evt) => {
  if (isEnabledActiveMode) {
    return;
  }
  if (evt.which === 1 || evt.key === `Enter`) {
    window.pageMode.setActiveMode();
    isEnabledActiveMode = true;
    mainPin.removeEventListener(`mousedown`, activeModeEventListener);
    mainPin.removeEventListener(`keydown`, activeModeEventListener);
  }
};

mainPin.addEventListener(`mousedown`, activeModeEventListener);
mainPin.addEventListener(`keydown`, activeModeEventListener);

window.validation.roomElementListener();
window.validation.guestElementListener();
