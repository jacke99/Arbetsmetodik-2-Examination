const mainWrapper = document.querySelector(".main-wrapper");
const searchBar = document.querySelector(".search-bar");

const flag = document.querySelector(".flag");
let english = true;

const filterBtnAll = document.querySelector(".filter-btn-all");
const filterBtnFood = document.querySelector(".filter-btn-food");
const filterBtnDrinks = document.querySelector(".filter-btn-drinks");
const filterBtnDessert = document.querySelector(".filter-btn-dessert");

let addBtns = document.querySelectorAll(".add-btn");

const shoppingCart = [];
const shoppingCartDot = document.querySelector(".shopping-cart-dot");
const cartBtn = document.querySelector(".cart-btn");

const orders = document.querySelector(".orders");
const ordersBalance = document.querySelector(".orders-balance");
const orderContainer = document.querySelector(".orders-container");
const addBalanceInput = document.querySelector(".add-balance");
let balance = 0;
const closeBtn = document.querySelector(".close-order");

let drinksToDisplay = [];
let foodToDisplay = [];

let amountOfDrinks = 20;

let categorys = Object.keys(db); // Hämtar alla olika kategorier

/* Tar bort det som inte är riktiga mat-kategorier */
categorys.splice(categorys.indexOf("best-foods"), 1);
categorys.splice(categorys.indexOf("our-foods"), 1);
categorys.splice(categorys.indexOf("pagination"), 1);

let foodAndDrinks = [];
let allFood = [];
let allDrinks = [];
let allDeserts = [];

// Skapar mat och dryck array
for (let i = 0; i < categorys.length; i++) {
  for (let x = 0; x < 1; x++) {
    foodAndDrinks.push(db[categorys[i]][x]);
  }
}

for (let i = 0; i < amountOfDrinks; i++) {
  foodAndDrinks.push(db["drinks"][i]);
}

// Endast mat array, ta bort det som inte är mat
categorys.splice(categorys.indexOf("chocolates"), 1);
categorys.splice(categorys.indexOf("drinks"), 1);
categorys.splice(categorys.indexOf("ice-cream"), 1);
categorys.splice(categorys.indexOf("desserts"), 1);

for (let i = 0; i < categorys.length; i++) {
  for (let x = 0; x < 1; x++) {
    allFood.push(db[categorys[i]][x]);
  }
}

// Endast dryck array
for (let i = 0; i < amountOfDrinks; i++) {
  allDrinks.push(db["drinks"][i]);
}

// Efterrätt array
allDeserts.push(db["desserts"][0]);
allDeserts.push(db["ice-cream"][0]);
allDeserts.push(db["chocolates"][0]);

// Ta bort alla trasiga bilder

foodAndDrinks.forEach((element) => {
  const img = document.createElement("img");
  img.src = element.img;
  img.onerror = function () {
    console.log("Failed to load " + element.img);
    // console.log("Index of failed: " + foodAndDrinks.indexOf(element));

    if (foodAndDrinks.includes(element)) {
      foodAndDrinks.splice(foodAndDrinks.indexOf(element), 1);
    }

    if (allFood.includes(element)) {
      allFood.splice(allFood.indexOf(element), 1);
    }

    if (allDrinks.includes(element)) {
      allDrinks.splice(allDrinks.indexOf(element), 1);
    }

    if (allDeserts.includes(element)) {
      allDeserts.splice(allDeserts.indexOf(element), 1);
    }

    addAllFoods();
  };
});

/*
function checkIfImgsLoaded(imgURL) {
  let image = document.querySelectorAll(".example-photo");
  const img = document.createElement("img");
  img.onerror = function () {
    image.forEach((element) => {
      if (element.src == imgURL) {
        console.log("Failed to load " + imgURL);
        element.parentNode.remove();
      }
    });
  };
  img.src = imgURL;
}
*/

function removeAllCards() {
  /* Tar bort alla befintliga kort*/
  let allExistingCards = document.querySelectorAll(".card-container");
  allExistingCards.forEach((element) => {
    element.remove();
  });
}

function addAllFoods() {
  removeAllCards();
  /* Skapar upp alla kort */
  foodAndDrinks.forEach((element) => {
    createCard(element.name, element.img, element.price, element.dsc);
  });
  createButtonListeners();
}

