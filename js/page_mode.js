'use strict';
(function () {
  const mapBlock = document.querySelector(`.map`);
  const mapFilters = document.querySelectorAll(`.map__filter`);
  const advertisementForm = document.querySelector(`.ad-form`);

  const advertisementFormHeader = document.querySelector(`.ad-form-header`);
  const advertisementFormElements = document.querySelectorAll(`.ad-form__element`);

  const roomElement = document.querySelector(`#room_number`);
  const guestElement = document.querySelector(`#capacity`);

  window.pageMode = {
    disableHTMLElements: (elements) => {
      for (let element of elements) {
        element.setAttribute(`disabled`, `true`);
      }
    },

    setAbleHTMLElements: (elements) => {
      for (let element of elements) {
        element.removeAttribute(`disabled`);
      }
    },

    setUnactiveMode: () => {
      window.pageMode.disableHTMLElements(mapFilters);
      window.pageMode.disableHTMLElements(advertisementFormElements);
      advertisementFormHeader.setAttribute(`disabled`, `true`);
      window.form.addressCoordinatesUnactiveMode();
    },

    setActiveMode: () => {
      mapBlock.classList.remove(`map--faded`);
      advertisementFormHeader.removeAttribute(`disabled`);
      window.pageMode.setAbleHTMLElements(advertisementFormElements);

      window.pageMode.setAbleHTMLElements(mapFilters);
      advertisementForm.classList.remove(`ad-form--disabled`);
      window.form.addressCoordinatesActiveMode();

      if (Number(roomElement.value) < Number(guestElement.value)) {
        roomElement.setCustomValidity(`Ошибка!Размещение в 1-ой комнате расчитано только на 1 гостя.
        Пожалуйста, выберете в графе "Количество мест" пункт "для 1 гостя"`);
      }
    }
  };
})();
