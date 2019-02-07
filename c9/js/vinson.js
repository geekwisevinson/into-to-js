/*global body */
const body = document.body;
let currentLi = null;
const bucket = document.createElement('div');
bucket.style.height = '200px';
bucket.style.background = 'red';
bucket.addEventListener('click', function() {
   if (currentLi) {
      bucket.appendChild(currentLi)
   }
})
body.appendChild(bucket);
var myDiv = document.createElement('div');
myDiv.innerHTML = '<p>Vinson<p>';
body.appendChild(myDiv);
myDiv.classList.add('vinson-div');


var myUl = document.createElement('ul');
myUl.classList.add('vinson-ul');

const liValuesVinson = ['vinson', 'fernandez', 'geekwise.vinson.fernandez@gmail.com'];
liValuesVinson.forEach(value => {
   const li = document.createElement('li');
   li.classList.add('vinson-li');
   li.appendChild(document.createTextNode(value));
   myUl.appendChild(li);
   li.addEventListener('click', function() {
      currentLi = this;
   })
});






const vLis = document.getElementsByClassName('vinson-li')
console.log({ vLis });

const qsVlis = document.querySelectorAll('#vinson-ul')
console.log({ qsVlis });


if (1 + 1 === 3) {
   var x = 1;
}
