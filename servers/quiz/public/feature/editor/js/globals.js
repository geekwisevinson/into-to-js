const projectInput = document.querySelector('#folders-select');
const fileInput = document.querySelector('#files-select');
const viewInput = document.querySelector('#view-select');
const liveInput = document.querySelector('#live-input');

let currentPages = [];
let htmlLast = '';
let htmlLast2 = '';
let jsLast = '';
let jsLast2 = '';

let currentState = {
    html1: {
        cursor: null,
        time: null,
    },
    html2: {
        cursor: null,
        time: null,
    },
    js1: {
        cursor: null,
        time: null,
    },
    js2: {
        cursor: null,
        time: null,
    },
    username: myUser.username,
};


const html1 = createCM( document.querySelector('#html'), 'html', 'html1');
const html2 = createCM( document.querySelector('#htm2'), 'html', 'html1');
const js1 = createCM( document.querySelector('#javascript'), 'js', 'js1');
const js2 = createCM( document.querySelector('#javascript2'), 'js', 'js2');

html1.on('keyup', this.changeDetectedCm);
html1.on('mousedown', this.mouseDownDetectedCm)


function createCM(el, type, name) {
    const htmlConfig = {
        lineNumbers: true,
        mode: "text/html"
    };
    const jsConfig = {
        lineNumbers: true,
        extraKeys: {
            "Ctrl-Space": "autocomplete"
        },
        mode: {
            name: "javascript",
            globalVars: true
        }
    };
    const cm = CodeMirror(el, type === 'html' ? htmlConfig : jsConfig);
    cm.changeDetectedCm = changeDetectedCm;
    cm.mouseDownDetectedCm = mouseDownDetectedCm;
    cm.cmName = name;
    cm.username = myUser.username;
    return cm;
}

function changeDetectedCm(cm, event) {
    console.log('value', cm.getValue() )
}

function mouseDownDetectedCm (cm, event) {
    console.log('mouse down', cm, event)
}
