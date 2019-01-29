function createElement({ type, text, parent, classes, html }) {
    const el = document.createElement(type);
    if (text) {
        const textNode = document.createTextNode(text);
        el.appendChild(textNode);
    }
    if (html) {
        el.innerHTML = text;
    }
    if (parent) {
        parent.appendChild(el);
    }

    if (classes) {
        classes.forEach( className => {
            el.classList.add(className);
        })
    }
    return el;
}
