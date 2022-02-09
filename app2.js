// har hämtar information från API:et om New York
// med denna länk: "https://api.documenu.com/v2/restaurants/state/NY?key=e85086501af955112390f6a87d0cb5c2";

// json filen
const url = "jsonFiles/NY100.json"
const brooklynUrl = "jsonFiles/brooklyn.json"

let inputBox = document.getElementById("cuisinesInput");
const priceRangeDiv = document.getElementById("priceRangeDiv");
const priceOneBtn = document.getElementById("priceOne");
const priceTwoBtn = document.getElementById("priceTwo");
const priceThreeBtn = document.getElementById("priceThree");
const priceFourBtn = document.getElementById("priceFour");
const submitBtn = document.getElementById("submitBtn")
const result = document.getElementById("result");
const cuisineChoise = document.getElementById("cuisineChoises");

const homeBtn = document.getElementById("homeBtn")
const allRest = document.getElementById("allRest");
const newRest = document.getElementById("newRest");

// distanceBtn
const distance = document.getElementById("distance");

// Latitude & Longitude

let latitudeInput = document.getElementById("latitude");
let longitudeInput = document.getElementById("longitude");

// Class variables
let activeBtnCuisine = document.getElementsByClassName("activeBtnCuisine");
let activeDistanceBtn = document.getElementsByName("activeDistanceBtn");

// data and searchResult variables
let restaurantData;
let searchResult = [];
let inputSearch = [];


// -------------------------------------------------------------------------
// kolla på: ha fetch i en onclick/onsubmit/addeventlistner så den inte körs i onödan...
// när man klickar på sök-knappen kanske? finns dock "två" sökknappar (sök nere i menyn och på homepage)

const signIn = document.getElementById("signIn");

//signIn.addEventListener("click", function(e) {

//    e.preventDefault();


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

let cuisineFilteredList = [];

// -----------------------------------------------------------------------------------------------------------------------
// när man klickar på search-knappen (submit) kollar vi vilka knappar som är aktiva och filtrerar därefter restaurangerna

submitBtn.addEventListener("click", function (e) {

    e.preventDefault();

    result.innerHTML = "";
    searchResult = [];
    cuisineFilteredList = [];
    inputSearch = [];

    // $ knapparna fungerar och kan filtrera med en eller flera alternativ
    // få till dom i en mindre funktion? kalla på en funktion som ligger utanför denna? 

    // function priceCheck() {

    //     if (priceOneBtn.className === "activeBtn") {
    //         let priceOneList = restaurantData.filter((restaurant) => {
    //             return restaurant.price_range.length === 1;
    //         })
    //         searchResult = [...searchResult, ...priceOneList];

    //         priceOneBtn.classList.remove("activeBtn");

    //     };
    //     if (priceTwoBtn.className === "activeBtn") {
    //         let priceTwoList = restaurantData.filter((restaurant) => {
    //             return restaurant.price_range.length === 2;
    //         })
    //         searchResult = [...searchResult, ...priceTwoList];

    //         priceTwoBtn.classList.remove("activeBtn");

    //     };
    //     if (priceThreeBtn.className === "activeBtn") {
    //         let priceThreeList = restaurantData.filter((restaurant) => {
    //             return restaurant.price_range.length === 3;
    //         })
    //         searchResult = [...searchResult, ...priceThreeList];

    //         priceThreeBtn.classList.remove("activeBtn");

    //     };
    //     if (priceFourBtn.className === "activeBtn") {
    //         let priceFourList = restaurantData.filter((restaurant) => {
    //             return restaurant.price_range.length === 4;
    //         })
    //         searchResult = [...searchResult, ...priceFourList];

    //         priceFourBtn.classList.remove("activeBtn");

    //     };

    //     return searchResult;

    // }

    // function cuisinecheck() {

    //     priceCheck()

    //     if (searchResult.length >= 1) {

    //         //console.log("activeBtnCuisine[0].value: ", activeBtnCuisine[0].value)
    //         //console.log(searchResult[0])
    //         let cuisineFilters = searchResult.filter((restaurant) => {
    //             return restaurant.cuisines.includes(activeBtnCuisine[0].value);
    //         });

    //         let cuisineBtnClass = document.getElementsByClassName("activeBtnCuisine");
    //         [].forEach.call(cuisineBtnClass, function (e) {
    //             e.classList.remove("activeBtnCuisine");
    //         });
    //         //activeBtnCuisine[0].className.remove(activeBtnCuisine)

    //         //console.log("cuisineFilters: ", cuisineFilters)
    //         cuisineFilteredList = [...cuisineFilteredList, ...cuisineFilters];
    //     }

    //     return cuisineFilteredList;
    // }

    cuisinecheck();

    // if (searchResult.length >= 1) {

    //     //console.log("activeBtnCuisine[0].value: ", activeBtnCuisine[0].value)
    //     //console.log(searchResult[0])
    //     let cuisineFilters = searchResult.filter((restaurant) => {
    //         return restaurant.cuisines.includes(activeBtnCuisine[0].value);
    //     });

    //     let cuisineBtnClass = document.getElementsByClassName("activeBtnCuisine");
    //     [].forEach.call(cuisineBtnClass, function(e) {
    //         e.classList.remove("activeBtnCuisine");
    //     });
    //     //activeBtnCuisine[0].className.remove(activeBtnCuisine)

    //     //console.log("cuisineFilters: ", cuisineFilters)
    //     cuisineFilteredList = [...cuisineFilteredList, ...cuisineFilters];
    // }

    // inputfältets filter efter cuisine..kolla på autocomplete hur det funkar.
    // vill söka på restaurangnamn och cuisine
    // kanske ha en funktion utanför man kallar på som kollar om innehållet i inputBox matchar cuisine &/ restName?

    

        if (inputBox.value.length > 1) {
            let cuisineSearch = restaurantData.filter((restaurant) => {
                return restaurant.cuisines.find(cuisine => cuisine.includes(inputBox.value));
            });
            // let nameSearch = restaurantData.filter((restaurant) => {
            //     return restaurant.restaurant_name.find(name => name.includes(inputBox.value));
            // });
            //console.log("namesearch: ", nameSearch)
            inputSearch = [...inputSearch, ...cuisineSearch];
        }
        
    

    // if (inputBox.value.length > 1) {
    //     let cuisineSearch = restaurantData.filter((restaurant) => {
    //         return restaurant.cuisines.find(cuisine => cuisine.includes(inputBox.value));
    //     });
    //     // let nameSearch = restaurantData.filter((restaurant) => {
    //     //     return restaurant.restaurant_name.find(name => name.includes(inputBox.value));
    //     // });
    //     //console.log("namesearch: ", nameSearch)
    //     inputSearch = [...inputSearch, ...cuisineSearch];
    // }

    // mappar igenom searchResult och kör funktionen createElement 

    if (cuisineFilteredList.length >= 1) {
        cuisineFilteredList.map((restaurant) => {

            createElement(restaurant)

        });
    } else if (inputSearch.length >= 1) {
        inputSearch.map((restaurant) => {

            createElement(restaurant)

        });
    } else {
        console.log("hej")
        errorMessage();
        // ONSDAG 9/2 att göra nedan + kolla variabelnamn osvosvosv...
        // fixa funktion som skriver ut att det inte finns några restauranger och skriv ut kanske vad man sökt efter? 
        // css: man kan markera hela diven rosa, skriv .activeBtn button för att slippa det i CSS
    }



})

