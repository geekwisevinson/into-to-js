const header = document.createElement(tagName:'div');
const button = document.createElement(tagName:'button');
button.innerText = 'Login';
header.innerText = 'hello world';
const headerText = document.createTextnode(data:'hello world!');
header.appendChild(headerText);
document.body.appendChild(header);
console.log(header);


const headerStyle ={
  fontSize: '24px'

};
header.style.font = headerStyle.fontSize;
header.style.color = headerStyle.color;
console.log(header.style);
