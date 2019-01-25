// use webstorm IDE

function copyAllStyles (element,styleObj) {
  const keys = Object.keys(styleObj);
  console.log(keys);
  keys.forEach( callbackfn: key => {
    element.style[key] = styleObj[key];
    console.log('key', key)
  })
}
