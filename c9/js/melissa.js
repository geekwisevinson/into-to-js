import { body } from '../js/vinson.js';
import { endpoints } from '../js/vinson.js';

{
   const melissa = document.createElement('h1');
   melissa.innerHTML = 'Melissa';
   body.appendChild(melissa);
}

// current
{

   const jsonP = 'https://jsonplaceholder.typicode.com/posts'
   const xhr = new XMLHttpRequest();
   xhr.open('GET', endpoints[2]);
   xhr.onreadystatechange = function() {

      if (xhr.readyState !== 4) return;
      console.log(JSON.parse(this.responseText));
      let posts = JSON.parse(this.responseText);
      posts.forEach(post => {
         console.log(post)
      })
   }

   xhr.send();

}


/*global body */
// var myDiv = document.createElement('div');
// myDiv.innerHTML = '<p>Melissa<p>';
// body.appendChild(myDiv);




// const melValues = ['Melissa', 'Varela', 'is awesome', 'mjanayvarela@gmail.com'];
// var melUl = document.createElement('ul');
// myDiv.classList.add('melissa-ul')
// melValues.forEach(value => {
//    const li = document.createElement('li');
//    li.classList.add('melissa')
//    li.appendChild(document.createTextNode(value));
//    melUl.appendChild(li)
// });

// myDiv.appendChild(melUl);



// (function() {
//    const body = document.body;
// })();

// {
//    const body = document.body;
// }
