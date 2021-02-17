import tplCountryList from '../templates/tpl_country_list.hbs';
import tplCountryInfo from '../templates/tpl_country_info.hbs';
import refs from './refs';

function cardCountry(info) {
  const infoCountry = tplCountryInfo(info);
  refs.countryContainer.insertAdjacentHTML('beforeend', infoCountry);
}

function itemsCountry(countries) {
  const listCountries = tplCountryList(countries);
  refs.countryContainer.insertAdjacentHTML('beforeend', listCountries);
}
export { cardCountry, itemsCountry };
