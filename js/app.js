

function add(a, b) {
    return a + b;
}

function subtract(a , b) {
    return a - b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}

function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

const calcInput = document.querySelector('#calcInput');
const calcResult = document.querySelector('#calcResult');
const numberButtons = document.querySelectorAll('.button-grid .btn');
const operatorButtons = document.querySelectorAll('.btnOperator');

let currentNumber = '';
let operator = '';
let currentFunction = []; //STORES THE NUMBERS INPUTTED
let operatorFunction = []; // STORES THE OPERATORS INPUTTED
let partOfFunction = 0;  // INDICATES WHICH PART OF THE FUNCTION IS CURRENTLY BEING INPUTTED
let partResolved = 0;

let restartDisplayBool = false; //IF TRUE, RESTARTS DISPLAY WHEN CLICKING A BUTTON

function isOperator(a) {
    return (a === '+' || a === '-' || a ==='*' || a ==='/');
}

numberButtons.forEach(button => button.addEventListener('click', displayInput)); //DISPLAYS INPUT IN CALC
numberButtons.forEach(button => button.addEventListener('click', saveCurrentNumber)); //SAVES NUMBER IN CURRENTFUNCTION
function displayInput(e) { 
    if (restartDisplayBool) { // RESTARTS DISPLAY INPUT IF BOOL IS TRUE
        calcInput.textContent = ``;
        restartDisplayBool = false;
    }
    let input = this.textContent;
    if (input.isOperator) {
        calcInput.textContent += ` ${input} `;
    } else {
        calcInput.textContent += input;
    }
}
function saveCurrentNumber(e) { 
    currentNumber += this.textContent; 
 }

operatorButtons.forEach(button => button.addEventListener('click', displayInput));
operatorButtons.forEach(button => button.addEventListener('click', saveOperator));
function saveOperator(e) {
    if (operatorFunction.length > 0) {
        operateFunction();
    }
    operator = this.textContent;
    currentFunction[partOfFunction] = currentNumber;
    operatorFunction[partOfFunction] = operator;
    currentNumber = '';
    ++partOfFunction;
}

const equalsButton = document.querySelector('#buttonEquals');
equalsButton.addEventListener('click', operateFunction);
function operateFunction() {
    currentFunction[partOfFunction] = currentNumber;
    let result = currentFunction[0]; //STORES THE RESULT AS THE FIRST NUMBER OF FUNCTION
    for (let i = 0; i < currentFunction.length-1; i++) {  //MAIN CALCULATION
        ++partResolved;
        console.log(`${result} ${operatorFunction[i]} ${currentFunction[i+1]}`)
        result = operate(+result, +currentFunction[i+1], operatorFunction[i]); //CONTINUES OPERATION THE RESULT WITH NEXT NUMBER OF FUNCTION AND
    }                                                                          //OPERATOR
    result = Math.round((result + Number.EPSILON) * 100) / 100
    showResult(result);
}

function showResult(result) { 
    calcResult.textContent = result;
}

function resetInputs() {
    currentNumber = '';
    operator = '';
    currentFunction = [];
    operatorFunction = [];
    partOfFunction = 0;
    partResolved = 0;
    restartDisplayBool = true;
}

function clearCalc(){
    resetInputs();
    calcInput.textContent = ``;
}