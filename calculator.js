const calculator = document.querySelector('.calculator');
const calculatorScreen = document.querySelector('.calculator-screen');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let calculationCompleted = false; // NEW STATE VARIABLE: true when a result is currently displayed

function updateDisplay() {
    calculatorScreen.value = displayValue;
}

function inputDigit(digit) {
    // If a calculation was just completed, clear the display and start a new number
    if (calculationCompleted === true) {
        displayValue = '0'; // Reset display to '0' before typing the new digit
        firstOperand = null; // Clear previous operand
        operator = null; // Clear previous operator
        waitingForSecondOperand = false; // Reset state
        calculationCompleted = false; // Reset flag
    }

    if (waitingForSecondOperand === true) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    // If a calculation was just completed, clear the display and start a new number
    if (calculationCompleted === true) {
        displayValue = '0';
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        calculationCompleted = false;
    }

    if (waitingForSecondOperand === true) {
        displayValue = '0.';
        waitingForSecondOperand = false;
        return;
    }
    if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    // If an operator is pressed after a calculation is completed,
    // the result becomes the firstOperand for the next operation.
    if (calculationCompleted === true) {
        firstOperand = inputValue;
        operator = nextOperator;
        waitingForSecondOperand = true;
        calculationCompleted = false; // The result is now being used for a new operation
        return;
    }

    if (operator && waitingForSecondOperand) {
        // This handles cases like 5 + * (changes operator from + to *)
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = operate(operator, firstOperand, inputValue);
        displayValue = String(result);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;

    // If the '=' operator was pressed, a calculation is now complete.
    if (nextOperator === '=') {
        calculationCompleted = true;
    }
}

function clearCalculator() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    calculationCompleted = false; // Ensure this is also reset
}

// Function to erase the last digit (MODIFIED)
function eraseLastDigit() {
    // If a calculation was just completed, pressing DEL should clear the whole display.
    if (calculationCompleted === true) {
        clearCalculator(); // Reset everything
        return;
    }

    // Standard single-digit deletion
    if (displayValue === '0' || displayValue.length === 0) {
        return;
    }
    displayValue = displayValue.slice(0, -1);
    if (displayValue.length === 0) {
        displayValue = '0';
    }
}


function operate(operator, num1, num2) {
    if (operator === '+') {
        return num1 + num2;
    } else if (operator === '-') {
        return num1 - num2;
    } else if (operator === '*') {
        return num1 * num2;
    } else if (operator === '/') {
        if (num2 === 0) {
            return "Error"; // Handle division by zero
        }
        return num1 / num2;
    }
    return num2;
}

keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('clear')) {
        clearCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('erase')) {
        eraseLastDigit();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});

// Initial display update
updateDisplay();