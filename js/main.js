'use strict';

(function () {
  const mapBlock = document.querySelector(`.map`);
  const mapFilters = document.querySelectorAll(`.map__filter`);
  const advertisementForm = document.querySelector(`.ad-form`);

  const advertisementFormHeader = document.querySelector(`.ad-form-header`);
  const advertisementFormElements = document.querySelectorAll(`.ad-form__element`);
  const mainPin = document.querySelector(`.map__pin--main`);

  const setInactive = () => {
    window.main.isActive = false;

    window.util.disableHTMLElements(mapFilters);
    window.util.disableHTMLElements(advertisementFormElements);

    advertisementFormHeader.setAttribute(`disabled`, `true`);

    window.form.setAddressCoordinates(mainPin, window.constants.DEFAULT_ADDRESS_X, window.constants.DEFAULT_ADDRESS_Y);
    window.pin.pageIsActiveListener();
  };

  const setActive = () => {
    if (window.main.isActive) {
      return;
    }

    window.main.isActive = true;

    mapBlock.classList.remove(`map--faded`);
    advertisementFormHeader.removeAttribute(`disabled`);
    window.util.setEnableHTMLElements(advertisementFormElements);

    window.util.setEnableHTMLElements(mapFilters);
    advertisementForm.classList.remove(`ad-form--disabled`);
    window.form.setAddressCoordinates(mainPin, window.constants.PAGE_IS_ACTIVE_ADDRESS_X, window.constants.PAGE_IS_ACTIVE_ADDRESS_Y);

    window.validation.addTitleInputListener();
    window.validation.addPriceInputListener();
    window.validation.addTypeInputListener();

    window.validation.addRoomInputListener();
    window.validation.addGuestInputListener();
    window.validation.addTimeinListener();

    window.validation.addTimeoutListener();
    window.form.addResetFormListener();

    const successHandler = (serverArray) => {
      window.pin.renderAllElements(serverArray);
      window.card.renderAllElements(serverArray);

    };

    const errorHandler = (errorMessage) => {
      const node = document.createElement(`div`);

      node.style = `z-index: 3; margin: 0 auto; text-align: center; background-color: red;`;
      node.style.position = `absolute`;
      node.style.left = 0;

      node.style.right = 0;
      node.style.fontSize = `30px`;
      node.textContent = errorMessage;

      document.body.insertAdjacentElement(`afterbegin`, node);
    };

    window.api.getServerData(successHandler, errorHandler);
    window.form.addElementLisener();
  };

  const init = () => {
    setInactive();
  };

  window.main = {
    setActive,
    setInactive,
    isActive: true,
  };

  init();
})();
