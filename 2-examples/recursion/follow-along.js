alert("connected");

const page = {
    body: {
      backgroundColor : 'green',

      header : {
        backgroundColor :'yellow',
        ['header-button']: {
          backgroundColor: 'blue',
          text: 'push me',
          type: 'button',
          listeners: [['click',alerter]],
        }

      },

      main: {

      }
    }
};

createElements(document.body, page.body);

function createElements(element, styleObject){
  const keys = Object.keys(styleObject);
  console.log(keys);
  keys.forEach(key => {
    console.log(typeof styleObject[key]);
    if (typeof styleObject[key] === 'object'){
      console.log(styleObject[key]);
      const newEl = document.createElement(styleObject[key].type ? styleObject[key].type : 'div');
      element.appendChild(newEl);
      newEl.classList.add(key);
      createElements(newEl, styleObject[key]);
    } else if (typeof styleObject[key] === 'string') {
      if(key === 'text'){
        const text = document.createTextNode(styleObject[key]);
        element.appendChild(text);
      }
      else if ( key === 'listeners'){
        styleObject[key].forEach(event => {
          element.addEventListener(event[0], event[1])
        });

      }
    }


  });
}

function alerter() {
  alert('works')
}
