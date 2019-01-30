function styleElement({ element, styleObject }) {
    const keys = Object.keys(styleObject);
    keys.forEach( key => {
        element.style[key] = styleObject[key];
    });
}
