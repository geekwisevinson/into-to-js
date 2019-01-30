alert ('connected')

const page = {
  body: {
    backgroundColor: 'pink',
    height: '100%',
    header: {
      backgroundColor: 'grey',
      ['header-button']: {
        backgroundColor: 'purple',
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
function createElements(element,styleObj) {
    const keys = Object.keys(styleObj);
    console.log(keys);
    keys.forEach( (key) => {
      console.log(typeof s  tyleObj[keys]);
      if (typeof styleObj[key] === 'object'){
      console.log(styleObj[key]);
      const newEl = document.createElement('div');
      element.appendChild(newEl);
      newEl.classList.add(key);
      createElements(newEl, styleObj[key]);
    } else if ( typeof styleObj[key] === 'string'){
      if ( key ==='text'){
          const text = document.createTextNode(styleObj [key])
      } else if( key === 'listeners')
    } else {
        element.style[key] = styleObj[key];
      }
    }

  }};
};

function alerter()
{
  alert('works');
}
