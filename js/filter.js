'use strict';

(function () {
  const filters = document.querySelector(`.map__filters`);
  const apartmentsFilter = filters.querySelector(`#housing-type`);
  const roomsFilter = filters.querySelector(`#housing-rooms`);

  const guestsFilter = filters.querySelector(`#housing-guests`);
  const featuresFilter = filters.querySelector(`#housing-features`);
  const priceFilter = filters.querySelector(`#housing-price`);

  const filterFeatures = (data) => {
    const featuresElements = featuresFilter.querySelectorAll(`input:checked`);

    for (let featuresElement of featuresElements) {
      if (data.indexOf(featuresElement.value) === -1) {
        return false;
      }
    }

    return true;
  };

  const filterAdvertisements = function (items) {
    const filteredApartments = items

    .filter(function (card) {
      if (apartmentsFilter.value === window.constants.FILTER_VALUE_ANY) {
        return card.offer.type;
      }
      return card.offer.type === apartmentsFilter.value;
    })

    .filter(function (card) {
      if (roomsFilter.value === window.constants.FILTER_VALUE_ANY) {
        return card.offer.rooms;
      }
      return card.offer.rooms === +roomsFilter.value;
    })

    .filter(function (card) {
      if (guestsFilter.value === window.constants.FILTER_VALUE_ANY) {
        return card.offer.guests;
      }
      return card.offer.guests === +guestsFilter.value;
    })

    .filter(function (card) {
      if (priceFilter.value === `low`) {
        return card.offer.price < window.constants.MIDDLE_PRICE_RANGE;
      }

      if (priceFilter.value === `middle`) {
        return card.offer.price >= window.constants.MIDDLE_PRICE_RANGE
        && card.offer.price <= window.constants.MAX_PRICE_RANGE;
      }

      if (priceFilter.value === `high`) {
        return card.offer.price > window.constants.MAX_PRICE_RANGE;
      }
      if (priceFilter.value === `any`) {
        return card.offer.price;
      }
      return card.offer.price !== 0;

    });

    window.util.renderData(filteredApartments);
  };

  const addFilterListener = (data) => {
    filters.addEventListener(`change`, () => {
      filterAdvertisements(data);
    });
  };

  window.filter = {
    filterAdvertisements,
    addFilterListener,
  };
})();
