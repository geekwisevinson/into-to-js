const header = document.createElement(tagName: 'div');
const button = document.createElement( tagName: 'button');
button.innerText = 'push me';
header.appendChild(button);
const headerText = document.createTextNode( data: 'hello World!');
header.appendChild(headerText);
document.body.appendChild(header);
console.log(header);

const headerStyle = {
  fontSize: '24px',
  color: 'blue',
};

header.style.fontSize = headerStyle.fontSize;
header.style.
