import refs from './refs';
import fetchCountries from './fetchCountries';

import { alert, error, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';

import { cardCountry, itemsCountry } from './markup';

defaultModules.set(PNotifyMobile, {});

const Handler = function (event) {
  const imputValue = event.target.value;

  event.preventDefault();
  refs.countryContainer.innerHTML = '';

  fetchCountries(imputValue).then(handlerFetch).catch(handlerError);
};
function handlerFetch(countries) {
  if (countries.length === 1) {
    cardCountry(countries[0]);
  } else if (countries.length > 1 && countries.length <= 10) {
    itemsCountry(countries);
  } else {
    error({
      title: '',
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 3000,
    });
  }
}
function handlerError() {
  error({
    title: 'Ups!',
    text: 'Something was wrong!',
    delay: 3000,
  });
}

export default Handler;
