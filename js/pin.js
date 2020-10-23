'use strict';
(function () {
  const pins = document.querySelector(`.map__pins`);
  const pinsTemplate = document.querySelector(`#pin`).content;
  const pinStyle = pinsTemplate.querySelector(`.map__pin`);
  const moveX = 100;
  const moveY = 40;

  window.pin = {
    renderPins: (array) => {

      for (let i = 0; i < array.length; i++) {
        const pinElement = pinsTemplate.cloneNode(true);

        pinStyle.setAttribute(`style`, `left:` + (moveX + array[i].location.x)
      + `px; top:` + (moveY + array[i].location.y) + `px;`);

        const pinImg = pinStyle.querySelector(`img`);
        pinImg.src = array[i].author.avatar;
        pinImg.alt = array[i].offer.title;
        pins.appendChild(pinElement);
      }
    }
  };
})();