function createCard(name, img, price, desc) {
  mainWrapper.innerHTML += `
  <article class="card-container">
  <img
    src="${img}"
    class="example-photo"
    alt="image"/>
  <div class="card-info">
    <header>
      <h4 class="card-item-title">${name}</h4>
      <h4 class="card-item-price">${price}kr</h4>
    </header>
    <p class="card-text">
      ${desc}
    </p>
    <button class="add-btn">${english ? "Add" : "Köp"}</button>
  </div>
    </article>
    `;
  //checkIfImgsLoaded(img);
}

/* lägger till produkter i varukorgen när man trycker på Add knapparna*/

function createButtonListeners() {
  addBtns = document.querySelectorAll(".add-btn");

  addBtns.forEach((element) => {
    element.addEventListener("click", () => {
      let article = element.parentElement;
      let price = article.querySelector(".card-item-price").innerText;
      let title = article.querySelector(".card-item-title").innerText;

      shoppingCart.push(article);
      shoppingCartDot.innerHTML = shoppingCart.length;

      let orderCard = document.createElement("div");
      orderCard.classList.add("order-card");

      orderCard.innerHTML = `
      <p>${title}</p>
      <div>${price}
        <button class="cart-remove-item">X</button>
      </div>`;

      orderContainer.append(orderCard);

      orderCard
        .querySelector(".cart-remove-item")
        .addEventListener("click", () => {
          orderCard.remove();
          shoppingCart.splice(shoppingCart.indexOf(article), 1);
          shoppingCartDot.innerHTML = shoppingCart.length;
        });

      setTimeout(() => {
        orderCard.querySelector(".cart-remove-item").remove();
      }, 120000);
    });
  });
}

/*


FILTRERINGS KNAPPARNA


*/

//Visa allt...
filterBtnAll.addEventListener("click", (e) => {
  addAllFoods();
  searchBar.value = "";
  location.href = "#";
});

//visa BARA mat...
filterBtnFood.addEventListener("click", (e) => {
  removeAllCards();
  allFood.forEach((element) => {
    createCard(element.name, element.img, element.price, element.dsc);
  });
  createButtonListeners();
  searchBar.value = "";
  location.href = "#";
});

// Visa bara dryck
filterBtnDrinks.addEventListener("click", (e) => {
  removeAllCards();

  allDrinks.forEach((element) => {
    createCard(element.name, element.img, element.price, element.dsc);
  });
  createButtonListeners();
  searchBar.value = "";
  location.href = "#";
});

// Visa bara efterrätt
filterBtnDessert.addEventListener("click", (e) => {
  removeAllCards();
  allDeserts.forEach((element) => {
    createCard(element.name, element.img, element.price, element.dsc);
  });
  createButtonListeners();
  searchBar.value = "";
  location.href = "#";
});

/*
visar och döljer kvittocontainern
*/

cartBtn.addEventListener("click", () => {
  cartBtn.style.display = "none";
  orders.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  orders.style.display = "none";
  cartBtn.style.display = "block";
});

addBalanceInput.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    if (balance == 0) {
      balance = parseInt(addBalanceInput.value);
    } else {
      balance += parseInt(addBalanceInput.value);
    }
    ordersBalance.textContent = `Saldo: ${balance}`;
    addBalanceInput.value = "";
  }
});

/*


Sökfunktionen!

*/

searchBar.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    removeAllCards();

    let query = searchBar.value;
    let searchResult = [];

    foodAndDrinks.forEach((element) => {
      if (element.name.toLowerCase().includes(query.toLowerCase())) {
        searchResult.push(element);
      }
    });

    console.log(searchResult);

    searchResult.forEach((element) => {
      createCard(element.name, element.img, element.price, element.dsc);
      createButtonListeners();
    });
  }
});

/*
  
översätt funktionen
 
 */

flag.addEventListener("click", () => {
  if (english == true) {
    // Ändra allt till svenska
    filterBtnAll.innerText = "Allt";

    searchBar.placeholder = "Sök...";

    closeBtn.innerText = "Stäng";

    addBtns = document.querySelectorAll(".add-btn");
    addBtns.forEach((element) => {
      element.innerText = "Köp";
    });

    english = false;
  } else {
    //Ändra allt till engelska
    filterBtnAll.innerText = "All";

    searchBar.placeholder = "Search...";

    closeBtn.innerText = "Close";

    addBtns = document.querySelectorAll(".add-btn");
    addBtns.forEach((element) => {
      element.innerText = "Add";
    });

    english = true;
  }
});
