console.log('array', typeof []);
const page = {
    body: {
        header: {
            height: '200px',
            title: {
                text: 'hello',
                border: '1px solid black',
                textAlign: 'center',
                ['grid-column']: '5',
                ['grid-row']: '2 / span 1',
                backgroundColor: 'red',
                ['font-family']: "Comic Sans MS",
                type: 'img',
                width: '200px',
                attr: [['src', 'https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg']],
            },
            ['login-button']: {
              text: 'push me',
                textAlign: 'center',
                border: '1px solid black',
                backgroundColor: 'cornflowerblue',
                ['grid-column']: '9',
                ['grid-row']: '2 / span',
                ['border-radius']: '20px',
                listeners: [['click', alerter ]],
            },
            backgroundColor: "yellow",
            display: 'grid',
            ['grid-template-columns']: 'repeat(10, 1fr)',
            ['grid-template-rows']: 'repeat(3, 1fr)',

        },
        backgroundColor: "cornflowerblue",
        color: 'white',
        margin: '0px'
    }
};
createElements({el: document.body, obj: page.body});
function createElements( { el, obj }) {
    const keys = Object.keys(obj);
    keys.forEach( key => {
        console.log('type',typeof obj[key]);
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            console.log('OBJECT', obj[key]);
            const newEl = document.createElement(obj[key].type ? obj[key].type : 'div');
            newEl.classList.add(key);
            el.appendChild(newEl);
            createElements({el: newEl, obj: obj[key]});
        } else if (typeof obj[key] === 'string') {
            console.log('STRING', obj[key]);
            console.log('style', obj[key]);
            if (key === 'text') {
                const text = document.createTextNode(obj[key]);
                el.appendChild(text);
            } else {
                el.style[key] = obj[key];
            }
        } else if (Array.isArray(obj[key])) {
            if (key === 'listener') {
                obj[key].forEach( item => {
                    el.addEventListener(item[0], item[1]);
                });
            } else if ( key === 'attr') {
                console.log('attr', obj[key]);
                obj[key].forEach( item => {
                    console.log('items',item[0], item[1]);
                    el.setAttribute(item[0], item[1]);
                });
            }

        } else {
            console.log('!!!! not an object or a string !!!!!', obj[key]);
        }
    })
}

function alerter() {
    alert('hello');
}