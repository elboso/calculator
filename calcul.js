let displayInput =[24,'*',4,'*',78];
let uniqueNumber = '';

const calcScreen = document.querySelector('.screen');
const calcLine = document.querySelector('#firstLine');
const resultLine = document.querySelector('#secondLine');
calcLine.textContent = displayInput.join(' ');

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

// does not check for operation priorities
function compute(arr){
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

//check for operation priorities
function operate(arr){
  let tempArr = arr.map(x=>x);
  if (tempArr.includes('*') || tempArr.includes('/')){
    let rslt = 'argtttt';
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i] ==='*') {
        console.log(`${tempArr[i-1]}, ${tempArr[i]}, ${tempArr[i+1]}`);
        console.log(tempArr);
        rslt = multiply(tempArr[i-1],tempArr[i+1]);
        tempArr.splice(i-1,3,rslt);
        console.log(tempArr);
        return operate(tempArr);
      }
      else if (tempArr[i] ==='/') {
        console.log(`DIV ${tempArr[i-1]}, ${tempArr[i]}, ${tempArr[i+1]}`);
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

//set what is displayed on line one
function setDisplayOne () {
  const finalInput = displayInput.join(' ');
  calcLine.textContent = finalInput;
};
// set what is displayed on the result line
function setDisplayTwo () {
  const resultat = operate(displayInput);
  resultLine.textContent = resultat;
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
  calcLine.textContent = displayInput;
  resultLine.textContent = '';
};


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

// clear displayInput and uniqueNumber to start anew
function reset(){
  displayInput = [''];
  uniqueNumber = '';
  // clean the screen
  calcLine.textContent = '';
  resultLine.textContent = '';
}

function errorMessage (text){
  resultLine.textContent = `Error : ${text}`;
  calcScreen.classList.add('error');
  };

const clear = document.querySelector('#clear');

const btnDigit = document.querySelectorAll('button.digit');

const btnOperator = document.querySelectorAll('button.operator');

const resultat = document.querySelector('#equal');

clear.addEventListener('click',()=>{reset()});

resultat.addEventListener('click',()=>{setDisplayOneEqual()});

btnDigit.forEach((btn)=> {
  btn.addEventListener('click', ()=>{inscribeNumber(btn)});
});

btnOperator.forEach((btn)=> {
  btn.addEventListener('click', ()=>{inscribeOperator(btn)});
});
