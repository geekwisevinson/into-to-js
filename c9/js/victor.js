export const body = document.body;
export const endpoints = ['test.text', 'test,html', 'https://jsonplaceholder.typicode.com/']
//import { body } from "../js/vinson.js"; {
//const victor = document.createElement('h1');
//victor.innerHTML = 'victor';
//body.appendChild(victor);
//}

{

   //current 
   const jsonP = 'https://jsonplaceholder.typicode.com/posts'
   const xhr = new XMLHttpRequest();
   xhr.open('GET', endpoints[2]);
   xhr.onreadystatechange = function() {

      if (xhr.readyState !== 4) return;
      console.log(JSON.parse(this.responseText));
      let posts = JSON.parse(this.responseText);

      // forEach:  allows you run through the entire index of your array loop once
      //posts.forEach(post =>{
      //   console.log(post)
      //})

      //const result = posts.map(post => {
      //   if (post.id > 90) return post;
      //});
      // console.log(result);

      //const result = posts.filter(post =>{
      //   if (post.id > 90 ) return true;

      // })
      // const result = post.sort((postA, postB) => {
      //     if (postA.title[0] > (postB.title[0]) {
      //      return 1
      //    }
      //   else {
      //     return -1;
      //  }
      //}) console.log(result)

      const myArr = ['1', 1, null, true, 'vinson', 42]
      const myName = myArr.splice(4, 2);
      console.log(myArr)
      console.log(myName)

   }

   xhr.send();

}
