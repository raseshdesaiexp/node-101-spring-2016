var colors = require('colors');

colors.setTheme({
  greaterThanZero: 'green',
  equalToZero: 'yellow',
  lessThanZero: 'red'
});

module.exports = function (equation) {
    var equationParts = equation.split(' ');        
    var result = 0;
    while(equationParts.length >= 3){
        var operandA = equationParts.shift();        
        var operator = equationParts.shift();     
        var operandB = equationParts.shift();           
        result = calculate(operandA, operator, operandB);
        equationParts.unshift(result);             
    }   
    return prettyPrint(result);
}   

function calculate(operandA, operator, operandB) {
    switch(operator){
        case '+': return Number(operandA) + Number(operandB);
        case '-': return Number(operandA) - Number(operandB);
        case 'x': return Number(operandA) * Number(operandB);
        case '/': return Number(operandA) / Number(operandB);
        case '^': return Math.pow(Number(operandA), Number(operandB));
    }
    return 0;
}

function prettyPrint(result){
    if(result < 0){
        return String(result).lessThanZero;
    }
    if(result > 0){
        return String(result).greaterThanZero;
    }
    return String(result).equalToZero;
}