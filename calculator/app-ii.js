// Get references to the HTML elements we'll need
const resultElement = document.getElementById('result');
const clearElement = document.getElementById('clear');
const backspaceElement = document.getElementById('backspace');
const equalsElement = document.getElementById('equals');
const decimalElement = document.getElementById('decimal');
const sqrtElement = document.getElementById('sqrt');
const powerElement = document.getElementById('power');
const numberElements = document.querySelectorAll('.number');
const operatorElements = document.querySelectorAll('.operator');

// Keep track of the current value, operator, and previous value
let currentValue = null;
let currentOperator = null;
let previousValue = null;

// Handle number button clicks
for (let i = 0; i < numberElements.length; i++) {
  const numberElement = numberElements[i];
  numberElement.addEventListener('click', function(event) {
    const number = event.target.innerText;
    if (currentValue === null) {
      currentValue = number;
    } else {
      currentValue += number;
    }
    resultElement.innerText = currentValue;
  });
}

// Handle operator button clicks
for (let i = 0; i < operatorElements.length; i++) {
  const operatorElement = operatorElements[i];
  operatorElement.addEventListener('click', function(event) {
    const operator = event.target.innerText;
    if (currentOperator === null) {
      currentOperator = operator;
      previousValue = parseFloat(currentValue);
      currentValue = null;
    } else {
      previousValue = evaluate(previousValue, currentOperator, parseFloat(currentValue));
      currentOperator = operator;
      currentValue = null;
      resultElement.innerText = previousValue;
    }
  });
}

// Handle equals button click
equalsElement.addEventListener('click', function(event) {
  if (currentOperator !== null) {
    previousValue = evaluate(previousValue, currentOperator, parseFloat(currentValue));
    currentOperator = null;
    currentValue = null;
    resultElement.innerText = previousValue;
  }
});

// Handle decimal button click
decimalElement.addEventListener('click', function(event) {
  if (currentValue === null) {
    currentValue = '0.';
  } else if (currentValue.indexOf('.') === -1) {
    currentValue += '.';
  }
  resultElement.innerText = currentValue;
});

// Handle square root button click
sqrtElement.addEventListener('click', function(event) {
  if (currentValue !== null) {
    currentValue = Math.sqrt(parseFloat(currentValue));
    resultElement.innerText = currentValue;
  }
});

// Handle power button click
powerElement.addEventListener('click', function(event) {
  if (currentValue !== null) {
    currentValue = parseFloat(currentValue) ** 2;
    resultElement.innerText = currentValue;
  }
});

// Handle backspace button click
backspaceElement.addEventListener('click', function(event) {
  if (currentValue !== null) {
    currentValue = currentValue.slice(0, -1);
    resultElement.innerText = currentValue;
  }
});

// Handle clear button click
clearElement.addEventListener('click', function(event) {
  currentValue = null;
  currentOperator = null;
  previousValue = null;
  resultElement.innerText = '';
});

// Evaluate the current expression
function evaluate(leftOperand, operator, rightOperand) {
  switch (operator) {
    case '+':
      return leftOperand + rightOperand;
    case '-':
      return leftOperand - rightOperand;
    case '*':
      return leftOperand * rightOperand;
    case '/':
      return leftOperand / rightOperand;
    case '^':
      return leftOperand ** rightOperand;
  }
}
