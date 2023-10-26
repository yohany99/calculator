const screen = document.querySelector('.screen');

const numbersAndOperators = document.querySelector('.numbers-and-operators');
const numsAndOpsBtn = numbersAndOperators.querySelectorAll('.btn');
numsAndOpsBtn.forEach((btn) => btn.addEventListener('click', selectButton));

const resultScreen = document.querySelector('.result');
const historyScreen = document.querySelector('.history');

const equalsButton = document.querySelector('.equals');

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', resetCalculator);

const decimalButton = document.querySelector('.decimal');

let x;
let operator;
let y;
let current;

function selectButton(event) {
    let value = event.target.textContent;
    if (typeof x === 'undefined' && typeof operator === 'undefined' && typeof y === 'undefined') {
        clearHistoryScreen();
        clearResultScreen();
        equalsButton.disabled = false;
    }
    if (!isNaN(value)) {
        if (typeof operator === 'undefined') {
            if (typeof x === 'undefined') {
                x = value;
            } else {
                x += value;
            }
            equalsButton.disabled = true;
            populateResultScreen(value);
            current = 'x';
        } else {
            if (typeof y === 'undefined') {
                y = value;
            } else {
                y += value;
            }
            current = 'y';
            equalsButton.disabled = false;
            populateResultScreen(value);
        }
    } else {
        if (value === "=") {
            if (typeof x === 'undefined' || typeof y === 'undefined') {
                return;
            } else {
                let result = operate(x, operator, y);
                populateHistoryScreen(value);
                populateResultScreen(result);
                equalsButton.disabled = true;
                x = result;
                current = 'x'
                y = undefined;
                operator = undefined;
            }
        } else {
            if (typeof x === 'undefined' || (typeof y === 'undefined' && typeof operator !== 'undefined')) {
                return;
            }
            else if (typeof y !== 'undefined') {
                x = operate(x, operator, y);
                current = 'x';
                y = undefined;
            }
            populateHistoryScreen(value);
            operator = value;
        }
    }
}

function populateResultScreen(value) {
    resultScreen.innerHTML += value;
}

function populateHistoryScreen(value) {
    historyScreen.innerHTML += resultScreen.textContent + " " + value + " ";
    clearResultScreen();
}

function clearResultScreen() {
    resultScreen.textContent = "";
}

function clearHistoryScreen() {
    historyScreen.textContent = "";
}

function disableButton(button) {
    button.disabled = true;
}

function resetCalculator() {
    x = undefined;
    y = undefined;
    operator = undefined;
    clearResultScreen();
    clearHistoryScreen();
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(x, operator, y) {
    x = Number(x);
    y = Number(y);
    switch (operator) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        case "/":
            return divide(x, y);
    }
}