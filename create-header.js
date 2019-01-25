const header = document.createElement(tagName: 'div');
const button = document.createElement(tagName: 'button');
button.innerText = 'Login';
header.innerText = 'Hello World!';
const headerText = document.createTextNode(data: 'Hello World!');
header.appendChild(headerText);
document.body.appendChild(header);
console.log(header);
