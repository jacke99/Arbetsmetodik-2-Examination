const mainWrapper = document.querySelector(".main-wrapper");

const filterBtnAll = document.querySelector(".filter-btn-all");
const filterBtnFood = document.querySelector(".filter-btn-food");
const filterBtnDrinks = document.querySelector(".filter-btn-drinks");

const allFoods = db["our-foods"];
const allDrinks = db.drinks;

const shoppingCart = [];
const shoppingCartDot = document.querySelector(".shopping-cart-dot");

const priceToFilterBy = 99;

/* Loopar igenom all dryck */

allDrinks.forEach((element) => {
  /* används bara för att korta ner listan */

  if (element.price == priceToFilterBy) {
    createCard(element.name, element.img, element.price, element.dsc);
  }
});

/* Loopar igenom alla maträtter */

allFoods.forEach((element) => {
  /* används bara för att korta ner listan */
  if (element.price == priceToFilterBy) {
    createCard(element.name, element.img, element.price, element.dsc);
  }
});

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
      <h4 class="card-item-price">${price}.00$</h4>
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
