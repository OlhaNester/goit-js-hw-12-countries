import './styles.css';
import articlesTmpl from './templates/articles.hbs';

const refs = {
  articlesContainer: document.querySelector('.js-articles'),
  searchForm: document.querySelector('js-search-form'),
};

refs.searchForm.addEventListener('input', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const imputValue = form.elements.query.value;
  fetchCountries(imputValue);
});

refs.articlesContainer.innerHTML = '';

function fetchCountries(searchCountry) {
  const url = 'https://restcountries.eu/rest/v2/name/{searchCountry}';
  fetch(url)
    .then(res => res.json())
    .then(({ articles }) => {
      const markup = articlesTmpl(articles);
      refs.articlesContainer.insertAdjacentHTML('beforeend', markup);
    })
    .catch(error => console.log(error));
}
