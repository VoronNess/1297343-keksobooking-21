'use strict';

(function () {
  const pins = document.querySelector(`.map__pins`);
  const firstPin = pins.querySelector(`.map__pin:first-of-type`);
  const secondPin = pins.querySelector(`button:nth-of-type(2)`);

  const thirdPin = pins.querySelector(`button:nth-of-type(3)`);
  const fourthPin = pins.querySelector(`button:nth-of-type(4)`);
  const fifthPin = pins.querySelector(`button:nth-of-type(5)`);

  const sixthPin = pins.querySelector(`button:nth-of-type(6)`);
  const seventhPin = pins.querySelector(`button:nth-of-type(7)`);
  const eghthPin = pins.querySelector(`button:nth-of-type(8)`);

  const cardsConteiner = document.querySelector(`.cards-conteiner`);
  const firstCard = cardsConteiner.querySelector(`.map__card:first-child`);
  const secondCard = cardsConteiner.querySelector(`.map__card:nth-child(2)`);

  const thirdCard = cardsConteiner.querySelector(`.map__card:nth-child(3)`);
  const fourthCard = cardsConteiner.querySelector(`.map__card:nth-child(4)`);
  const fifthCard = cardsConteiner.querySelector(`.map__card:nth-child(5)`);

  const sixthCard = cardsConteiner.querySelector(`.map__card:nth-child(6)`);
  const seventhCard = cardsConteiner.querySelector(`.map__card:nth-child(7)`);
  const eghthCard = cardsConteiner.querySelector(`.map__card:nth-child(8)`);

  const CARDS_OPEN_RULES = [
    {
      pin: firstPin,
      card: firstCard,
    },
    {
      pin: secondPin,
      card: secondCard,
    },
    {
      pin: thirdPin,
      card: thirdCard,
    },
    {
      pin: fourthPin,
      card: fourthCard,
    },
    {
      pin: fifthPin,
      card: fifthCard,
    },
    {
      pin: sixthPin,
      card: sixthCard,
    },
    {
      pin: seventhPin,
      card: seventhCard,
    },
    {
      pin: eghthPin,
      card: eghthCard,
    },
  ];
  window.cardsOpen = {
    CARDS_OPEN_RULES,
  };
})();
