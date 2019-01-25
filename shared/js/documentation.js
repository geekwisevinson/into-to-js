const style = document.createElement('style');
style.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(style);

const styleObj = { color: 'red'};
styleText = document.createTextNode(createClass('head-class', styleObj));
style.appendChild(styleText);
const styleObj2 = { 'background-color': 'blue'};
styleText2 = document.createTextNode(createClass('test-class', styleObj2));
style.appendChild(styleText2);

const header = document.createElement('div');
header.setAttribute('id', 'test');
document.body.appendChild(header);
const headerText = document.createTextNode('header');
header.appendChild(headerText);
document.getElementById('test').classList.add('head-class');
document.getElementById('test').classList.add('test-class');

document.getElementById('test').style = {...document.getElementById('test').style, ...{ padding: '40px' }};

console.log(document.getElementById('test').style );


console.log( css(document.getElementById('test')) );
function createClass( name , listObj ) {
    const keys = Object.keys(listObj);
    let answer = `.${name}`;
    answer += '{ ';
    keys.forEach( key => {
        answer += key + ' : ';
        answer += listObj[key] + ';';
    });
    answer += ' }';
    return answer;
}

function css(el) {
    var sheets = document.styleSheets, ret = [];
    el.matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector
        || el.msMatchesSelector || el.oMatchesSelector;
    for (var i in sheets) {
        var rules = sheets[i].rules || sheets[i].cssRules;
        for (var r in rules) {
            if (el.matches(rules[r].selectorText)) {
                ret.push(rules[r].cssText);
            }
        }
    }
    return ret;
}

function thisTest ()  {
    const name = 'this test';
    console.log(this);
}

thisTest();