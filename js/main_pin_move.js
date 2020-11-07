'use strict';
(function () {
  const pinsConteiner = document.querySelector(`.map__pins`);
  const mainPin = pinsConteiner.querySelector(`.map__pin--main`);

  const addElementMovingListener = () => {
    mainPin.addEventListener(`mousedown`, (evt) => {
      let dragged = false;

      const shiftX = evt.clientX - mainPin.getBoundingClientRect().left;
      const shiftY = evt.clientY - mainPin.getBoundingClientRect().top;

      const moveAt = (pageX, pageY) => {
        mainPin.style.left = pageX - shiftX + `px`;
        mainPin.style.top = pageY - shiftY + `px`;

        const currentX = mainPin.offsetLeft;
        const currentY = mainPin.offsetTop;

        const pinCenterCurrentX = currentX + window.constants.HALF_MAIN_PIN;
        const pinCenterCurrentY = currentY + window.constants.HALF_MAIN_PIN + window.constants.MAIN_PIN_POINTER_HEIGHT;

        window.form.currentAddressCoordinates(pinCenterCurrentX, pinCenterCurrentY);
      };

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();

        moveAt(moveEvt.pageX, moveEvt.pageY);

        dragged = true;
      };


      const onMouseUp = (upEvt) => {
        evt.preventDefault();

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
  };

  window.mainPinMove = {
    addElementMovingListener
  };
})();
