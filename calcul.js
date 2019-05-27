let displayInput =[24,'+',8,'-'];

let screenDisplay ='24 + 8 - 4';

const calcLine = document.querySelector('#firstLine')
calcLine.textContent = screenDisplay;

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
        rslt = multiply(tempArr[i-1],tempArr[i+1]);
        tempArr.splice(i-1,i,rslt);
        return operate(tempArr);
      }
      else if (tempArr[i] ==='/') {
        rslt = divide(tempArr[i-1],tempArr[i+1]);
        tempArr.splice(i-1,i,rslt);
        return operate(tempArr);
      }
    }
  }
  else return compute(tempArr);
};

function agregate (input,arr) {
  let i = arr.length-1;
  if (typeof arr[arr.length-1]!=="number") {
    i++;
    arr.push('');
  };
  arr[i] = Number(arr[i].toString().concat(input));
  return arr;
};
