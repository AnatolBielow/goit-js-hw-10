const dataServer = "https://restcountries.com/v3.1/name";
export function fetchCountries(countryName){
    
    return   fetch(`${dataServer}/${countryName}?fields=name,capital,population,flags,languages`).then(response => {
        if(!response.ok){
            throw Error(response.statusText);
        }
        return response.json();
    })
}
