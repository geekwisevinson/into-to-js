/*global body */
var myDiv = document.createElement('div');
myDiv.innerHTML = '<p>Melissa<p>';
body.appendChild(myDiv);




const melValues = ['Melissa', 'Varela', 'is awesome', 'mjanayvarela@gmail.com'];
var melUl = document.createElement('ul');
myDiv.classList.add('melissa-ul')
melValues.forEach(value => {
   const li = document.createElement('li');
   li.classList.add('melissa')
   li.appendChild(document.createTextNode(value));
   melUl.appendChild(li)
});

myDiv.appendChild(melUl);
