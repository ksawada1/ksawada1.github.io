var input = document.querySelector("input")
//var itemList = document.querySelector(".list_of_items");
var addButton = document.querySelector("#addButton");
var saveButton = document.querySelector("#saveButton");
var loginButton = document.querySelector("#loginButton");
var registerButton = document.querySelector("#registerButton");
var ITEMS=[];
var itemList = document.querySelector("#item_name");
var newName = document.querySelector("#newName");
var newPrice = document.querySelector("#newPrice");
var newKind = document.querySelector("#newKind");
var login = document.querySelector("#login");
var main = document.querySelector("#main");
var body = document.querySelector("body");
var list = document.querySelector("#input_and_cart");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var Fname = document.querySelector("#Fname");
var Lname = document.querySelector("#Lname");
var firstName = document.querySelector(".firstName");
var lastName = document.querySelector(".lastName");
var newQuantity = document.querySelector("#newQuantity");
var vegeList = ["TOMATO", "ONION", "BROCCOLI", "MUSHROOM", "BELL PEPPER", "CUCUMBER", "POTATO", "EGGPLANT", "CARROT"];
var editID


addButton.onclick = function(){
    addButton.style.display = "inline";
    saveButton.style.display = "none";
    registerButton.style.display = "none";    
    loginButton.style.display = "none";
    console.log(newName.value.toUpperCase())

    if (vegeList.includes(newName.value.toUpperCase())) {
        createItemOnServer(newName.value, newPrice.value, newKind.value, newQuantity.value);
        } 
     else {
        console.log("We only have inventory of items in the picture");
        }  
    newName.value = ""
    newPrice.value = ""
    newKind.value = ""
    newQuantity.value = ""  
    };
        
registerButton.onclick = function(){
    addButton.style.display = "none";
    saveButton.style.display = "none";
    registerButton.style.display = "inline"; 
    loginButton.style.display = "inline";
    main.style.display = "none"
    AddUserOnServer(email.value, password.value, Fname.value, Lname.value)
    email.value = ""
    password.value = ""
    Fname.value = ""
    Lname.value = ""
    }; 

loginButton.onclick = function(){
    loginUser(email.value, password.value)
    email.value = ""
    password.value = ""
    }; 

function loginUser(email, password){
    var data = "email=" + encodeURIComponent(email);
    data += "&password=" + encodeURIComponent(password);
    console.log("data = " + data)
    
    fetch("https://quiet-gorge-32104.herokuapp.com/sessions", { 
        method: "POST",     
        body: data,
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response){  
            if (response.status == 401){
                login.style.display = "inline"
                alert("Invalid password.  Try again with correct one")
            }
            else if (response.status == 201) {      //201 created
                addButton.style.display = "inline";
                saveButton.style.display = "none";
                registerButton.style.display = "inline"; 
                loginButton.style.display = "inline";
                main.style.display = "flex"
                loadItemsFromServer()
            }
        });
    }

function AddUserOnServer(email, password, Fname, Lname){
    var data = "email=" + encodeURIComponent(email);
    data += "&password=" + encodeURIComponent(password);
    data += "&Fname=" + encodeURIComponent(Fname);
    data += "&Lname=" + encodeURIComponent(Lname);
    console.log("data = " +data)
    
    fetch("https://quiet-gorge-32104.herokuapp.com/users", { 
        method: "POST",
        body: data,
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response){  
            if (response.status == 422){
                login.style.display = "inline"
                alert("User email is already taken")
            }
            else if (response.status == 201) { 
                login.style.display = "none"
                loadItemsFromServer()
                registerButton.style.display = "none"; 
                loginButton.style.display = "inline";
                main.style.display = "none";
                firstName.style.display = "none";
                lastName.style.display = "none"
            }
        });
    }

function createItemOnServer(item_name, price, kind, quantity){
    var data = "item_name=" + encodeURIComponent(item_name);
    data += "&price=" + encodeURIComponent(price);
    data += "&kind=" + encodeURIComponent(kind);
    data += "&quantity=" + encodeURIComponent(quantity);
    console.log("data = " +data)

    fetch("https://quiet-gorge-32104.herokuapp.com/items", { 
        method: "POST",
        credentials: "include",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
    console.log("we got here")    
        loadItemsFromServer();
    });
}

function deleteItemOnServer(itemID){
    fetch("https://quiet-gorge-32104.herokuapp.com/items/" + itemID, { 
        method: "DELETE",
        credentials: "include"
    }).then(function (response){
        loadItemsFromServer();
    });
}

function editItemOnServer(itemID, item_name, price, kind, quantity){
    var data = "item_name=" + encodeURIComponent(item_name);
    data += "&price=" + encodeURIComponent(price);
    data += "&kind=" + encodeURIComponent(kind);
    data += "&quantity=" + encodeURIComponent(quantity);

    fetch("https://quiet-gorge-32104.herokuapp.com/items/" + itemID, { 
        method: "PUT",
        body: data,
        credentials: "include",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
    }).then(function (response){
        console.log("Updated item")
        loadItemsFromServer();
    });
}

function loadItemsFromServer(){
    fetch("https://quiet-gorge-32104.herokuapp.com/items", {
        credentials: "include"
    }).then(function(response){

        if (response.status == 401){
            main.style.display = "none"
            login.style.display = "inline"
            return;
        } else if (response.status == 200){         //201 created
            body.style.display = "inline"        
            login.style.display = "none"
        }
    response.json().then(function(dataFromServer){
        ITEMS = dataFromServer;   
        itemList.innerHTML = "";

        ITEMS.forEach(function(item){
            var shoppingItems  = document.createElement("li");

            var nameDiv = document.createElement("div");
            nameDiv.innerHTML = item.item_name;     
            nameDiv.classList.add("item-name"); 
            itemList.appendChild(nameDiv);

            var priceDiv = document.createElement("div");
            priceDiv.innerHTML = item.price;
            priceDiv.classList.add("item-price"); 
            itemList.appendChild(priceDiv);

            var kindDiv = document.createElement("div");
            kindDiv.innerHTML = item.kind;
            kindDiv.classList.add("item-kind"); 
            itemList.appendChild(kindDiv);

            var quantityDiv = document.createElement("div");
            quantityDiv.innerHTML = item.quantity;
            quantityDiv.classList.add("item-quantity"); 
            itemList.appendChild(quantityDiv);

            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = "DELETE";
            deleteButton.onclick = function (){
                console.log("please delete this", item.id);  
                if (confirm("Are you sure if you want to deleet this?")){
                    deleteItemOnServer(item.id)
                }
            };
            itemList.appendChild(deleteButton);

            var editButton = document.createElement("button");
            editButton.innerHTML = "EDIT";
            editButton.onclick = function (){
                editID = item.id
                newName.value = item.item_name
                newPrice.value = item.price
                newKind.value = item.kind
                newQuantity.value = item.quantity   

                showSaveButton(editID);

            };
            itemList.appendChild(editButton);
            
            itemList.appendChild(shoppingItems);
        });
    });
});
}

function showSaveButton(editID){
    addButton.style.display = "none"
    saveButton.style.display = "block"

    saveButton.onclick = function(){
        addButton.style.display = "none";
        saveButton.style.display = "inline";
        registerButton.style.display = "none"; 
        loginButton.style.display = "none";
        editItemOnServer(editID, newName.value, newPrice.value, newKind.value, newQuantity.value);
        newName.value = ""
        newPrice.value = ""
        newKind.value = ""
        newQuantity.value = ""   
        };
}
//when the page loads:
loadItemsFromServer();

