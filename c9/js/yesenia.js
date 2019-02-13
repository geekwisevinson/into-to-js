import { body, endpoints } from '../js/vinson.js';

{
   const yesenia = document.createElement('h1');
   yesenia.innerHTML = 'Yesenia';
   body.appendChild(yesenia);
}

{
   const jsonP = "https://jsonplaceholder.typicode.com/posts";
   const xhr = new XMLHttpRequest();
   xhr.open('GET', endpoints[5]);
   xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4)
         return;
      // console.log(JSON.parse(this.responseText);
      let posts = JSON.parse(this.responseText);

      // forEach: allows you to run through the entire index of array. Loops Once

      // posts.forEach( post => {
      //    console.log(post);
      // })

      // Map: return an array that the same amount of items as the origin replace a new item of whatever you return

      // const result = posts.map( post => {
      //       return post.id;
      // });
      // console.log(result);

      // Filter: return a new array with only items that meet condition

      // const result = posts.filter( post => {
      //    if ( post.id > 90) 
      //       return true;
      // });
      // console.log(result);

      // Sort: takes a function that returns 1 or -1 and sorts based off a conditional

      // const result = posts.sort((postA, postB) => {
      //    if (postA.title[0] > postB.title[0]) {
      //       return 1;
      //    }
      //    else {
      //       return -1;
      //    }
      // });
      // console.log(result);

      // 

      const myArray = ['1', 1, 'One', null, true, 'yesenia', 25]
      //  splice will manipulate your array and remove the index that you called 
      myArray.splice(myArray.indexOf('25'));
      console.log(myArray);
      // Slice will just cut off the characters
      const myName = myArray.slice(myArray.indexOf('yesenia'), 2);
      console.log(myName);
   };

   xhr.send();


}
