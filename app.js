const mainWrapper = document.querySelector(".main-wrapper");
const searchBar = document.querySelector(".search-bar");

const flag = document.querySelector(".flag");
let english = true;

const filterBtnAll = document.querySelector(".filter-btn-all");
const filterBtnFood = document.querySelector(".filter-btn-food");
const filterBtnDrinks = document.querySelector(".filter-btn-drinks");
const filterBtnDessert = document.querySelector(".filter-btn-dessert");

const allFoods = db["our-foods"];
const allDrinks = db.drinks;

const shoppingCart = [];
const shoppingCartDot = document.querySelector(".shopping-cart-dot");
const cartBtn = document.querySelector(".cart-btn");

const orders = document.querySelector(".orders");
const ordersBalance = document.querySelector(".orders-balance");
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

function removeAllCards() {
  /* Tar bort alla befintliga kort och resetta array*/
  drinksToDisplay = [];
  foodToDisplay = [];
  let allExistingCards = document.querySelectorAll(".card-container");
  allExistingCards.forEach((element) => {
    element.remove();
  });
}

function addAllFoods() {
  removeAllCards();
  /* Loopar igenom kategorierna och tar en från varje in till listan, kan ökas till flera */
  for (let i = 0; i < categorys.length; i++) {
    for (let x = 0; x < 1; x++) {
      foodToDisplay.push(db[categorys[i]][x]);
    }
  }

  // Tar ett antal drycker och stoppar in dom i listan
  for (let i = 0; i < amountOfDrinks; i++) {
    drinksToDisplay.push(db["drinks"][i]);
  }

  foodToDisplay.forEach((element) => {
    createCard(element.name, element.img, element.price, element.dsc);
  });

  drinksToDisplay.forEach((element) => {
    createCard(element.name, element.img, element.price, element.dsc);
  });
}

addAllFoods();

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
    <button class="add-btn">Add</button>
  </div>
    </article>
    `;
  checkIfImgsLoaded(img);
}

/* Måste deklareras efter vi skapat upp korten */
const addBtns = document.querySelectorAll(".add-btn");
const image = document.querySelectorAll(".example-photo");

function checkIfImgsLoaded(imgURL) {
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

/* lägger till produkter i varukorgen när man trycker på Add knapparna*/

addBtns.forEach((element) => {
  element.addEventListener("click", (e) => {
    let article = element.parentElement;
    /*
    let price = article.querySelector(".card-item-price").innerHTML; //Kan användas för att få fram pris och namn
    let name = article.querySelector(".card-item-title").innerHTML;
    */

    shoppingCart.push(article);
    shoppingCartDot.innerHTML = shoppingCart.length;
    console.log(shoppingCart);
  });
});

/*


FILTRERINGS KNAPPARNA


*/

//Visa allt...
filterBtnAll.addEventListener("click", addAllFoods);

//visa bara mat...
filterBtnFood.addEventListener("click", (e) => {
  removeAllCards();
  for (let i = 0; i < categorys.length; i++) {
    for (let x = 0; x < 1; x++) {
      foodToDisplay.push(db[categorys[i]][x]);
    }
  }

  foodToDisplay.forEach((element) => {
    createCard(element.name, element.img, element.price, element.dsc);
  });
});

// Visa bara dryck
filterBtnDrinks.addEventListener("click", (e) => {
  removeAllCards();
  for (let i = 0; i < amountOfDrinks; i++) {
    drinksToDisplay.push(db["drinks"][i]);
  }
  drinksToDisplay.forEach((element) => {
    createCard(element.name, element.img, element.price, element.dsc);
  });
});

// Visa bara efterrätt
filterBtnDessert.addEventListener("click", (e) => {
  removeAllCards();

  foodToDisplay.push(db["desserts"][0]);
  foodToDisplay.push(db["ice-cream"][0]);

  foodToDisplay.forEach((element) => {
    createCard(element.name, element.img, element.price, element.dsc);
  });
});

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
  
  
 
 */

flag.addEventListener("click", () => {
  if (english == true) {
    // Ändra allt till svenska
    filterBtnAll.innerText = "Allt";
    filterBtnFood.innerText = "Mat";
    filterBtnDrinks.innerText = "Dryck";
    filterBtnDessert.innerText = "Efterrätt";

    searchBar.placeholder = "Sök...";

    closeBtn.innerText = "Stäng";
    english = false;
  } else {
    //Ändra allt till engelska
    filterBtnAll.innerText = "All";
    filterBtnFood.innerText = "Food";
    filterBtnDrinks.innerText = "Drinks";
    filterBtnDessert.innerText = "Dessert";

    searchBar.placeholder = "Search...";

    closeBtn.innerText = "Close";
    english = true;
  }
});
