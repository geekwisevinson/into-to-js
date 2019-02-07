/*global body */
var theDiv = document.createElement('div');
myDiv.innerHTML = '<p>Marisol</p>';
body.appendChild(theDiv);
theDiv.classList.add('marisol-div');

const personInfo = ['Marisol', 'Garcia', 'marisolgarcia.11314@gmail.com'];
var theUl = document.createElement('ul');

theDiv.classList.add('marisol-ul');
personInfo.forEach(value => {
   const li = document.createElement('li');
   li.classList.add('mari');
   li.appendChild(document.createTextNode(value));
   theUl.appendChild(li);
});

theDiv.appendChild(theUl);


const mLis = document.getElementsByClassName('marisol-li')
console.log({ mLis });

const qsMlis = document.querySelector('.marisol-div .marisol-li')
console.log({
   qsMlis
});
