/*global body*/

var myDiv = document.createElement('div');

myDiv.innerHTML = '<p>Alex</p>';
body.appendChild(myDiv);

var list = document.createElement('ul');
const info = ['alex', 'rodriguez', 'alejandro.xsc@gmail.com'];


info.forEach(value => {
   const li = document.createElement('li');
   li.appendChild(document.createTextNode(value));
   list.appendChild(li);
});


myDiv.appendChild(list);
