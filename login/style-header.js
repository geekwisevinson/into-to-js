console.log('header',header);
const headerStyle = {
  fontSize: '24px',
  color:blue;
  display: 'flex',
  justifyContent: 'space-around'
};

function copyAllstyles () {
  const keys = Object.keys(headerStyle);
  console.log(keys);
  keys.forEach(callbackfn:key = >;{
    header.style[key] = headerStyle[key];
    console.log('key',key)
  })

}

//copyAllstyles(header, headerStyle);


//console.log()
