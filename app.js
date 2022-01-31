// har hämtar information från API:et om New York
// med denna länk: "https://api.documenu.com/v2/restaurants/state/NY?key=e85086501af955112390f6a87d0cb5c2";
// sparat informationen i en json-fil som jag i denna kod hämtar information från

// json filen
let url = "ny.json";
const form = document.querySelector("form");
let inputBox = document.getElementById("cuisinesInput");
let restaurantData;

// ha fetch i en onclick/onsubmit/addeventlistner så den inte körs i onödan
fetch(url).then (function (response){

    if (!response.ok) {
        throw Error("Error!");
    }

    return response.json();

}).then (function (data){

    restaurantData = data.data;
   
}).catch(function (error) {
    console.log(error);
});

form.onsubmit = function (e) {

    e.preventDefault();
    result.innerHTML = "";

    // resultatet nu: söker jag på ex. Chine får jag fram alla restauranger med cuisines: Chinese
    // vill: söka på en del av ett restaurangnamn eller del av cuisine som ovan och få fram alla träffar innehållande texten..
    // .. man vet inte alltid hela nament på restaurangen eller så..
    // första bokstaven ska bli stor oavsett om jag skrivit med stor eller liten bokstav
    let chosenRest = restaurantData.filter((restaurant) => {
        return restaurant.cuisines.find(cuisine => cuisine.includes(inputBox.value));
    });

    let divCounter = 0;

    chosenRest.map((restaurant) => {
        // måste ligga i denna funktion och inte utanför då den kommer gå igenom funktionen för varje restaurang i listan (25st)
        let div = document.createElement("div");
   
        // unikt id för varje skapad div som ökar med 1 för varje skapad div
        div.id = "divId" + divCounter++;
    
        // skapa h4 element med innehållet av restaurang-namnen och lägg till i diven
        let restaurantName = document.createElement("h4");
        restaurantName.innerText = restaurant.restaurant_name;
    
        div.appendChild(restaurantName);
    
        let restaurantCuisine = document.createElement("p");
        restaurantCuisine.innerText = restaurant.cuisines;
    
        div.appendChild(restaurantCuisine);
    
        // lägg till alla divar i stora diven.. 
        result.appendChild(div);
   });
};