import './css/style.css';
import fetchCountries from './js/fetchCountries';
import { alert, error, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
import tplCountryList from './templates/tpl_country_list.hbs';
import tplCountryInfo from './templates/tpl_country_info.hbs';
import debounce from 'lodash';

defaultModules.set(PNotifyMobile, {});
const refs = {
  countryContainer: document.querySelector('.js-countries'),
  searchForm: document.querySelector('.js-search-form'),
};

const Handler = function (event) {
  const imputValue = event.target.value;

  event.preventDefault();
  refs.countryContainer.innerHTML = '';

  const promjson = fetchCountries(imputValue);
  promjson.then(handlerFetch);
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

function cardCountry(info) {
  const infoCountry = tplCountryInfo(info);
  refs.countryContainer.insertAdjacentHTML('beforeend', infoCountry);
}

function itemsCountry(countries) {
  const listCountries = tplCountryList(countries);
  refs.countryContainer.insertAdjacentHTML('beforeend', listCountries);
}

refs.searchForm.addEventListener('input', _.debounce(Handler, 500));
