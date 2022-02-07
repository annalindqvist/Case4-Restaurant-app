let url;
const result = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn")

// latitude & longitude 
let latitude = document.getElementById("latitude");
let longitude = document.getElementById("longitude");

submitBtn.onclick = () => {
    url = "jsonFiles/NY100.json";
    fetch(url)
        .then(response => response.json())
        .then(data => priceSort(data.data))
        .then(data => createElement(data.data))
    //.catch(error => renderError(error));
}

// Filter by price function

const priceRange = document.getElementById("priceRange");

function priceSort (e) {

    e.preventDefault();

    priceRange.addEventListener("click", function(e){
        if (e.target.classList != "activeBtn") {
            e.target.classList = "activeBtn";
        }
        console.log(e.target)
    })
}




//Create elements function

function createElement(data) {

    data.forEach(restaurant => {

        let div = document.createElement("div");

        // restaurant name
        let restaurantName = document.createElement("h4");
        restaurantName.innerText = restaurant.restaurant_name;
        div.appendChild(restaurantName);

        // cuisine
        let restaurantCuisine = document.createElement("p");
        restaurantCuisine.innerText = restaurant.cuisines;
        div.appendChild(restaurantCuisine);

        // price range
        let priceRange = document.createElement("p");
        priceRange.innerText = restaurant.price_range;
        div.appendChild(priceRange);

        // geo.. long & lat
        let geo = document.createElement("p");
        geo.innerText = calcCrow(restaurant.geo.lat, restaurant.geo.lon, latitude.innerText, longitude.innerText);
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
        if (restaurant.restaurant_website.length > 1) {
            let restaurantWebsite = document.createElement("a");
            restaurantWebsite.href = restaurant.restaurant_website;
            restaurantWebsite.innerText = "Restaurants website";
            restaurantWebsite.setAttribute("target", "_blank");
            div.appendChild(restaurantWebsite);
        }

        // adding to result div
        result.appendChild(div);

    });
}

// Distance function

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
    if (e.target.className === "heartBtn") {
        e.target.firstElementChild.classList.toggle("fas");
    }
};