const socket = io();
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
        console.log('logout button', logoutButton)
        localStorage.setItem('username', '');
        localStorage.setItem('token', '');
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        console.log('clear', {username, token});
        this.remove();
        socket.emit('request-server-for-redirect', 'home');
    });
}
const topDiv = document.createElement('div');
topDiv.innerHTML = topTemplate;
console.log('body', document)
document.body.prepend(topDiv);
// Check browser support
if (typeof(Storage) !== "undefined") {
    console.log('you have storage')
} else {
    document.getElementById("error").innerHTML = "Sorry, your browser does not support Web Storage...";
}
socket.on('connect', () => {
    console.log(socket.id);
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (username && token) {
        console.log('attempt to log in with token', username, token );
        socket.emit('client-would-like-to-login', {username, password: token });
    } else {
        console.log('path', urlArray);
        if (urlArray[urlArray.length -1]  !== 'home') {
            socket.emit('request-server-for-redirect', 'home');
        }
    }
});
socket.on('client-should-redirect', (page) => {
    console.log('server is letting us know we need to redirect');
    console.log('server event', window.location.href);
    const redirect = window.location.href.split('/').slice(0,4);
    console.log('redirectA', redirect);
    redirect[redirect.length -1 ] = page;
    console.log('redirect', redirect.join('/'));
    const newRef = redirect.join('/');
    window.location.href = newRef;
});

socket.on('error-message', (error) => {
    console.log('error');
    document.querySelector('#error').innerHTML = error;
});

socket.on('server-sent-login', ({username, token}) => {
    console.log('server-sent-login', {username, token});
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    console.log('logged in');
    document.querySelector('#error').innerHTML = '';
    document.querySelector('#logged-in').innerHTML = username;
    document.querySelector('#token').innerHTML = token;
    createLogoutButton();
    socket.emit('client-location', urlArray.join('/'));
});

socket.on('users', (users) => {
    console.log('users', users);
});
console.log('loaded standard.js');