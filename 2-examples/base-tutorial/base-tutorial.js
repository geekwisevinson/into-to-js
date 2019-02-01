// comment line

/*
comment
lines


//SECTION Javascript var declarations
var varString = 'my string variable';
var varNumber = 1;
var varBoolean = true;
var varObj = {
    test: 1,
};
var varFunction = function () {
    console.log('im a function');
};
var varArray = ['test'];

//SECTION Javascript typeof Operators
console.log(typeof varString);
console.log(typeof varNumber);
console.log(typeof varBoolean);
console.log(typeof varObj);
console.log(typeof varFunction);
console.log(typeof varArray);

//SECTION Javascript instanceof Operators
console.log('instanceof');
console.log(varString instanceof String);
console.log(varNumber instanceof Number);
var varStringNew = new String('varString');
var varNumberNew = new Number(8);
console.log(varStringNew instanceof String);
console.log(varNumberNew instanceof Number);
console.log(varObj instanceof Object);
console.log(varArray instanceof Array);


const constString = 'my string const';
const constNumber = 1;
const constBoolean = true;
const constObj = {
    test: 2,
};


let letString = 'my string let';
let letNumber = 1;
let letBoolean = true;
let letObj = {
    test: 3,
};

//SECTION Javascript Scope
console.log('this', this);
var varScope = 1;
const constScope = 2;
let letScope = 3;
function scope() {
    var varScope = 4;
    // const constScope = 5;
    let letScope = 6;

    varScope = 4;
    // constScope = 5;
    letScope = 6;
    console.log('this', this);
}

scope();

console.log('scope', varScope, constScope, letScope);


//SECTION Javascript Operators

// addition
console.log( 1 + 1);

// subtraction
console.log( 1 - 1);

// multiplication
console.log( 2 * 4);

// division
console.log( 6 / 2);

// modulus (division remainder)
console.log( 7 % 5);

// increment
var testNumberA = 0;
console.log( testNumberA++);
console.log( testNumberA);
// decrement
console.log( testNumberA--);
console.log( testNumberA);

// left-hand increment;
console.log( ++testNumberA);
console.log( --testNumberA);

//SECTION Javascript Assignment Operators
testNumberA = 1;
var testNumberB = 10;
console.log( testNumberA = testNumberB);
console.log( testNumberA += testNumberB);
console.log( testNumberA -= testNumberB);
console.log( testNumberA *= testNumberB);
console.log( testNumberA /= testNumberB);
console.log( testNumberA %= testNumberB);

//SECTION Javascript string Operators
var testString1 = 'Geekwise';
var testString2 = 'Academy';
var testString3 = '';

testString3 = testString1 + testString2;
console.log(testString3);
testString3 += '!';
console.log(testString3);

//SECTION Javascript Comparison Operators
// equal to
console.log( 1 == '1');
console.log( 1 === '1');
// not equal
console.log( 1 != '1');
console.log( 1 !== '1');
// greater than
console.log( 1 < 1);
console.log( 1 <= 1);
// less than
console.log( 1 < 1);
console.log( 1 <= 1);

//SECTION Javascript Conditional Operators
var age = 16;
var ageTitle = age > 18 ? 'adult' : 'child';
console.log(ageTitle);
var testAge = age > 18 ? canBuy() : void(cantBuy());
function canBuy() {
    console.log('canBuy!');
    return 'canBuy';
}
function cantBuy() {
    console.log('cant buy');
    return 'cantBuy';
}
console.log(testAge);

var varAnd = (1 + 1 === 2)  && (1 + 3 === 4);
var varOr = (1 + 1 === 2)  || (1 + 3 === 4);

//SECTION Javascript delete Operator
var temp = {
    name: 'tempName',
    age: 1,
};
console.log(temp);
delete temp.name;
console.log(temp);

//SECTION Javascript in Operator
var inArray = [0, 1, 2];
var inObject = {
    test: 'test',
};
console.log(1 in inArray);
console.log(4 in inArray);
console.log( 'test' in inObject);
console.log( 'otherValue' in inObject);
