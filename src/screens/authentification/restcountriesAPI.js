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

// export async function apidataPositionChoisi(props) {
//   try {
//     const url =
//       "http://api.geonames.org/findNearbyPlaceNameJSON?lat=" +
//       props[1] +
//       "&lng=" +
//       props[0] +
//       "&username=alain1234&style=full";
//     const reponse = await fetch(url);
//     const result = await reponse;
//     const aRendre = await result
//     return aRendre;
//   } catch (error) {
//     console.error(error);
//   }
// }

export function apidataPositionChoisi(location, props) {
  const geonames = new Geonames({
    username: "alain1234",
    lan: "en",
    encoding: "JSON"
  });
  const _pos = { lng: location[0], lat: location[1] };
  geonames
    .findNearbyPlaceName(_pos)
    .then(async loc => {
      const country = loc.geonames[0].countryName || null;
      const district = loc.geonames[0].adminName1 || null;
      const code = loc.geonames[0].countryCode || null;
      return await { code, country, district };
    })
    .catch(function(err) {
      return err.message;
    });
}

function countrydata(country) {
  return {
    name: country.name,
    code: country.callingCodes[0]
  };
}
