import Geonames from "geonames.js";
export async function getCountryFromAPI() {
  try {
    const url = "https://restcountries.eu/rest/v2/all";
    const reponse = await fetch(url);
    const result = await reponse.json();
    const aRendre = await result.map(countrydata);
    return aRendre;
  } catch (error) {
    console.error(error);
  }
}

export async function getCountryFromAPiWhenReseacrch(text) {
  try {
    const url =
      "https://restcountries.eu/rest/v2/name/" + text + "?fullText=true";
    const reponse = await fetch(url);
    const result = await reponse.json();
    const aRendre = await result.map(countrydata);
    return aRendre;
  } catch (error) {
    console.error(error);
  }
}

export async function getFlagOnCountry(text) {
  try {
    const url =
      "http://countryapi.gear.host/v1/Country/getCountries?pName=" + text;
    const reponse = await fetch(url);
    const result = await reponse.json();
    const aRendre = await result.Response[0].FlagPng;
    return aRendre;
  } catch (error) {
    console.error(error);
  }
}


function countrydata(country) {
  return {
    name: country.name,
    code: country.callingCodes[0]
  };
}