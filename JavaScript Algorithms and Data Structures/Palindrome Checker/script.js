const textInput = document.querySelector("#text-input");
const checkBtn = document.querySelector("#check-btn");

function palindromeCheck() {
  if (textInput.value.trim() === "") {
    alert("Please input a value.");
    return;
  }

  const cleanedInput = textInput.value.replace(/[^a-z0-9]/gi, "").toLowerCase();
  const reversedInput = cleanedInput.split("").reverse().join("");
  const result = document.querySelector("#result");

  if (cleanedInput === reversedInput) {
    result.textContent = `${textInput.value} is a palindrome.`;
  } else {
    result.textContent = `${textInput.value} is not a palindrome.`;
  }
}

checkBtn.addEventListener("click", palindromeCheck);
