'use strict';
(function () {
  const mainPin = document.querySelector(`.map__pin--main`);
  const advertisementAdressInput = document.querySelector(`#address`);
  const mainPinHightWidth = 65;
  const mainPinPointerHeight = 22;
  const leftValueMainPin = mainPin.offsetLeft;
  const topValueMainPin = mainPin.offsetTop;
  const halfMainPin = Math.round((mainPinHightWidth / 2));
  const DEFAULT_ADDRESS_X = leftValueMainPin + halfMainPin; // левый верхний угол пина + половинка пина по "x" и по "y" = центр пина
  const DEFAULT_ADDRESS_Y = topValueMainPin + halfMainPin;
  // так как по дефолту нужен центр главного пина - ищем половину ширины/высоты
  const addressX = DEFAULT_ADDRESS_X;// по горизонтали ничего не меняется
  const addressY = DEFAULT_ADDRESS_Y + halfMainPin + mainPinPointerHeight;// от центра идем вниз до края круглой части пина, и ниже в высоту указателя

  window.form = {
    addressCoordinatesUnactiveMode: () => {
      advertisementAdressInput.value = DEFAULT_ADDRESS_X + `, ` + DEFAULT_ADDRESS_Y;// записываем координаты в строку адрес
    },

    addressCoordinatesActiveMode: () => {
      advertisementAdressInput.value = addressX + `, ` + addressY;// записываем координаты в строку адрес
    }
  };
})();
