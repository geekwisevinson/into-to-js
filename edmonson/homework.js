

function createElement( type, parent, text ) {
    const el = document.createElement(type);
    parent.appendChild(el);
    const textNode = document.createTextNode(text);
    el.appendChild(textNode);
    return el;
}
