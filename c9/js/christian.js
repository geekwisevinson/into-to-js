/* global body */
var myDiv = document.createElement('div');
myDiv.innerHTML = '<p>Christian<p>';
body.appendChild(myDiv);
var myul = document.createElement('ul');

var myinfo = { fName: "Christian", lName: "Coelho", email: "coelho.christian@gmail.com" };

myInfo(myinfo);
body.appendChild(myul);


function myInfo(listInfo) {

   var li = document.createElement('li');
   var li2 = document.createElement('li');
   var li3 = document.createElement('li');
   li.innerHTML = listInfo.fName;
   myul.appendChild(li);

   li2.innerHTML = listInfo.lName;
   myul.appendChild(li2);

   li3.innerHTML = listInfo.email;
   myul.appendChild(li3);




}
