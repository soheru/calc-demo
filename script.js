const calculatorScreen = document.querySelector('#result');
const keys = document.querySelector('.calculator-keys');

let currentInput = '';
let previousInput = '';
let operator = '';

keys.addEventListener('click', function(event) {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(value);
            break;
        case '=':
            calculate();
            break;
        case 'all-clear':
            clear();
            break;
        case '.':
            inputDecimal();
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputNumber(value);
            }
    }

    updateScreen();
});

function updateScreen() {
    calculatorScreen.value = currentInput;
}

function handleOperator(nextOperator) {
    if (operator && currentInput) {
        calculate();
    }
    previousInput = currentInput;
    operator = nextOperator;
    currentInput = '';
}

function calculate() {
    let result = '';
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result;
    operator = '';
    previousInput = '';
}

function clear() {
    currentInput = '';
    previousInput = '';
    operator = '';
}

function inputNumber(num) {
    if (currentInput === '0') {
        currentInput = num;
    } else {
        currentInput += num;
    }
}

function inputDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}