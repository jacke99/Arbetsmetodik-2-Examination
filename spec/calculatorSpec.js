let categorys = Object.keys(db); // Hämtar alla olika kategorier

/* Tar bort det som inte är riktiga mat-kategorier */
categorys.splice(categorys.indexOf("best-foods"), 1);
categorys.splice(categorys.indexOf("our-foods"), 1);
categorys.splice(categorys.indexOf("pagination"), 1);

describe("Test if food array is being made", function () {
  it("Test if food array is being made", function () {
    array = createArray();
    // Kolla om arrayen med mat är lika lång som kategori arrayen
    expect(array.length).toEqual(categorys.length);
  });
});

describe("Testing calculator functions", function () {
  let x = 2;
  let item = 100;
  let balance = 500;
  let totalPrice = item * x;
  let totalBalance = balance - item * x;

  it("Testing if item is added to total price", function () {
    expect(calculateTotalPrice(item, x)).toEqual(totalPrice);
  });
  it("Testing if balance is updating properly", function () {
    expect(calculateBalance(item, x, balance)).toEqual(totalBalance);
  });
});
