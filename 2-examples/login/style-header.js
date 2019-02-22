console.log('header', header);

const headerStyle = {
    fontSize: '24px',
    color: 'pink',
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: 'green',
};
//
// function copyAllStyles() {
//       const keys = Objects.keys(headerStyle);
//       console.log(keys);
//       keys.forEach( callbackfn: key => {
//           header.style[key] = headerStyle[key];
//           element.stule[key] = styleObj[key];
//           console.log('key', key);
//       })
// }

copyAllStyles ( header, headerStyle);
