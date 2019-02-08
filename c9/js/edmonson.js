/*import { body } from "../js/vinson.js"; {
   const myH1 = document.createElement('h1');
   myH1.innerHTML = 'Ed';
   body.appendChild(myH1);
}

{
   const xhr = new XMLHttpRequest();
   xhr.open('GET', 'test.txt');
   xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      console.log(this);
   }

   xhr.send();

}*/

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
