// global variables that serves as calculator memory
let displayInput =[24,'*',4,'*',78]; //Stores the whole operation as an array
let uniqueNumber = 78;// Stores the last number

//setup SELECTOR
// screen
const calcScreen = document.querySelector('.screen');
const calcLine = document.querySelector('#firstLine');
const resultLine = document.querySelector('#secondLine');
// buttons
const clear = document.querySelector('#clear');
const btnDigit = document.querySelectorAll('button.digit');
const btnOperator = document.querySelectorAll('button.operator');
const resultat = document.querySelector('#equal');

calcLine.textContent = displayInput.join(' '); // add default content

//----------------------OPERATIONS-------------------------------------
//BASIC operations
// 1,2,4,124,n = 1+124+n
function add(...numbers) {
  return numbers.reduce((accumulator, currentValue)=>{
    return accumulator + currentValue;
  });
};
// 1,2,4,124,n = 1-124-n
function substract(...numbers) {
  return numbers.reduce((accumulator, currentValue)=>{
    return accumulator - currentValue;
  });
};
function multiply(...numbers) {
  return numbers.reduce((accumulator, currentValue)=>{
    return accumulator * currentValue;
  });
};
function divide(...numbers) {
  return numbers.reduce((accumulator, currentValue)=>{
    return accumulator / currentValue;
  });
};
// COMPLEX operation -> handles series of operation

function compute(arr) // does not check for operation priorities
{
  let tempArr = arr.map(x=>x);
  if (tempArr.length>2 && typeof tempArr[tempArr.length-1]==='number'){
    let rslt = 'argtttt';
    if (tempArr[1]==='+') {
      rslt = add(tempArr[0],tempArr[2]);
    }
    else if (tempArr[1]==='-') {
      rslt = substract(tempArr[0],tempArr[2]);
    }
    else if (tempArr[1]==='*') {
      rslt = multiply(arr[0],tempArr[2]);
    }
    else if (tempArr[1]==='/') {
      rslt = divide(tempArr[0],tempArr[2]);
    }
    tempArr.splice(0,3,rslt);
    return compute(tempArr);
  }
  else return tempArr[0];
};

function operate(arr) //check for operation priorities
{
  let tempArr = arr.map(x=>x);
  if (tempArr.includes('*') || tempArr.includes('/')){
    let rslt = 'argtttt';
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i] ==='*') {
        rslt = multiply(tempArr[i-1],tempArr[i+1]);
        tempArr.splice(i-1,3,rslt);
        return operate(tempArr);
      }
      else if (tempArr[i] ==='/') {
        rslt = divide(tempArr[i-1],tempArr[i+1]);
        tempArr.splice(i-1,3,rslt);
        return operate(tempArr);
      }
    }
  }
  else return compute(tempArr);
};

//useless
function agregate (input,arr) {
  let i = arr.length-1;
  if (typeof arr[arr.length-1]!=="number") {
    i++;
    arr.push('');
  };
  arr[i] = Number(arr[i].toString().concat(input));
  return arr;
};

//-------------------------DISPLAY-----------------------------------
//set what is displayed on CALC LINE (first line)
function setDisplayOne () {
  const roundInput = displayInput.map(num=>round(num,4));
  // const finalInput = displayInput.join(' ');
  calcLine.textContent = roundInput.join(' ');
};
// set what is displayed on the RESULT LINE (second line)
function setDisplayTwo () {
  const resultat = round(operate(displayInput),4);
  resultLine.textContent = resultat
  calcScreen.classList.remove('error');
};

// display the result as the new number
function setDisplayOneEqual (){
  const resultat = operate(displayInput);
  if(resultat===Infinity){
    errorMessage('No dividing by zero!');
    return;
  }
  else if (typeof displayInput[displayInput.length-1]!== 'number'){
    errorMessage('You are missing a number')
    return;
  }
  displayInput = [resultat];
  uniqueNumber=resultat;
  calcLine.textContent = round(resultat,4);
  resultLine.textContent = '';
};

//helps with rounding precision
function round(value, decimals) {
  if (typeof value !== "number") {return value};
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

//----------------------BUTTONS--------------------------------------
// inscribe numbers
function inscribeNumber (input){
  const content = input.dataset.num;
  uniqueNumber = Number(uniqueNumber.toString().concat(content));
  displayInput[displayInput.length-1]=uniqueNumber;
  setDisplayOne();
  if(displayInput.length > 2) {setDisplayTwo()};
};
//inscribe operator
function inscribeOperator (input) {
  const content = input.dataset.num;
  if (typeof displayInput[displayInput.length-1]!== 'number') {
    errorMessage('You cannot put two operator in a row');
    return;
  };
  displayInput.push(content);
  displayInput.push('');
  uniqueNumber = ''; //reset uniqueNumber for next num
  setDisplayOne();
}

// CLEAR displayInput and uniqueNumber to start anew
function reset(){
  displayInput = [''];
  uniqueNumber = '';
  // clean the screen
  calcLine.textContent = '';
  resultLine.textContent = '';
}

// used to handle unauthorized action
function errorMessage (text){
  resultLine.textContent = `Error : ${text}`;
  calcScreen.classList.add('error');
  };
// used in :
// setDisplayOneEqual () 2x
// inscribeOperator (input)


// Buttons onclick events
clear.addEventListener('click',()=>{reset()});

resultat.addEventListener('click',()=>{setDisplayOneEqual()});

btnDigit.forEach((btn)=> {
  btn.addEventListener('click', ()=>{inscribeNumber(btn)});
});

btnOperator.forEach((btn)=> {
  btn.addEventListener('click', ()=>{inscribeOperator(btn)});
});
