const socket = io();
let myUser = {};
let selectedProject = localStorage.getItem('selectedProject');
let selectedFile = localStorage.getItem('selectedFile');
const colorSchemes = [
    ['#f4cc70', '#20948b', '#de7a22', '#6ab187'],
    ['#34675c', '#4CB5F5', '#b3c100', '#b7b8b6'],
];
const urlArray = window.location.href.split('/');
const topTemplate = `
        <div id="top-holder">
            <span id="logged-in"></span>
            <span id="token"></span>
        </div>
     
        <div id="error"></div>
`;
function createLogoutButton() {
    if (document.getElementById('top-holder').innerText.includes('Logout')) {
        console.log('already a button');
        return;
    }
    const logoutButton = document.createElement('button');
    logoutButton.appendChild(document.createTextNode('Logout'));
    document.getElementById('top-holder').appendChild(logoutButton);
    logoutButton.addEventListener('click', function () {
        localStorage.setItem('username', '');
        localStorage.setItem('token', '');
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        this.remove();
        socket.emit('request-server-for-redirect', 'home');
    });
}
const topDiv = document.createElement('div');
topDiv.innerHTML = topTemplate;
topDiv.style.background = 'var(--color-first)';
topDiv.style.padding = '1.8em';
document.body.prepend(topDiv);
const loggedInDiv = document.getElementById('logged-in');
loggedInDiv.style.fontSize = '1.6em';

// Check browser support
if (typeof(Storage) !== "undefined") {
    console.log('you have storage')
    selectedProject = localStorage.getItem('selectedProject');
    selectedFile = localStorage.getItem('selectedFile');
    console.log('project', selectedProject);
    console.log('file', selectedFile)
} else {
    document.getElementById("error").innerHTML = "Sorry, your browser does not support Web Storage...";
}
socket.on('connect', () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log("token", token)
    if (username && token) {
        socket.emit('client-would-like-to-login', {username, password: token });
    } else {
        if (urlArray[urlArray.length -1]  !== 'home') {
            socket.emit('request-server-for-redirect', 'home');
        }
    }
});
socket.on('client-should-redirect', (page) => {
    const redirect = window.location.href.split('/').slice(0,4);
    redirect[redirect.length -1 ] = page;
    const newRef = redirect.join('/');
    window.location.href = newRef;
});

socket.on('error-message', (error) => {
    document.querySelector('#error').innerHTML = error;
});

socket.on('server-sent-login', ({username, token}) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    document.querySelector('#error').innerHTML = '';
    document.querySelector('#logged-in').innerHTML = username;
    document.querySelector('#token').innerHTML = token;
    createLogoutButton();
    myUser.username = username;
    myUser.token = token;
    socket.emit('client-location', urlArray.join('/'));
});

socket.on('users', (users) => {

});