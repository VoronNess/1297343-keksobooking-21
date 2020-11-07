'use strict';

(function () {
  const advertisementAddressInput = document.querySelector(`#address`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const mainPinLeftValue = mainPin.offsetLeft;

  const mainPinTopValue = mainPin.offsetTop;
  const DEFAULT_ADDRESS_X = mainPinLeftValue + window.constants.HALF_MAIN_PIN;
  const DEFAULT_ADDRESS_Y = mainPinTopValue + window.constants.HALF_MAIN_PIN;

  const addressX = DEFAULT_ADDRESS_X;
  const addressY = DEFAULT_ADDRESS_Y + window.constants.HALF_MAIN_PIN + window.constants.MAIN_PIN_POINTER_HEIGHT;

  const setDefaultAddressCoordinates = () => {
    advertisementAddressInput.value = DEFAULT_ADDRESS_X + `, ` + DEFAULT_ADDRESS_Y;
  };

  const updateAddressCoordinates = () => {
    advertisementAddressInput.value = addressX + `, ` + addressY;
  };

  const currentAddressCoordinates = (x, y) => {
    advertisementAddressInput.value = x + `, ` + y;
  };
  window.form = {
    setDefaultAddressCoordinates,
    updateAddressCoordinates,
    currentAddressCoordinates,
  };
})();
