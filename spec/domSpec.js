describe("Testing DOM-features", function () {
  it("Testing get add btns", function () {
    let allBtns = getAllAddBtns();
    expect(allBtns.length).toEqual(categorys.length);
  });

  it("Testing creating a card", function () {
    let name = "Joes";
    let img = "Link";
    let price = "100kr";
    let desc = "Description";

    let cardContainer = document.createElement("div");
    let result = `
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

    cardContainer.innerHTML = result;

    //console.log(createCard(name, img, price, desc));
    console.log(createCard(name, img, price, desc));
    expect(createCard(name, img, price, desc)).toEqual(cardContainer);
  });
});
