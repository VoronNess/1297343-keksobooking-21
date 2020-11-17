'use strict';

(function () {
  const filters = document.querySelector(`.map__filters`);
  const apartamentsFilter = filters.querySelector(`#housing-type`);
  const priceFilter = filters.querySelector(`#housing-price`);

  let userApartmentsChoice = window.constants.ADVERTISEMENT_TYPES[4].id;
  let userPricesChoice = 0;

  const getSameItemsArray = function (items, userApartament, userPrice) {
    const sameApartaments = items.filter(function (apartament) {
      return apartament.offer.type === userApartament;
    });

    const samePrices = items.filter(function (price) {
      for (let i = 0; i < window.constants.ADVERTISEMENT_PRICES.length; i++) {
        const currentPrice = window.constants.ADVERTISEMENT_PRICES[i];

        if (price.offer.price === currentPrice.price) {
          userPrice = currentPrice.price;
        }
      }
      return price.offer.price === userPrice;
    });

    let sameItemsArray = sameApartaments.concat(samePrices);
    window.pin.renderAllElements(sameItemsArray);
    window.card.renderAllElements(sameItemsArray);
  };

  const addApartamentsFilterListener = (data) => {
    apartamentsFilter.addEventListener(`input`, (evt) => {
      const target = evt.target;
      const filterValue = target.value;

      userApartmentsChoice = filterValue;
      getSameItemsArray(data, userApartmentsChoice, userPricesChoice);
    });
  };

  const addPriceFilterListener = (data) => {
    priceFilter.addEventListener(`input`, (evt) => {
      const target = evt.target;
      const filterValue = target.value;

      userPricesChoice = filterValue;
      getSameItemsArray(data, userApartmentsChoice, userPricesChoice);
    });
  };

  window.filter = {
    addApartamentsFilterListener,
    addPriceFilterListener,
  };
})();

/* 'use strict';

(function () {
  const filters = document.querySelector(`.map__filters`);
  const apartamentsFilter = filters.querySelector(`#housing-type`);

  let userApartmentsChoice = window.constants.ADVERTISEMENT_TYPES[4].id;

  const getSameApartamentsArray = function (apartaments, userchoice) {
    const sameApartaments = apartaments.filter(function (apartament) {
      return apartament.offer.type === userchoice;
    });

    window.pin.renderAllElements(sameApartaments);
    window.card.renderAllElements(sameApartaments);
  };

  const addFilterListener = (data) => {
    apartamentsFilter.addEventListener(`input`, (evt) => {
      const target = evt.target;
      const filterValue = target.value;

      userApartmentsChoice = filterValue;
      getSameApartamentsArray(data, userApartmentsChoice);
    });
  };


  window.filter = {
    addFilterListener,
    getSameApartamentsArray
  };

})();*/
