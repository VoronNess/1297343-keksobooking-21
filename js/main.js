'use strict';

(function () {
  const mapBlock = document.querySelector(`.map`);
  const mapFilters = document.querySelectorAll(`.map__filter`);
  const advertisementForm = document.querySelector(`.ad-form`);

  const advertisementFormHeader = document.querySelector(`.ad-form-header`);
  const advertisementFormElements = document.querySelectorAll(`.ad-form__element`);
  const roomElement = document.querySelector(`#room_number`);

  const guestElement = document.querySelector(`#capacity`);

  const setInactive = () => {
    window.main.isActive = false;

    window.util.disableHTMLElements(mapFilters);
    window.util.disableHTMLElements(advertisementFormElements);

    advertisementFormHeader.setAttribute(`disabled`, `true`);

    window.form.setDefaultAddressCoordinates();
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
    window.form.updateAddressCoordinates();

    window.validation.addTitleInputListener();
    window.validation.addPriceInputListener();
    window.validation.addTypeInputListener();

    window.validation.addRoomInputListener();
    window.validation.addGuestInputListener();
    window.validation.addTimeinListener();

    window.validation.addTimeoutListener();
    window.util.renderCardsAndPins(window.mockData.advertisments);

    if (Number(roomElement.value) < Number(guestElement.value)) {
      roomElement.setCustomValidity(`Ошибка!Размещение в 1-ой комнате расчитано только на 1 гостя.
      Пожалуйста, выберете в графе "Количество мест" пункт "для 1 гостя"`);
    }
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
