function copyAllStyles (element, styleObj) {
    const keys = Object.keys(styleObj);
    console.log(keys);
    keys.forEach(  key => {
        element.style[key] = styleObj[key];
        console.log('key', key);
        console.log('ky')
    });
}