const cardsContainer = document.querySelector(".cardsContainer");
const selectField = document.getElementById("selectField");
const searchInputValue = document.querySelector(".searchCountry");
const theameChanger = document.querySelector(".darkMode");
const mode = document.querySelector(".mode");
const body = document.body;
let loadedData;


window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("currentTheame") == "Dark") {
        body.classList.toggle("theameChanger");
        mode.innerText = "Light mode";
        theameChanger.children[0].src = "../Icons/sunny-outline.svg";
    }
    else{
        mode.innerText = "Dark mode";
        theameChanger.children[0].src = "../Icons/moon-outline.svg";
    }
});

async function main(data) {
    cardsContainer.innerHTML = "";
    data.forEach((countries) => {
        const cards = document.createElement("a");
        cards.href = `detail/country.html?name=${countries.name.common}`;
        cards.innerHTML = `
                <div class="cards">
                        <img src="${countries.flags.svg}" alt="${
            countries.flags.alt
        }"/>
                        <div class="countryName">
                            <h4>${countries.name.common}</h4>
                        </div>
                        <div class="countryDetails">
                            <p><b>Population:</b> ${countries.population.toLocaleString(
                                "en-IN"
                            )}</p>
                            <p><b>Region:</b> ${countries.region}</p>
                            <p><b>Capital:</b> ${countries.capital}</p>
                        </div>
                </div>`;
        cardsContainer.append(cards);
    });
}

fetch(
    "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,currency,language,population"
)
    .then((res) => res.json())
    .then((data) => {
        main(data);
        loadedData = data;
    });

selectField.addEventListener("change", () => {
    fetch(`https://restcountries.com/v3.1/region/${selectField.value}`)
        .then((res) => res.json())
        .then((data) => {
            main(data);
        });
});

searchInputValue.addEventListener("input", (value) => {
    const finalResult = loadedData.filter((country) =>
        country.name.common
            .toLowerCase()
            .includes(value.target.value.toLowerCase())
    );
    main(finalResult);
});

theameChanger.addEventListener("click", () => {
    body.classList.toggle("theameChanger");
    if (mode.innerText == "Dark mode") {
        mode.innerText = "Light mode";
        theameChanger.children[0].src = "../Icons/sunny-outline.svg";
        localStorage.setItem("currentTheame", "Dark");
    } else {
        mode.innerText = "Dark mode";
        theameChanger.children[0].src = "../Icons/moon-outline.svg";
        localStorage.setItem("currentTheame", "Light");
    }
});
