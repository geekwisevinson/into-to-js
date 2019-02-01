alert('connected');

const page = {
  body: {
    backgroundColor:'blue',

    header: {
      backgroundColor: 'yellow',



    },
        main: {
    },
  },
};

createElements(document.body, page.body);
function createElements(element, styleObj) {
  const keys = Object.keys(styleObj);
  console.log(keys);
  keys.forEach( key => {
    console.log
    if (typeof styleObj[key] === 'object') {
      console.log(styleObj[key])
    }

  });
}
