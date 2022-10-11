

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
const buttonDot = document.querySelector('#buttonDot');

let currentNumber = '';
let isDecimal = false;
let operator = '';
let currentFunction = [0]; //STORES THE NUMBERS INPUTTED
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
    if (input.isOperator) { //DOESNT WORKS
        calcInput.textContent += ` ${input} `;
    } else {
        calcInput.textContent += input;
    }

    if (this.textContent === '.'){
        buttonDot.setAttribute('disabled', '');
    }
}
function saveCurrentNumber(e) { 
    currentNumber += this.textContent; 
    console.log(currentNumber);
    currentFunction[partOfFunction] = currentNumber;
 }

operatorButtons.forEach(button => button.addEventListener('click', displayInput));
operatorButtons.forEach(button => button.addEventListener('click', saveOperator));
function saveOperator(e) {
    if (operatorFunction.length > 0) {
        operateFunction();
    }
    operator = this.textContent;
    //currentFunction[partOfFunction] = currentNumber;
    operatorFunction[partOfFunction] = operator;
    currentNumber = '';
    buttonDot.removeAttribute('disabled');
    ++partOfFunction;
}

const equalsButton = document.querySelector('#buttonEquals');
equalsButton.addEventListener('click', operateFunction);
function operateFunction() {
    if (currentFunction.length === 1 || operatorFunction.length === 0){ //IF ONLY ONE NUMBER INPUTTED
        showResult(currentFunction[partOfFunction]);
        return;
    }
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

const buttonDelete = document.querySelector('#buttonDelete');
buttonDelete.addEventListener('click', delInput);
function delInput() {
    console.log(currentNumber);
    currentNumber = currentNumber.slice(0, -1);
    console.log(currentNumber);
    calcInput.textContent = currentNumber;
}

window.addEventListener('keydown', pressKey);
function pressKey(e) {
    console.log(e.key += 1);
    if (!(e.key ==='1' || e.key ==='2' || e.key ==='3' || e.key ==='4' || e.key ==='5' ||e.key ==='6'||e.key ==='7'||e.key ==='8'||e.key ==='9'||e.key ==='0')) return;
    displayInput();
    saveCurrentNumber();
  }