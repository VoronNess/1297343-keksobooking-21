'use strict';

(function () {
  const advertisementAddressInput = document.querySelector(`#address`);

  const setAddressCoordinates = (element, x, y) => {
    let currentX = element.offsetLeft;
    let currentY = element.offsetTop;

    const pinPointerCurrentX = currentX + x;
    const pinPointerCurrentY = currentY + y;

    advertisementAddressInput.value = pinPointerCurrentX + `, ` + pinPointerCurrentY;
  };

  window.form = {
    setAddressCoordinates,
  };
})();
