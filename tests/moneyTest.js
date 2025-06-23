import formatCurreny from "../scripts/utils/money.js";

console.log('Test suite: format currency');



console.log('Convert the product Price From cents to dollars');

if(formatCurreny(2095) === '20.95') {
    console.log('Pass');
} else {
    console.log('Fail');
}

console.log('Works with 0');

if(formatCurreny(0) === '0.00') {
    console.log('Pass');
} else {
    console.log('Fail');
}

console.log('Rounds up to nearest cent');

if(formatCurreny(2000.5) === '20.01') {
    console.log('Pass');
} else {
    console.log('Fail');
}