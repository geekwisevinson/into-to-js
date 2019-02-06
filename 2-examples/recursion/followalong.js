alert('connected');

const page = {
    body: {
        backgroundColor: 'green',
        height: '100%',
        header: {
            backgroundColor: 'orange',
            ['header-button']: {
                backgroundColor:'red',
                text: 'push me',
                type: 'button',
            }

        },
    
    main: {

    },
    }
};

createElements(document.body, page.body);
function createElements (element, styleObj) {
    debugger;
    const keys = Object.keys(styleObj);
    console.log(keys)
    keys.forEach( key => {
        console.log(typeof styleObj[key]);
        if (typeof styleObj[key] === 'object') {
            console.log(styleObj[key])
            console.log(styleObj.type ? styleObj : 'div');
            const newEl = document.createElement(styleObj.type ? styleObj.type : 'div');
            element.appendChild(newEl);
            newEl.classList.add(key);
            createElements(newEl, styleObj[key]);
        } else if (typeof styleObj[key] === 'string') {
            if (key === 'text') {

                const text =document.createTextNode(styleObj[key]);
            }
            element.style[key] = styleObj[key];
        }
    });

}