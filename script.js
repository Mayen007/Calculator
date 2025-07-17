const display = document.querySelector('.display-el');
let currentInput = '';

function updateDisplay(value) {
  display.textContent = value || '0';
}

function appendValue(value) {
  if (value === '.') {
    const parts = currentInput.split(/[+\-*/]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes('.')) return;
  }
  currentInput += value;
  updateDisplay(currentInput);
}

function appendOperator(operator) {
  if (currentInput === '') return;
  const lastChar = currentInput.slice(-1);
  if ('+-*/'.includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + operator;
  } else {
    currentInput += operator;
  }
  updateDisplay(currentInput);
}

function calculate() {
  try {
    if (currentInput.includes('/0')) {
      updateDisplay('Cannot divide by zero');
      currentInput = '';
      return;
    }
    const result = Function(`"use strict"; return (${currentInput})`)();
    currentInput = result !== undefined ? result.toString() : '';
    updateDisplay(currentInput);
  } catch {
    updateDisplay('Error');
    currentInput = '';
  }
}

function clearDisplay() {
  currentInput = '';
  updateDisplay('0');
}

function del() {
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
  }
}

document.querySelectorAll('[data-value]').forEach(btn => {
  btn.addEventListener('click', () => appendValue(btn.getAttribute('data-value')));
});
document.querySelectorAll('[data-operator]').forEach(btn => {
  btn.addEventListener('click', () => appendOperator(btn.getAttribute('data-operator')));
});
document.getElementById('equals').addEventListener('click', calculate);
document.getElementById('del').addEventListener('click', del);
document.getElementById('clear').addEventListener('click', clearDisplay);

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    appendValue(e.key);
  } else if ('+-*/'.includes(e.key)) {
    appendOperator(e.key);
  } else if (e.key === 'Enter' || e.key === '=') {
    calculate();
  } else if (e.key === 'Backspace') {
    del();
  } else if (e.key === 'Escape') {
    clearDisplay();
  } else if (e.key === '.') {
    appendValue('.');
  }
});