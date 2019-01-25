const header = document.createElement( tagname: 'div');
const button = document.createElement( tagname: 'button');
button.innertext = 'login';
header.appendChild(button);
const headerText = document.createtextNode( data:'hello world');
header.appendChild(headerText);
document.body.appendChild(header);
console.log(header);

const headerstyle = {
    fontSize: '24px',
    color: 'blue',
}
