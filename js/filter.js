'use strict';

(function () {
  const filters = document.querySelector(`.map__filters`);
  const apartmentsFilter = filters.querySelector(`#housing-type`);
  const roomsFilter = filters.querySelector(`#housing-rooms`);

  const guestsFilter = filters.querySelector(`#housing-guests`);
  const featuresFilter = filters.querySelector(`#housing-features`);
  const priceFilter = filters.querySelector(`#housing-price`);

  const renderFilteredData = (data) => {
    window.pin.dellAllElements();
    window.card.dellAllElements();

    window.pin.renderAllElements(data);
    window.card.renderAllElements(data);
  };

  let userApartmentsChoice = window.constants.ADVERTISEMENT_TYPES[4].id;
  let userRoomsChoice = window.constants.ADVERTISEMENT_TYPES[4].id;
  let userGuestsChoice = window.constants.ADVERTISEMENT_TYPES[4].id;

  let userFeaturesChoice = ``;
  let userPriceChoice = window.constants.ADVERTISEMENT_TYPES[4].id;

  const getRank = function (item) {
    let rank = 0;

    if (item.offer.type === userApartmentsChoice) {
      rank += 4;
    }

    if (item.offer.rooms === userRoomsChoice) {
      rank += 2;
    }

    if (item.offer.guests === userGuestsChoice) {
      rank += 2;
    }

    if (item.offer.features === userFeaturesChoice) {
      rank += 4;
    }

    if (item.offer.price === userPriceChoice) {
      rank += 5;
    }

    return rank;
  };

  const addApartamentsFilterListener = (data) => {
    apartmentsFilter.addEventListener(`input`, (evt) => {
      const target = evt.target;
      const filterValue = target.value;

      userApartmentsChoice = filterValue;
      filterAdvertisements(data);
    });
  };

  const addRoomsFilterListener = (data) => {
    roomsFilter.addEventListener(`input`, (evt) => {
      const target = evt.target;
      const filterValue = target.value;

      userRoomsChoice = Number(filterValue);
      filterAdvertisements(data);
    });
  };

  const addGuestsFilterListener = (data) => {
    guestsFilter.addEventListener(`input`, (evt) => {
      const target = evt.target;
      const filterValue = target.value;

      userGuestsChoice = Number(filterValue);
      filterAdvertisements(data);
    });
  };

  const addFeaturesFilterListener = (data) => {
    featuresFilter.addEventListener(`input`, (evt) => {
      const target = evt.target;
      let filterValue;

      if (target.checked) {
        filterValue = target.value;
      }
      userFeaturesChoice = filterValue;
      filterAdvertisements(data);
    });
  };

  const addPriceFilterListener = (data) => {
    priceFilter.addEventListener(`input`, (evt) => {
      const target = evt.target;
      const filterValue = target.value;

      if (filterValue === `middle`) {
        userPriceChoice = userPriceChoice >= 10000 && userPriceChoice <= 49000;
      }
      if (filterValue === `low`) {
        userPriceChoice = userPriceChoice >= 0 && userPriceChoice <= 9999;
      }
      if (filterValue === `high`) {
        userPriceChoice = userPriceChoice >= 50000;
      }

      filterAdvertisements(data);
    });
  };

  const filterAdvertisements = function (items) {
    renderFilteredData(items.sort(function (left, right) {
      return getRank(right) - getRank(left);
    }));
  };

  window.filter = {
    filterAdvertisements,
    addApartamentsFilterListener,
    addRoomsFilterListener,

    addGuestsFilterListener,
    addFeaturesFilterListener,
    addPriceFilterListener,
  };
})();

// const priceFilter = filters.querySelector(`#housing-price`);
// let userPricesChoice = 0;
/* const samePrices = items.filter(function (price) {
      for (let i = 0; i < window.constants.ADVERTISEMENT_PRICES.length; i++) {
        const currentPrice = window.constants.ADVERTISEMENT_PRICES[i];

        if (price.offer.price === currentPrice.price) {
          userPrice = currentPrice.price;
        }
      }
      return price.offer.price === userPrice;
    });
    */

// let sameItemsArray = sameApartaments.concat(samePrices);
// console.log(sameApartaments);
/* const addPriceFilterListener = (data) => {
    priceFilter.addEventListener(`input`, (evt) => {
      const target = evt.target;
      const filterValue = target.value;

      userPricesChoice = filterValue;
      filterAdvertisements(data, userApartmentsChoice, userPricesChoice);
    });
  };*/
