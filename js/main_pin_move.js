'use strict';

(function () {
  const pinsConteiner = document.querySelector(`.map__pins`);
  const mainPin = pinsConteiner.querySelector(`.map__pin--main`);

  mainPin.style.zIndex = 1000;

  mainPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();


      dragged = true;

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const styleY = mainPin.offsetTop - shift.y;

      if (styleY < 130) {
        styleY = 130;
      }

      if (styleY > 630) {
        styleY = 630;
      }

      mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;

      window.form.setAddressCoordinates(mainPin, window.constants.PAGE_IS_ACTIVE_ADDRESS_X, window.constants.PAGE_IS_ACTIVE_ADDRESS_Y);
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();

          mainPin.removeEventListener(`click`, onClickPreventDefault);
        };

        mainPin.addEventListener(`click`, onClickPreventDefault);

      }
      upEvt.preventDefault();

    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

})();
