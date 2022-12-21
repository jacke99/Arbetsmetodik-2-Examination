function getAllAddBtns() {
  const btnContainer = document.createElement("div");
  const article = document.createElement("article");

  for (let i = 0; i < categorys.length; i++) {
    article.innerHTML += `
    <img
      src="img"
      class="example-photo"
      alt="image"/>
    <div class="card-info">
      <header>
        <h4 class="card-item-title">name</h4>
        <h4 class="card-item-price">100kr</h4>
      </header>
      <p class="card-text">
        desc
      </p>
      <button class="add-btn"></button>
    </div>
      `;

    btnContainer.append(article);
  }

  return btnContainer.querySelectorAll(".add-btn");
}

function createCard(name, img, price, desc) {
  let cardContainer = document.createElement("div");
  let card;

  card = `
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
      <button class="add-btn"></button>
    </div>
      </article>
      `;

  cardContainer.innerHTML = card;

  return cardContainer;
}
