const countryNameInfo = window.location.href
  .split("=")[1]
  .replaceAll("%20", " ");

const countryImage = document.querySelector(".img").firstElementChild;
const countryName = document.getElementById("countryName");
const nativeName = document.getElementById("nativeName");
const population = document.getElementById("Population");
const region = document.getElementById("region");
const subRegion = document.getElementById("subRegion");
const capital = document.getElementById("capital");
const borderCountries = document.getElementById("borderCountries");
const topLevelDomain = document.getElementById("topLevelDomain");
const curencies = document.getElementById("curencies");
const language = document.getElementById("languages");
const backBtn = document.getElementById("back");
const theameChanger = document.querySelector(".mode");
const theameIcon = document.getElementById("theameIcon");
const theameBtn = document.querySelector(".buttonWraper")
let borderCountriesPack = [];
const res = fetch(`https://restcountries.com/v3.1/name/${countryNameInfo}`);

res
  .then((res) => res.json())
  .then((data) => {
    // console.log(data[0]);
    countryImage.src = data[0].flags.svg;
    countryName.innerText = `${data[0].name.common}`;
    nativeName.innerText = `${
      Object.values(data[0].name.nativeName)[0].common
    }`;
    population.innerText = `${data[0].population.toLocaleString("en-IN")}`;
    region.innerText = `${data[0].region}`;
    subRegion.innerText = `${data[0].subregion}`;
    capital.innerText = `${data[0].capital}`;
    if (data[0].borders) {
      data[0].borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then((borderCountriesList) => {
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountriesList[0].name.common;
            borderCountries.append(borderCountryTag);
            borderCountryTag.href = `country.html?name=${borderCountriesList[0].name.common}`;
          });
      });
    }
    topLevelDomain.innerText = `${data[0].tld.join(", ")}`;
    curencies.innerText = `${Object.values(data[0].currencies).map(
      (main) => main.name
    )}`;
    language.innerText = Object.values(data[0].languages).join(", ");
  });


theameBtn.addEventListener("click", ()=>{
    const isDark = document.body.classList.toggle("theameChanger");

    if (isDark) {
        theameChanger.innerText = "Light mode";
        theameIcon.src = "/Icons/sunny-outline.svg";
    } else {
        theameChanger.innerText = "Dark mode";
        theameIcon.src = "/Icons/moon-outline.svg";
    }
})
