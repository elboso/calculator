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

function operate(num1,num2)
