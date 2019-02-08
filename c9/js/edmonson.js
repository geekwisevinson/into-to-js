/*global body*/
var myDiv = document.createElement('div');
myDiv.innerHTML = '<p>Ed</p>'
body.appendChild(myDiv);

myDiv.classlist.add('ed-div')

const liValuesEd = ['ed', 'monson', 'ed@monsoninsurance.com']
var myUl = document.createElement('ul');
myDiv.classList.add('ed-ul');
liValuesEd.forEach(value => {
   const li = document.createElement('li');
   li.classList.add('ed-li');
   li.appendChild(document.createTextNode(value));
   myUl.appendChild(li);
});

myDiv.appendChild(myUl)
