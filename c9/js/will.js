/* global body */
var myDiv = document.createElement('div');
myDiv.innerHTML = '<p>Will</p>';
body.appendChild(myDiv);
myDiv.classList.add('will-div');

const myList = ['Will', 'Robertson', 'will@riker17.com'];

var myUl = document.createElement('ul');
myUl.classList.add('will-ul');
myList.forEach(value => {
   const li = document.createElement('li');
   li.classList.add('will-li');
   li.appendChild(document.createTextNode(value));
   myUl.appendChild(li);
});

myDiv.appendChild(myUl);


const vLis = document.getElementsByClassName('will-li');
