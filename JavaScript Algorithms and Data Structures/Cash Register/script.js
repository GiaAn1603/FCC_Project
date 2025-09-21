let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];
const numberInput = document.querySelector("#cash");
const purchaseBtn = document.querySelector("#purchase-btn");
const output = document.querySelector("#change-due");
const currencyUnits = {
  PENNY: 1,
  NICKEL: 5,
  DIME: 10,
  QUARTER: 25,
  ONE: 100,
  FIVE: 500,
  TEN: 1000,
  TWENTY: 2000,
  ONE_HUNDRED: 10000,
};

function checkCashRegister() {
  const priceInCents = Math.round(price * 100);
  const cashInCents = Math.round(parseFloat(numberInput.value) * 100);
  const changeDue = cashInCents - priceInCents;

  if (changeDue < 0) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (changeDue === 0) {
    output.textContent = "No change due - customer paid with exact cash";
    return;
  }

  let totalCid = 0;

  for (let i = 0; i < cid.length; i++) {
    totalCid += Math.round(cid[i][1] * 100);
  }

  if (totalCid < changeDue) {
    output.textContent = "Status: INSUFFICIENT_FUNDS";
  } else if (totalCid === changeDue) {
    let resultStr = "Status: CLOSED";

    for (let i = cid.length - 1; i >= 0; i--) {
      let unit = cid[i][0];
      let amount = cid[i][1];

      if (amount > 0) {
        resultStr += ` ${unit}: $${amount.toFixed(2)}`;
      }
    }

    output.textContent = resultStr;
  } else {
    let changeArr = [];
    let changeLeft = changeDue;

    for (let i = cid.length - 1; i >= 0; i--) {
      let unitName = cid[i][0];
      let unitTotal = Math.round(cid[i][1] * 100);
      let unitValue = currencyUnits[unitName];
      let amountToReturn = 0;

      while (changeLeft >= unitValue && unitTotal > 0) {
        changeLeft -= unitValue;
        unitTotal -= unitValue;
        amountToReturn += unitValue;
      }

      if (amountToReturn > 0) {
        changeArr.push([unitName, amountToReturn / 100]);
      }
    }

    if (changeLeft > 0) {
      output.textContent = "Status: INSUFFICIENT_FUNDS";
      return;
    }

    let resultStr = "Status: OPEN";

    for (let i = 0; i < changeArr.length; i++) {
      resultStr += ` ${changeArr[i][0]}: $${changeArr[i][1].toFixed(2)}`;
    }

    output.textContent = resultStr;
  }
}

purchaseBtn.addEventListener("click", checkCashRegister);
