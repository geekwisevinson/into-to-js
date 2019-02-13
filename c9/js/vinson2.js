import { body, endpoints } from "../js/vinson.js";

{
   const myH1 = document.createElement('h1');
   myH1.innerHTML = 'Vinson';
   body.appendChild(myH1);
}


// current
{

   const jsonP = 'https://jsonplaceholder.typicode.com/posts'
   const xhr = new XMLHttpRequest();
   xhr.open('GET', endpoints[2]);
   xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      // console.log(JSON.parse(this.responseText));
      let posts = JSON.parse(this.responseText);


      // forEach: allows you to run through the entire index of your array loop once
      // posts.forEach(post => {
      //    console.log(post)
      // })


      // Map: return an array that the same amount of items as the origin replace a new item of whatever you return
      // const result = posts.map(post => {
      //    return post.id;
      // });
      // console.log(result);


      // Filter: return a new array with only items that meet condition
      // const result = posts.filter(post => {
      //    if (post.id > 90) return true;
      // })



      // Sort: takes a function that returns 1 or -1 and sorts based off a conditional
      // const result = posts.sort((postA, postB) => {
      //    if (postA.title[0] > postB.title[0]) {
      //       return 1
      //    }
      //    else {
      //       return -1;
      //    }
      // })
      // console.log(result);

      const myArr = ['1', 1, null, true, 'vinson', 'fernandez']
      const myName = myArr.slice(4, 2);
      console.log(myName)
      console.log(myArr)

   }

   xhr.send();

}
