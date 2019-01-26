const footer = document.createElement('div');
const buttonFooter = document.createElement('button');
buttonFooter.innerText = 'Footer';
footer.appendChild(buttonFooter);
const footerText = document.createTextNode('footers!');
footer.appendChild(footerText);
document.body.appendChild(footer);
console.log(footer);



console.log(footer.style);