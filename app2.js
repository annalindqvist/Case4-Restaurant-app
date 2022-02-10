// har hämtar information från API:et om New York
// med denna länk: "https://api.documenu.com/v2/restaurants/state/NY?key=e85086501af955112390f6a87d0cb5c2";

// json filen
//const url = "jsonFiles/NY100.json"

let url = "jsonFiles/NY100.json";

//url = "jsonFiles/brooklyn.json"
//url = "jsonFiles/lowerManhattan.json"
url = "jsonFiles/midtown.json";

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


//    e.preventDefault();

//const selectCity = document.getElementById("city");

//får inte till detta..
// selectCity.onchange = () => {

//     if (selectCity.value === "newyork") {
//         url = "jsonFiles/NY100.json";
//         console.log("hej", url)
//         return url;
//     } else if (selectCity.value === "brooklyn") {
//         url = "jsonFiles/brooklyn.json";
//         console.log("hej", url)
//         return url;
//     } else if (selectCity.value === "lowerManhattan") {
//         url = "jsonFiles/lowerManhattan.json";
//         console.log("hej", url)
//         return url;
//     } else if (selectCity.value === "midtown") {
//         url = "jsonFiles/midtown.json";
//         console.log("hej", url)
//         return url;
//     }
//     console.log(url)

// };
// console.log(url)

//url = "jsonFiles/lowerManhattan.json";


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

    cuisinecheck();
    checkInput();

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

        let cuisineFilters = searchResult.filter((restaurant) => {
            return restaurant.cuisines.includes(activeBtnCuisine[0].innerText);
        });

        var allElements = document.querySelectorAll(".activeBtnCuisine");
        for (i = 0; i < allElements.length; i++) {

            allElements[i].classList.remove('activeBtnCuisine');

        }

        cuisineFilteredList = [...cuisineFilteredList, ...cuisineFilters];
    }

    return cuisineFilteredList;
}

function checkInput() {

    if (inputBox.value.length > 1) {

        // få till toLowerCase() på cuisin
        let cuisineSearch = restaurantData.filter((restaurant) => {
            return restaurant.cuisines.find(cuisine => cuisine.includes(inputBox.value));
        });

        let nameSearch = restaurantData.filter((restaurant) => {
            return restaurant.restaurant_name.toLowerCase().includes(inputBox.value.toLowerCase());
        });
        console.log(nameSearch);

        inputSearch = [...inputSearch, ...cuisineSearch, ...nameSearch];
    }
    return inputSearch;
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
// // ------------- DISTANCE BUTTONS -------------
// distance.addEventListener("click", function (e) {

//     e.target.classList.toggle("activeDistanceBtn")

// })

// ------------- CUISINE BUTTONS -------------
cuisineChoise.addEventListener("click", function (e) {

    e.target.classList.toggle("activeBtnCuisine");

})

// funktionen som skapar element + lägger in info om restaurangerna

function createElement(element) {


    let div = document.createElement("div");
    div.classList = "restResult";

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

    let pic = document.createElement("image");
    pic.innerHTML = getImg();
    div.appendChild(pic);


    // adding to result div
    result.appendChild(div);

    return geo.innerText;

}

function getImg() {

    let images = [];

    const pic1 = '<img src="images/tapas.webp" alt="tapas">';
    const pic2 = '<img src="images/american.webp" alt="americanfood">';
    const pic3 = '<img src="images/burger.webp" alt="burger">';
    const pic4 = '<img src="images/chinese.webp" alt="chinesefood">';
    const pic5 = '<img src="images/french.webp" alt="frenchfood">';
    const pic6 = '<img src="images/indian.webp" alt="indianfood">';
    const pic7 = '<img src="images/italian.webp" alt="italian">';
    const pic8 = '<img src="images/japanese.webp" alt="japanesefood">';
    const pic9 = '<img src="images/korean.webp" alt="koreanfood">';
    const pic10 = '<img src="images/moroccan.webp" alt="moroccanfood">';
    const pic11 = '<img src="images/pizza.webp" alt="pizza">';
    const pic12 = '<img src="images/rest1.webp" alt="restaurant>';
    const pic13 = '<img src="images/sandwiches.webp" alt="sandwiches">';
    const pic14 = '<img src="images/spanish.png" alt="spanishfood">';
    const pic15 = '<img src="images/steak.webp" alt="steak">';
    const pic16 = '<img src="images/sushi.webp" alt="sushi">';

    images.push(pic1);
    images.push(pic2);
    images.push(pic3);
    images.push(pic4);
    images.push(pic5);
    images.push(pic6);
    images.push(pic7);
    images.push(pic8);
    images.push(pic9);
    images.push(pic10);
    images.push(pic11);
    images.push(pic12);
    images.push(pic13);
    images.push(pic14);
    images.push(pic15);
    images.push(pic16);

    let randomPic = Math.floor(Math.random() * images.length);
    return images[randomPic];

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