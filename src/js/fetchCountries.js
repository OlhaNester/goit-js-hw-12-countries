function fetchCountries(searchCountry) {
  const url = `https://restcountries.eu/rest/v2/name/${searchCountry}`;
  return fetch(url).then(res => res.json());
}
export default fetchCountries;
