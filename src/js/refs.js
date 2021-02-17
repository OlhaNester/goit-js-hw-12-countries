import Handler from './Handler';
import debounce from 'lodash';

const refs = {
  countryContainer: document.querySelector('.js-countries'),
  searchForm: document.querySelector('.js-search-form'),
};

refs.searchForm.addEventListener('input', _.debounce(Handler, 500));
export default refs;
