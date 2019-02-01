alert('connected')

const page = {
  body: {
    backgroundColor : 'green',
    height: '100%',
    header: {
      backgroundColor : 'yellow',
      ['header-button']: {
        backgroundColor : 'blue',
        text: 'push me',
        type: 'button',
        listeners: [['click', alerter]],
      }

    },
    main: {

    }
  }
};

createElements(document.body, page.body);
function createElements(element, styleObj) {
    const keys = Object.keys(styleObj);

    keys.forEach( (key) => {

      if (typeof styleObj[key] === 'object') {
        const newEl = document.createElement(styleObj[key].type ? styleObj[key].type : 'div');
        element.appendChild(newEl);
        newEl.classList.add(key);
        createElements(newEl, styleObj[key]);
      } else if (typeof styleObj[key] === 'string') {
          if (key === 'text') {
              const text = document.createTextNode(styleObj[key]);
              element.appendChild(text);
          }  
             else {
              element.style[key] = styleObj[key];
            }
      }
    });
};

function alerter() {
    alert('works');
}
