/*global body */
var myDiv = document.createElement('div');
myDiv.innerHTML = '<p>Gaby<p>';
body.appendChild(myDiv);




const gabrielaValues = ['Gabriela', 'Trujillo', 'gtrujillo15@gmail.com'];
var gabrielaUl = document.createElement('ul');
myDiv.classList.add('gabriela-ul')
gabrielaValues.forEach(value => {
   const li = document.createElement('li');
   li.classList.add('gabriela')
   li.appendChild(document.createTextNode(value));
   gabrielaUl.appendChild(li)
});

myDiv.appendChild(gabrielaUl);
