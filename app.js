// har hämtar information från API:et om New York
// med denna länk: "https://api.documenu.com/v2/restaurants/state/NY?key=e85086501af955112390f6a87d0cb5c2";
// sparat informationen i en json-fil som jag i denna kod hämtar information från

// json filen
let url = "NY100.json";
const form = document.querySelector("form");
let inputBox = document.getElementById("cuisinesInput");
const priceRangeDiv = document.getElementById("priceRangeDiv");
const priceOneBtn = document.getElementById("priceOne");
const priceTwoBtn = document.getElementById("priceTwo");
const priceThreeBtn = document.getElementById("priceThree");
const priceFourBtn = document.getElementById("priceFour");
const submitBtn = document.getElementById("submitBtn")
const result = document.getElementById("result");
const cuisineChoise = document.getElementById("cuisineChoises");

// distanceBtn
const fiveOrMore = document.getElementById("fiveOrMore");

// lat long in addresses
let addressOne = document.getElementById("addressOne");
addressOne = [40.779792, -73.961611];

let addressTwo = document.getElementById("addressTwo");
addressTwo = [40.712984, -74.013276];

let restaurantData;
let divCounter = 0; // ta bort? behövs denna ens? till vad isåfall?
let searchResult = [];


// -------------------------------------------------------------------------
// kolla på: ha fetch i en onclick/onsubmit/addeventlistner så den inte körs i onödan...

fetch(url).then(function (response) {

    if (!response.ok) {
        throw Error("Error!");
    }

    return response.json();

}).then(function (data) {

    restaurantData = data.data;
}).catch(function (error) {
    console.log(error);
});


// -----------------------------------------------------------------------------------------------------------------------
// när man klickar på search-knappen (submit) kollar vi vilka knappar som är aktiva och filtrerar därefter restaurangerna

submitBtn.addEventListener("click", function (e) {

    e.preventDefault();

    result.innerHTML = "";
    searchResult = [];

    // $ knapparna fungerar och kan filtrera med en eller flera alternativ
    // få till dom i en mindre funktion? kalla på en funktion som ligger utanför denna? 
    if (priceOneBtn.className === "activeBtn") {
        let priceOneList = restaurantData.filter((restaurant) => {
            return restaurant.price_range.length === 1;
        })
        searchResult = [...searchResult, priceOneList];

        priceOneBtn.classList.remove("activeBtn");

    }
    if (priceTwoBtn.className === "activeBtn") {
        let priceTwoList = restaurantData.filter((restaurant) => {
            return restaurant.price_range.length === 2;
        })
        searchResult = [...searchResult, priceTwoList];

        priceTwoBtn.classList.remove("activeBtn");

    }
    if (priceThreeBtn.className === "activeBtn") {
        let priceThreeList = restaurantData.filter((restaurant) => {
            return restaurant.price_range.length === 3;
        })
        searchResult = [...searchResult, priceThreeList];

        priceThreeBtn.classList.remove("activeBtn");

    }
    if (priceFourBtn.className === "activeBtn") {
        let priceFourList = restaurantData.filter((restaurant) => {
            return restaurant.price_range.length === 4;
        })
        searchResult = [...searchResult, priceFourList];

        priceFourBtn.classList.remove("activeBtn");

    }

    // inputfältets filter efter cuisine..kolla på autocomplete hur det funkar.
    // vill söka på restaurangnamn och cuisine
    // kanske ha en funktion utanför man kallar på som kollar om innehållet i inputBox matchar cuisine &/ restName?
    if (inputBox.value.length > 1) {
        let cuisineSearch = restaurantData.filter((restaurant) => {
            return restaurant.cuisines.find(cuisine => cuisine.includes(inputBox.value));
        });
        searchResult = [...searchResult, cuisineSearch];
    }

    // tar enbart fram testArray[0] nu.. hur ska man skriva..?
    testArray.map((cuisine) => {

        let cuisineChoises = restaurantData.filter((restaurant) => {
            return restaurant.cuisines.includes(testArray[0]);
        })
        searchResult = [...searchResult, cuisineChoises];
        
    })


    // mappar igenom searchResult och kör funktionen createElement 
    searchResult.map((restaurant) => {

        createElement(restaurant)

    });

})


// eventlyssnare för varje $ knapp som togglar activeBtn classen
priceOneBtn.addEventListener("click", function () {

    priceOneBtn.classList.toggle("activeBtn")

})
priceTwoBtn.addEventListener("click", function () {

    priceTwoBtn.classList.toggle("activeBtn")

})
priceThreeBtn.addEventListener("click", function () {

    priceThreeBtn.classList.toggle("activeBtn")

})
priceFourBtn.addEventListener("click", function () {

    priceFourBtn.classList.toggle("activeBtn")

})

// distance btn.....?
fiveOrMore.addEventListener("click", function () {
    fiveOrMore.classList.toggle("activeBtn")
})


// ------------- CUISINE KNAPPARNA -------------
// kolla mer på detta igen...

let testArray = [];
cuisineChoise.addEventListener("click", function (e) {


    e.target.classList.toggle("activeBtn");

    if (e.target.className === "activeBtn") {
        testArray = [...testArray, e.target.innerText];
    } else {
        let index = testArray.findIndex(number =>  number === e.target.value);
        testArray.splice(index); 
    }
    console.log(testArray);
})


// funktionen som skapar element + lägger in info om restaurangerna

function createElement(data) {

    data.forEach(element => {

        let div = document.createElement("div");

        div.id = "divId" + divCounter++;

        // restaurant name
        let restaurantName = document.createElement("h4");
        restaurantName.innerText = element.restaurant_name;
        div.appendChild(restaurantName);

        // cuisine
        let restaurantCuisine = document.createElement("p");
        restaurantCuisine.innerText = element.cuisines;
        div.appendChild(restaurantCuisine);

        // price range
        let priceRange = document.createElement("p");
        priceRange.innerText = element.price_range;
        div.appendChild(priceRange);

        // geo.. long & lat
        let geo = document.createElement("p");
        geo.innerText = calcCrow(element.geo.lat, element.geo.lon, addressOne[0], addressOne[1]);
        div.appendChild(geo);

        // adding to result div
        result.appendChild(div);
    });

}

// ---------- Distance func ----------
//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)

function calcCrow(lat1, lon1, lat2, lon2) {
    let earthRadius = 6371; // km
    let dLat = toRadius(lat2 - lat1);
    let dLon = toRadius(lon2 - lon1);
    lat1 = toRadius(lat1);
    lat2 = toRadius(lat2);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    let angularDistance = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = earthRadius * angularDistance;
    return Math.round(distance * 10) / 10 + "km";
}

// Converts numeric degrees to radians
function toRadius(Value) {
    return Value * Math.PI / 180;
}