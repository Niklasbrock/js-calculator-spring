//Script delvist inspireret af WebDevSimplified https://www.youtube.com/watch?v=j59qQ7YWLxw


//Setting constants equal to HTML selector, enabling me to work with the buttons as constants in Javascript.
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

let currentOperand = 0;
let previousOperand = 0;
let currentOperator;

//To display the 0's when the calculator is first loaded
displayOperandText();

//To update the two displayed numbers (and operator if pressed). Is called after every button press.
function displayOperandText() {
    //To display 0 instead of nothing, when everything is deleted.
    if (currentOperand.toString().length === 0){
        currentOperand = 0;
    }
    currentOperandTextElement.innerHTML = currentOperand;
    previousOperandTextElement.innerHTML = previousOperand.toString();
}

function numberButtonPress(number) {
    //If the current number is 0, it is replaced with new number. Otherwise it wouldn't remove the 0, which works as
    //a placeholder.
    if (currentOperand === 0){
        currentOperand = number.toString()
    } else{
        currentOperand = currentOperand.toString() + number.toString();
    }
}

//When an operation button is pressed the current number is moved to previous and new current set to 0
function operationButtonPressed(operation) {
    //If an operation has already been selected, it calculates first.
    if (currentOperator !== undefined){
        calc();
    }
    previousOperand = currentOperand.toString() + operation.toString();
    currentOperator = operation.toString();
    currentOperand = 0;

}

function calc() {
    let calculation;
    const firstNumber = parseFloat(previousOperand);
    const secondNumber = parseFloat(currentOperand);
    //if either number is 0, the calculation is stopped
    if (firstNumber === 0 || secondNumber === 0){
        return;
    }
    //Check which operator is in use, to do correct calculation
    switch (currentOperator) {
        case("+"):
            calculation = firstNumber + secondNumber;
            break;
        case("-"):
            calculation = firstNumber - secondNumber;
            break;
        case("x"):
            calculation = firstNumber * secondNumber;
            break;
        case("÷"):
            calculation = firstNumber / secondNumber;
            break;
        case("%"):
            calculation = firstNumber % secondNumber;
            break;
    }
    currentOperand = calculation;
    //reset previous and the operator for next input
    previousOperand = 0;
    currentOperator = undefined;
}

function del(){
    currentOperand = currentOperand.toString().slice(0, -1);
}

function clear(){
    currentOperand = 0;
    previousOperand = 0;
}

//Setting action listeners for all types of buttons and make them run matching functions
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        numberButtonPress(button.innerText);
        displayOperandText();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        operationButtonPressed(button.innerText);
        displayOperandText();
    })
});

equalsButton.addEventListener('click', button => {
    calc();
    displayOperandText();
});

allClearButton.addEventListener('click', button => {
    clear();
    displayOperandText();
});

deleteButton.addEventListener('click', button => {
    del();
    displayOperandText();
});

