alert ('connected');

const page = {
  body: {
    backgroundColor : 'blue' ,
    height: '100%',
    header: {
      backgroundColor : 'yellow',
      ['header-button']: {
        backgroundColor: 'orange',
        text: 'push me',
        type: 'button',
        listeners: [['click',alerter]],
      }
    },
    main: {

    }
  }
};

function createElements(element, styleObj) {

  const keys = Object.keys(styleObj);

  keys.forEach(key => {
    console.log(typeof styleObj[key]);
    if(typeof styleObj[key] === 'object'){
      console.log('style', styleObj);
      console.log(styleObj.type ? styleObj.type : 'div' );
      const newEl = document.createElement(styleObj[key].type ? styleObj[key].type : 'div');
      element.appendChild(newEl);
      newEl.classList.add(key);
      createElements(newEl, styleObj[key]);
    }else if (typeof styleObj[key] === 'string' ){
      if (key === 'text' ){
        const text = document.createTextNode(styleObj[key]);
        element.appendChild(text);
      } else {
      element.style[key] = styleObj[key];
    } else if (key === 'listeners'){
      console.log('listeners',styleObj)
        styleObj[key].forEach( event =>{
        element.addEvenListener(event[0],event[1]);
      });

  }
    }

  });

}
createElements(document.body, page.body);

function alerter(){
  alert('works');
}
