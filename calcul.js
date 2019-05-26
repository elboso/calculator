let displayInput =[24,'+',8,'-',4];

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
const operators = [plus,minus,multy,div];

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
}
