/* global body */
var myDiv = document.createElement('div');
myDiv.innerHTML = '<p>Yes</p>';
body.appendChild(myDiv);

const ycList = ['Yessie', 'Bear', 'eliyessie@gmail.com'];
var yeseniaUl = document.createElement('ul');

ycList.forEach(value => {
   const li = document.createElement('li');
   li.appendChild(document.createTextNode(value));
   yeseniaUl.appendChild(li);
});

myDiv.appendChild(yeseniaUl);
