let display = document.querySelector('.display-el');
let currentInput = '';

function appendValue(value) {
  currentInput += value;
  display.textContent = currentInput;
}

function appendOperator(operator) {
  currentInput += operator;
  display.textContent = currentInput;
}

function calculate() {
  try {
    currentInput = eval(currentInput).toString();
    display.textContent = currentInput;
  } catch (error) {
    display.textContent = 'Error';
  }
}

function clearDisplay() {
  currentInput = '';
  display.textContent = '';
}

function del() {
  if (currentInput.length > 0) { // check if there's any input to delete
    currentInput = currentInput.slice(0, -1); // remove the last character
    display.textContent = currentInput; // update the display
  }
}