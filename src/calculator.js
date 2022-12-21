function createArray() {
  let categorys = Object.keys(db); // Hämtar alla olika kategorier

  /* Tar bort det som inte är riktiga mat-kategorier */
  categorys.splice(categorys.indexOf("best-foods"), 1);
  categorys.splice(categorys.indexOf("our-foods"), 1);
  categorys.splice(categorys.indexOf("pagination"), 1);

  array = [];
  for (let i = 0; i < categorys.length; i++) {
    for (let x = 0; x < 1; x++) {
      array.push(db[categorys[i]][x]);
    }
  }
  return array;
}

function calculateTotalPrice(price, number) {
  return price * number;
}

function calculateBalance(price, number, balance) {
  return balance - price * number;
}
