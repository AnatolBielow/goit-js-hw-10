import './css/styles.css';
import Notiflix from 'notiflix';
import { debounce } from 'lodash';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const maxLength = 10;


const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info')

input.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY))

function searchCountries(evt) {
    const trimInput = evt.target.value.trim()

    if(!trimInput){
            countryList.innerHTML = "";
            countryInfo.innerHTML = "";
            return;
           }
    fetchCountries(trimInput)
    .then(data => {
        if (data.length > maxLength) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            return;
        }
        if (data.length === 1) {
            countryList.innerHTML = '';
            countryInfo.innerHTML = 
            `<ul class=country-list>
            <li class="country-item"><img class="flag-image" src="${data[0].flags.svg}"><h2 class="country-name">${data[0].name.official}</h2></li>
            <li class="country-item"><span class="item-name">Capital:</span> ${data[0].capital}</li>
            <li class="country-item"><span class="item-name">Population:</span> ${data[0].population}</li>
            <li class="country-item"><span class="item-name">Languages:</span> ${Object.values(data[0].languages)} </li>
            </ul>`
        }    
        else {
            console.log('data List', data)
            countryInfo.innerHTML = '';
            countryList.innerHTML = 
            data.map(country => {
                return `<li class="country-item"><img class="flag-image" src="${country.flags.svg}">${country.name.official}</li>` 
            }).join('');    
        }
    })
    .catch(showError);
}

function showError() {
    Notiflix.Notify.failure("Oops, there is no country with that name");
    input.value = '';
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';    
}