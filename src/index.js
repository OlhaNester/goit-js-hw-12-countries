import './css/style.css';

import { alert, error, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyMobile, {});

// import * as PNotifyMobile from 'node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
//import articlesTmpl from './templates/articles.hbs';
import tplCountryList from './templates/tpl_country_list.hbs';
import tplCountryInfo from './templates/tpl_country_info.hbs';

var _ = require('lodash');

// import "./styles.css";
// import articlesTmpl from "./templates/articles.hbs";

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

function fetchCountries(searchCountry) {
  const url = `https://restcountries.eu/rest/v2/name/${searchCountry}`;
  return fetch(url).then(res => res.json());
}

function handlerFetch(countries) {
  if (countries.length === 1) {
    cardCountry(countries[0]);
  } else if (countries.length > 1 && countries.length <= 10) {
    itemsCountry(countries);
  } else {
    error({
      title: 'Oh No!',
      text: 'Something terrible happened.',
      delay: 1000,
    });
    // alert({
    //   text: 'Ошибка',
    // });
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

// const sourcetemplateList = refs.templateList.innerHTML.trim();
// const tplListFunc = Handlebars.compile(sourcetemplateList);

// const sourcetemplateCountry = refs.templateCountry.innerHTML.trim();
// const tplCountryFunc = Handlebars.compile(sourcetemplateCountry);
