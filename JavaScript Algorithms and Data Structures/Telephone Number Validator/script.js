const userInput = document.querySelector("#user-input");
const checkBtn = document.querySelector("#check-btn");
const clearBtn = document.querySelector("#clear-btn");
const results = document.querySelector("#results-div");

function isValidUSPhoneNumber(number) {
  const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;

  return phoneRegex.test(number);
}

checkBtn.addEventListener("click", () => {
  if (userInput.value.trim() === "") {
    alert("Please provide a phone number");
    return;
  }

  const resultText = isValidUSPhoneNumber(userInput.value.trim()) 
  ? `Valid US number: ${userInput.value.trim()}` 
  : `Invalid US number: ${userInput.value.trim()}`;

  results.innerHTML += `<div>${resultText}<div>`;
});

clearBtn.addEventListener("click", () => {
  results.innerHTML = "";
});
