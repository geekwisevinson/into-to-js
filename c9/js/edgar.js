/*global body */
var myDiv = document.createElement('div');
myDiv.innerHTML = '<p>Edgar<p>';
body.appendChild(myDiv);
myDiv.classList.add('edgar-div');

const liValuesEdgar = ['edgar', 'gutierrez', 'edgargutierrez130@gmail.com'];
var myEdgarUl = document.createElement('ul');
myDiv.classList.add('edgar-ul');
liValuesEdgar.forEach(value => {
    const li = document.createElement('li');
    li.classList.add('edgar')
    li.appendChild(document.createTextNode(value));
    myEdgarUl.appendChild(li)
});

myDiv.appendChild(myEdgarUl);
