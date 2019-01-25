const header = document.createElement(tagName: 'div');
const button = document.createElement(tagName: 'button');
button.innerText = 'Login';
header.appendChild(button);
const headerText = document.createTextNode(data: 'hello world again');
header.appendChild(headerText);
document.body.appendChild(header);
console.log('header', header);

const headerStyle = {
    fontSize: '24px';,
    colol: 'pink',
    display: 'flex';,
    justifyContent: 'space-around';,
};

header.style.fontSize = headerStyle.fontSize;
header.style.color = headerStyle.color;

header.style.display = headerStyle.display;
header.style.justifyContent = headerStyle.justifyContent;
