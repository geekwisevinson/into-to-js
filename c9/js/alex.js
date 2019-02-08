import { body } from "../js/vinson.js"; {
   const myH1 = document.createElement('h1');
   myH1.innerHTML = 'Alex'
   body.appendChild(myH1);
} {
   const xhr = new XMLHttpRequest();
   xhr.open('GET', 'test.txt');
   xhr.onreadystatechange = function() {
      console.log('this');

   }
   xhr.send();
}
