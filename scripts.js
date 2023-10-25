const screen = document.querySelector('.screen');
const numbersAndOperators = document.querySelector('.numbers-and-operators');
const numsAndOpsBtn = numbersAndOperators.querySelectorAll('.btn');
numsAndOpsBtn.forEach((btn) => btn.addEventListener('click', selectButton));

let x;
let operator;
let y;

function selectButton(event) {
    let value = event.target.textContent;
    if (!isNaN(value)) {
        if (typeof operator === 'undefined') {
            if (typeof x === 'undefined') {
                x = value;
            } else {
                x += value;
            }
            console.log(x);
        } else {
            if (typeof y === 'undefined') {
                y = value;
            } else {
                y += value;
            }
            console.log(y);
        }
    } else {
        if (value === "=") {
            console.log(operate(x, operator, y));
            x = undefined;
            y = undefined;
            operator = undefined;
        } else {
            operator = value;
        }
    }
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