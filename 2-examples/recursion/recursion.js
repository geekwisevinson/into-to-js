console.log('array', typeof []);
const page = {
    body: {
        header: {
            height: '200px',
            backgroundColor: "yellow",
            display: 'grid',
            ['grid-template-columns']: 'repeat(10, 1fr)',
            ['grid-template-rows']: 'repeat(3, 1fr)',
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
            ['button-container']: {
                ['grid-column']: '9',
                ['grid-row']: '2 / span 1',
                overflow: 'visible',
                ['login-button']: {
                    text: 'push me',
                    textAlign: 'center',
                    border: '1px solid black',
                    backgroundColor: 'cornflowerblue',
                    ['border-radius']: '20px',
                    type: 'button',
                    listeners: [['click', alerter ], ['mouseenter', mouseEnter], ['mouseout', mouseOut ]],
                },
            },


        },
        backgroundColor: "cornflowerblue",
        color: 'white',
        margin: '0px',
        height: '100%',
        main: {
            backgroundColor: 'orange',
            'text-input': {
                type: 'input',
                attr: [['type', 'number']],
            },
        }
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
            if (key === 'listeners') {
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
    setTimeout( () => {
        const img = document.getElementsByTagName('img')[0];
        document.body.appendChild(img)
    })
}

function mouseEnter () {
    this.style.backgroundColor = 'blue';
    const img = document.getElementsByTagName('img')[0];
    img.myAnimation = img.animate([
        // keyframes
        { transform: 'translateX(0px)' },
        { transform: 'translateX(-400px)' }
    ], {
        // timing options
        duration: 9000,
        iterations: Infinity

    });
    console.log('img', img);
}

function mouseOut () {
    this.style.backgroundColor = 'red';
    const img = document.getElementsByTagName('img')[0];
    img.myAnimation.reverse();
}
