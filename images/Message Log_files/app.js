//var travelPlaces = ['Rio', 'Sweden', 'Dominican Republic', 'Aspen','Hawaii','Tokyo'];
//var travelIdea = ['beach', 'mountain','culture-carnival', "exploring a big city", 'skiing']
var addButton = document.querySelector(".input_and_add_button");
addButton.onclick = function (){

}
//lunchPlaces = ITEMS
var ITEMS=[];

var addButton = document.querySelector(".input_and_cart")
addButton.onclick = function(){
    var newItemInput = document.querySelector(".input_and_cart");
    createItemOnServer(newItemInput.value);
};
    //write the contects of the function here.
    //console.log("does this onclieck function work?");
    //var h2Element = document.querySelector("h2");
    //console.log("My H2 element:", h2Element);
    //h2Element.innerHTML = "Changed!";
    //h2Element.style.color = "#FFCC00";
    //h2Element.classList.add("someclass");

    var newItemInput = document.querySelector(".input_and_cart");
    var itemList = document.querySelector('.list_of_items');
    var shoppingItems = document.createElement('li');
    itemList.appendChild(shoppingItems);

    if (newItemInput.value.toLowerCase().includes("TOMATO")) {
        
        shoppingItems.innerHTML = randomPlaces.name;
        itemList.appendChild(shoppingItems);

        var travelImage = document.querySelector(".globalimage");
        travelImage.src = randomPlaces.image;

    } else {
        console.log("We only have inventory of items in the picture");
    }
    // var vegeList = document.querySelector("#destination-list");
    // var vegeItem = document.createElement("li");
    // //vegeItem.innerHTML = newList.value;
    // var r = Math.floor(Math.random() * vege.length);
    // vegeItem.innerHTML = vege[r];

    // vegeList.appendChild(travelPlaceItem);


function createListOnServer(itemPrice){
    var data = "shoppingItems=" + encodeURIComponent(itemPrice);
    //data += "&country=" + encodeURIComponent(placeCountry);

    fetch("http://localhost:8080/items", { 
        //fetch oprtions ho here
        //request options: method, header(s), body
        method: "POST",
        body: data,
        headers: {
            //headers go here
            
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        //response code goes here
        // TODO: refresh the data by calling loadPlacesFromServer()
        loadItemsFromServer();
    });
}
function loadItemsFromServer(){
    fetch("http://localhost:8080/items").then(function(response){
    response.json().then(function(dataFromServer){
        ITEMS = dataFromServer;

        var itemList = document.querySelector(".list_of_items");
        itemList.innerHTML = "";

        //python: for place in lunchPlaces
        //place = item
        //lunchPlaceItem = items
        ITEMS.forEach(function(item){
            //code will excute once per item in the list
            //TODO: insert data into a new DOM element
            //console.log("one time through the loop: ", item);
            var itemList = document.querySelector(".list_of_items");
            var shoppingItems = document.createElement("li");
            shoppingItems.innerHTML = item;
            itemList.appendChild(shoppingItems);
        });
    });
});
}
//when the page loads:
loadItemsFromServer();

