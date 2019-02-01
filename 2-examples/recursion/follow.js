alert('Connected');

const page = {
    body: {
        height: '100%',
        backgroundColor: 'coral',
        header: {
            backgroundColor: 'maroon',
            ['header-button']: {
                backgroundColor: 'orange',
                text: 'push me',
                type: 'button',
                listeners: [['click', alerter]],
            }
        },
        main: {

        },
    }
};

function createElements(element, styleObj) {
    const keys = Object.keys(styleObj);
    console.log(keys);
    keys.forEach(key => {
        console.log(typeof styleObj[key]);
        if (typeof styleObj[key] === 'object') {
            console.log(styleObj[key]);
            console.log(styleObj.type ? styleObj.type : 'div');
            const newEl = document.createElement(styleObj[key].type ? styleObj[key].type : 'div');
            element.appendChild(newEl);
            newEl.classList.add(key);
            createElements(newEl, styleObj[key]);
        } else if (typeof styleObj[key] === 'string') {
            if (key === 'text') {
                const text = document.createTextNode(styleObj[key]);
                element.appendChild(text);
            } else if (key === 'listeners') {
                styleObj[key].forEach(event => {
                    element.addEventListener(event[0], event[1]);
                });
            } else {
                element.style[key] = styleObj[key];
            }
        }

    });
}

createElements(document.body, page.body);

function alerter() {
    alert('button click!');
}