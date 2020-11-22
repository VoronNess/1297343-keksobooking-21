'use strict';

(function () {
  const advertisementAddressInput = document.querySelector(`#address`);
  const formSection = document.querySelector(`.notice`);
  const form = formSection.querySelector(`.ad-form`);

  const mapBlock = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const resetButton = form.querySelector(`.ad-form__reset`);

  const errorPopupTemplate = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);

  const errorPopupCloseButton = errorPopupTemplate.querySelector(`.error__button`);
  const successPopupTemplate = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);

  const setAddressCoordinates = (element, x, y) => {
    let currentX = element.offsetLeft;
    let currentY = element.offsetTop;

    const pinPointerCurrentX = currentX + x;
    const pinPointerCurrentY = currentY + y;

    advertisementAddressInput.value = pinPointerCurrentX + `, ` + pinPointerCurrentY;
  };

  const returnInactive = () => {
    mapBlock.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    const defualtMainPinLeft = window.constants.MAIN_PIN_DEFUALT_LEFT;

    const defualtMainPinTop = window.constants.MAIN_PIN_DEFUALT_TOP;
    mainPin.style.left = defualtMainPinLeft;
    mainPin.style.top = defualtMainPinTop;

    window.card.dellAllElements();
    window.pin.dellAllElements();
  };

  const addResetFormListener = () => {
    resetButton.addEventListener(`click`, (evt) => {
      if (evt.which === 1) {
        returnInactive();
        window.main.setInactive();
      }
    });

    resetButton.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        returnInactive();
        window.main.setInactive();
      }
    });
  };

  const addElementLisener = () => {
    form.addEventListener(`submit`, function (evt) {

      window.api.sendFormData(new FormData(form), function () {
        form.reset();
        returnInactive();
        window.main.setInactive();
      });

      evt.preventDefault();
    });
  };

  const addSuccessPopupListener = (element) => {
    window.addEventListener(`click`, (evt) => {
      if (evt.which === 1) {
        form.removeChild(element);
      }
    });

    window.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        form.removeChild(element);
      }
    });
  };

  const createSuccessPopup = () => {
    const successPopup = successPopupTemplate.cloneNode(true);
    form.appendChild(successPopup);

    addSuccessPopupListener(successPopup);
  };

  const addErrorPopupListener = (element, close) => {
    close.addEventListener(`click`, (evt) => {
      if (evt.which === 1) {
        form.removeChild(element);
      }
    });

    close.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        form.removeChild(element);
      }
    });

    window.addEventListener(`click`, (evt) => {
      if (evt.which === 1) {
        form.removeChild(element);
      }
    });

    window.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        form.removeChild(element);
      }
    });
  };

  const createErrorPopup = () => {
    const ErrorPopup = errorPopupTemplate.cloneNode(true);
    form.appendChild(ErrorPopup);

    addErrorPopupListener(ErrorPopup, errorPopupCloseButton);
  };

  window.form = {
    setAddressCoordinates,
    addElementLisener,
    addResetFormListener,

    createSuccessPopup,
    createErrorPopup
  };
})();
