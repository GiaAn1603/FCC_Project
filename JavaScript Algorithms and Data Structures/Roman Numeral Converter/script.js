const numInput = document.querySelector("#number");
const convertBtn = document.querySelector("#convert-btn");
const result = document.querySelector("#output");

function convertToRoman(num) {
  let romanText = "";

  const romanNumerals = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" },
  ];

  for (let pos = 0; num > 0; pos++) {
    while (num >= romanNumerals[pos].value) {
      romanText += romanNumerals[pos].numeral;
      num -= romanNumerals[pos].value;
    }
  }

  return romanText;
}

convertBtn.addEventListener("click", () => {
  if (numInput.value.trim() === "" || isNaN(numInput.value)) {
    result.textContent = "Please enter a valid number";
  } else if (parseInt(numInput.value) < 0) {
    result.textContent = "Please enter a number greater than or equal to 1";
  } else if (parseInt(numInput.value) >= 4000) {
    result.textContent = "Please enter a number less than or equal to 3999";
  } else {
    result.textContent = convertToRoman(parseInt(numInput.value));
  }
});
