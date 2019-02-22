import { body, endpoints } from "../js/vinson.js"; {
   const myH1 = document.createElement('h1');
   myH1.innerHTML = 'Vinson';
   body.appendChild(myH1);
}

{

   const jsonP = 'https://jsonplaceholder.typicode.com/posts';
   const xhr = new XMLHttpRequest();
   xhr.open('GET', endpoints[2]);
   xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      console.log(JSON.parse(this.responseText));
      let posts = JSON.parse(this.responseText);

      const result = posts.map(post => {
         if (post.id > 90) return post;
      });
   };

   xhr.send();

}