function priceCheck() {

    if (priceOneBtn.className === "activeBtn") {
        let priceOneList = restaurantData.filter((restaurant) => {
            return restaurant.price_range.length === 1;
        })
        searchResult = [...searchResult, ...priceOneList];

        priceOneBtn.classList.remove("activeBtn");

    };
    if (priceTwoBtn.className === "activeBtn") {
        let priceTwoList = restaurantData.filter((restaurant) => {
            return restaurant.price_range.length === 2;
        })
        searchResult = [...searchResult, ...priceTwoList];

        priceTwoBtn.classList.remove("activeBtn");

    };
    if (priceThreeBtn.className === "activeBtn") {
        let priceThreeList = restaurantData.filter((restaurant) => {
            return restaurant.price_range.length === 3;
        })
        searchResult = [...searchResult, ...priceThreeList];

        priceThreeBtn.classList.remove("activeBtn");

    };
    if (priceFourBtn.className === "activeBtn") {
        let priceFourList = restaurantData.filter((restaurant) => {
            return restaurant.price_range.length === 4;
        })
        searchResult = [...searchResult, ...priceFourList];

        priceFourBtn.classList.remove("activeBtn");

    };

    return searchResult;

}

function cuisinecheck() {

    priceCheck()

    if (searchResult.length >= 1) {

        //console.log("activeBtnCuisine[0].value: ", activeBtnCuisine[0].value)
        //console.log(searchResult[0])
        let cuisineFilters = searchResult.filter((restaurant) => {
            return restaurant.cuisines.includes(activeBtnCuisine[0].value);
        });

        let cuisineBtnClass = document.getElementsByClassName("activeBtnCuisine");
        [].forEach.call(cuisineBtnClass, function (e) {
            e.classList.remove("activeBtnCuisine");
        });
        //activeBtnCuisine[0].className.remove(activeBtnCuisine)

        //console.log("cuisineFilters: ", cuisineFilters)
        cuisineFilteredList = [...cuisineFilteredList, ...cuisineFilters];
    }

    return cuisineFilteredList;
}

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

// ------------- DISTANCE BUTTONS -------------
distance.addEventListener("click", function (e) {

    e.target.classList.toggle("activeDistanceBtn")

})


// ------------- CUISINE BUTTONS -------------
cuisineChoise.addEventListener("click", function (e) {

    e.target.classList.toggle("activeBtnCuisine");

})

// funktionen som skapar element + lägger in info om restaurangerna

function createElement(element) {


    let div = document.createElement("div");

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
    geo.innerText = calcCrow(element.geo.lat, element.geo.lon, latitudeInput.innerText, longitudeInput.innerText);
    geo.classList = "distanceClass";
    div.appendChild(geo);

    //heart
    let heart = document.createElement("p");
    //heart.innerHTML = '<i class="far fa-heart"></i>';
    heart.innerHTML = '<i class="far fa-heart"></i>';
    heart.classList = "heartBtn";
    heart.id = "heart";
    div.appendChild(heart);

    // website
    if (element.restaurant_website.length > 1) {
        let restaurantWebsite = document.createElement("a");
        restaurantWebsite.href = element.restaurant_website;
        restaurantWebsite.innerText = "Restaurants website";
        restaurantWebsite.setAttribute("target", "_blank");
        div.appendChild(restaurantWebsite);
    }

    // adding to result div
    result.appendChild(div);

}

function errorMessage() {

    let div = document.createElement("div");
    div.id = "errorDiv"
    let p = document.createElement("p");
    p.innerText = "Vänligen försök igen. Det fanns inga restauranger med dina önskemål";
    div.appendChild(p);

    result.appendChild(div);
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

// heartBtn fill or un-fill
result.onclick = function (e) {
    e.preventDefault();
    console.log(e.target)
    if (e.target.className === "heartBtn") {
        e.target.firstElementChild.classList.toggle("fas");
    }
};