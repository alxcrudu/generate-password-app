const passwordText = document.getElementById("passwordText");

const lengthSelectorRange = document.getElementById("lengthSelectorRange");
const lengthSelectorNumber = document.getElementById("lengthSelectorNumber");

const includeUppercaseElement = document.getElementById("includeUppercase");
const includeNumbersElement = document.getElementById("includeNumbers");
const includeSymbolsElement = document.getElementById("includeSymbols");

const form = document.getElementById("form");
const btn = document.getElementById("btn");
const copyToClipboardElement = document.getElementById("copyToClipboard")

// creating arrays using the createArr() function from Charcodes

const uppercaseArr = createArr(65, 90);
const lowercaseArr = createArr(97, 122);
const numbersArr = createArr(48, 57);
const symbolArr = createArr(33, 47)
  .concat(createArr(58, 64))
  .concat(createArr(91, 96))
  .concat(createArr(123, 126));

// sync slider and number inputs

lengthSelectorRange.addEventListener("input", syncCharacterAmount);
lengthSelectorNumber.addEventListener("input", syncCharacterAmount);

function syncCharacterAmount(e) {
  const value = e.target.value;
  lengthSelectorRange.value = value;
  lengthSelectorNumber.value = value;
}

// form listener & container function

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterAmount = lengthSelectorNumber.value;
  const includeUppercase = includeUppercaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymbols = includeSymbolsElement.checked;
  if (characterAmount < 10) {
    alert(
      "A strong password must be at least 10 characters long, and with all the options checked"
    );
    passwordText.innerText = "password";
  } else if (
    includeUppercase == false &&
    includeNumbers == false &&
    includeSymbols == false
  ) {
    alert("At least on option of characters to include must be checked");
    passwordText.innerText = "password";
  } else {
    const password = generatePassword(
      characterAmount,
      includeUppercase,
      includeNumbers,
      includeSymbols
    );
    passwordText.innerText = password;
  }
  // console.log(password)
});

// main functions

function generatePassword(
  characterAmount,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  // console.log(symbolArr)
  let charCodes = lowercaseArr;
  if (includeUppercase) charCodes = charCodes.concat(uppercaseArr);
  if (includeNumbers) charCodes = charCodes.concat(numbersArr);
  if (includeSymbols) charCodes = charCodes.concat(symbolArr);

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}

function createArr(from, to) {
  let array = [];
  for (let i = from; i <= to; i++) {
    array.push(i);
  }
  return array;
}

// copy to clipboard

copyToClipboardElement.addEventListener("click", copyToClipboard);

function copyToClipboard() {
    if (passwordText.innerText !== "password") {
        navigator.clipboard.writeText(passwordText.innerText);
        copyToClipboardElement.innerText = "Copied!"
        setTimeout(() => {
            copyToClipboardElement.innerText = "Copy to clipboard"
        }, 3000)
    } return;
};

// test