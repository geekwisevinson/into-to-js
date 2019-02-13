"use strict";
/*global __dirname*/
// SETUP
let saves = 0;
const express = require ( 'express' );
const cors = require ( 'cors' );
const fs = require ( 'fs' );
const path = require ( 'path' );
const app = express ();
const http = require ( 'http' ).Server ( app );
const port = 7000;
const io = require ( 'socket.io' ) ( http );
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const pages = [];
app.use ( cors () );
http.listen ( port, function () {
    console.log ( 'listening on', port );
});
app.use(express.static(__dirname + '/public'));
// users
const users = {};
const tokens = {};

// Serve Files
function loadPagesRoutes() {
    pages.forEach( page => {
        const myFunction = function(req, res){
            res.sendFile(__dirname + `/public/pages/${page}`);
        };
        Object.defineProperty(myFunction, 'name', {value: page, writable: false});
        app.get(`/${page.substring(0, page.indexOf('.html'))}`, myFunction);
    })
}
loadPagesRoutes();
app.get('/', function catchRoute(req, res){
    console.log('you came home');
    res.sendFile(__dirname + "/public/entry/home.html");
});
app.get('/home', function catchRoute(req, res){
    console.log('you came home');
    res.sendFile(__dirname + "/public/entry/home.html");
});
app.get('/editor/:project/:file', function catchRoute(req, res){
    console.log('/projects/editor/:project/:file');
    res.sendFile(__dirname + "/public/feature/editor/editor.html");
});

app.get('/live/:project/:file', function catchRoute(req, res){
    console.log('/projects/live/:project/:file');
    const project = req.params.project;
    const file = req.params.file;
    console.log( {project, file}, req.params);
    res.sendFile(__dirname + `/public/feature/projects/${project}/${file}.html`);
});
app.get('/projects/:page', function catchRoute(req, res){
    console.log('/projects/:page');
    res.sendFile(__dirname + "/public/feature/pages/pages.html");
});
app.get('/projects', function catchRoute(req, res){
    res.sendFile(__dirname + "/public/feature/projects/projects.html");
});
addCatchRoute();
function addCatchRoute() {
    app.get('/*', function catchRoute(req, res){
        console.log('could not find your route');
        res.sendFile(__dirname + "/public/entry/not-found.html");
    });
}
// Socket messages
setInterval( () => {
    sendUsers();
}, 10000);
function sendUsers() {
    const keys = Object.keys(users);
    const userSockets = keys.map( key => ({ [key] : users[key].socketID ? users[key].socketID: ''}) );

    io.emit('users', userSockets);
}
io.on ( 'connection', function (socket) {
    const userConfigs = fs.readdirSync(__dirname + '/public/users')
        .map( user => user.substring(0, user.indexOf('.json')));
    userConfigs.forEach( user => {
        if (!users[user]) {
            users[user] = '';
        }
    });
    sendUsers();
    socket.on('client-would-like-to-sign-up', function ({username, password}) {
        clientWouldLikeToSignUp(socket, username, password)
    });
    socket.on('client-would-like-to-login', function ({username, password}) {
        clientWouldLikeToLogin(socket, username, password);
    });
    socket.on( 'request-server-for-redirect', function (page) {
        io.to(socket.id).emit('client-should-redirect', page);
    });
    socket.on( 'request-server-for-redirect-all', function (page) {
        console.log(`client requested all redirect to ${page}`);
        io.emit('client-should-redirect', page);
    });
    socket.on('request-server-for-pages', function(path){
        requestServerForPages(socket, path);
    });
    socket.on('request-server-for-folders', function(path){
        requestServerForFolders(socket, path);
    });
    socket.on('request-text-from-file', function(path){
        const built = __dirname + '/public/feature/projects/' + `${path}.html`;
        if (!fs.existsSync(built)) {
            return;
        }
        const content = fs.readFileSync(built, 'utf8');
        const dom = new JSDOM(content);
        let js = '';
        const links = dom.window.document.getElementsByTagName('script');
        Array.from(links).forEach( link => {
            dom.window.document.getElementsByTagName('html')[0].appendChild(link);
        });
        const scripts = dom.window.document.getElementsByTagName('script');
        Array.from(scripts).forEach( script => {
            const dom = new JSDOM(content);
            if (script.src) {
            } else {
                js += script.innerHTML;
            }
            script.remove();
        });
        const rx = new RegExp("<script[\\d\\D]*?\/script>", "g");
        const html = content.includes('<body>') ? content.substring(content.indexOf('<body>') + 6, content.indexOf('</body>')).replace(rx, '') : '';
        io.to(socket.id).emit('server-sent-data-text', {html, js});
    });
    socket.on('request-to-save-text', function(path, {html, js, username}, liveCoding){
        saves++;
        console.log('saves', saves, username);
        let replacedHtml = html.replace('&lt;','<');
        replacedHtml = replacedHtml.replace('&gt;', '>');
        debugger;
        const file = __dirname + `/public/feature/projects/${path}.html`;
        // get template
        const template = fs.readFileSync(__dirname+ '/public/feature/templates/page-template.html', 'utf8');
        const dom = new JSDOM(template);
        const links = dom.window.document.getElementsByTagName('link');
        const inlineScript = dom.window.document.createElement('script');
        Array.from(links).forEach(link => {
            dom.window.document.documentElement.appendChild(link);
            link.remove();
        });
        const scripts = dom.window.document.getElementsByTagName('script');
        Array.from(scripts).forEach(script => {
            if (script.src) {
                dom.window.document.documentElement.appendChild(script);
            } else {
                inlineScript.innerHTML += script.innerHTML;
            }
        });
        inlineScript.innerHTML += js;
        dom.window.document.documentElement.appendChild(inlineScript);
        inlineScript.setAttribute('id', 'inline-js');
        dom.window.document.body.innerHTML = '';

        const beforeHtml = `<!doctype html>
<html lang="en">${dom.window.document.documentElement.innerHTML}</html>`;
        const result = beforeHtml.split('<body>').join(`<body>${replacedHtml}`);
        fs.writeFileSync(file, result);
        if (liveCoding) {
            io.emit('file-updated', 'hello friends!');
        }
    });
    socket.on('client-show-cursor', function(type, cursor, username) {
        io.emit('server-show-cursor', type, cursor, username);
    });
    socket.on('client-location', function(location) {
        if (socket.username) {
            users[socket.username].location = location;
        }
    });

    socket.on('request-server-add-page', function (path) {
        const file = __dirname + `/public/feature/projects/${path}.html`;
        fs.writeFileSync(file, '');
    });

    socket.on('request-server-add-project', function (path) {
        const folder = __dirname + `/public/feature/projects/${path}`;
        if (!fs.existsSync(folder)){
            fs.mkdirSync(folder);
        }
    });

    socket.on('send-message', function ({username, message}) {
       if (username && users[username]) {
           io.to(users[username].socketID).emit('server-sent-message', message);
       }
    });
    socket.on('disconnect', function() {
        if (socket.username) {
            users[socket.username] = '';
        }
    });
});
function removePath(path) {
    return function removeMiddleWares(route, i, routes) {
        if (route.handle.name.indexOf('.html') > -1) {
        }
        switch (route.handle.name) {
            case path:
                routes.splice(i, 1);
        }
        if (route.route)
            route.route.stack.forEach(removeMiddleWares);
    }
}
function logPaths(path) {
    return function logPathF(route, i, routes) {
        if (route.handle.name.indexOf('.html') > -1) {
            // console.log( 'route.handle.name:', route.handle.name );
        }
        if (route.route)
            route.route.stack.forEach(logPathF);
    }
}
// Long functions
function clientWouldLikeToSignUp(socket, username, password) {
    const userConfigs = fs.readdirSync(__dirname + '/public/users')
        .filter( user => user.includes('.json') )
        .map( user => user.substring(0, user.indexOf('.json')) );
    if (userConfigs.includes(username)) {
        socket.emit('error-message', 'User already exists!');
    } else {
        if (password.length < 2) {
            socket.emit('error-message', 'Your password has to be at least 3 characters long');
        }
        const token = Buffer.from(username + password).toString('base64');
        const data = JSON.stringify({username, password: token });
        const file = __dirname + `/public/users/${username}.json`;
        fs.writeFileSync(file, data);
        io.to(socket.id).emit('server-sent-login', {username, token});
    }
}
function clientWouldLikeToLogin(socket, username, password) {
    const userConfigs = fs.readdirSync(__dirname + '/public/users')
        .filter( user => user.includes('.json') )
        .map( user => user.substring(0, user.indexOf('.json')) );
    if (userConfigs.includes(username)) {
        const path = __dirname + '/public/users/' + `${username}.json`;
        const user = JSON.parse(fs.readFileSync(path, 'utf8') );
        user.token = user.password;
        user.socketID = socket.id;
        if (user.password === Buffer.from(username + password).toString('base64')) {
            saveLogin(user, socket);
        } else if(user.password === password) {
            saveLogin(user, socket);
        } else {
            socket.emit('error-message', 'Can not verify your password');
        }
    } else {
        socket.emit('error-message', `Can not find an account for ${username}. Sign up.`);
    }
}
function saveLogin(user, socket) {
    io.to(user.socketID).emit('server-sent-login', {username: user.username, token: user.token});
    users[user.username] = {token: user.token, socketID: user.socketID};
    tokens[user.token] = {username: user.username, socketID: user.socketID}
    socket.username = user.username;
    sendUsers();
}
function requestServerForPages(socket, path) {
    const root = __dirname + '/public/' + 'feature/projects/';
    const testPages = fs.readdirSync(root + path).filter( page => page.includes('.html') );
    testPages.forEach( page => {
        if (pages.indexOf(page) < 0) {
            pages.push(page);
            createRoute(page, root + `${path}/${page}` )
        }
    });
    pages.forEach( page => {
        if (testPages.indexOf(page) < 0) {
            pages.splice(pages.indexOf(page), 1);
            const routes = app._router.stack;
            routes.forEach(removePath(page));
        }
    });
    app._router.stack.forEach(logPaths());
    removePath('catchRoute');
    addCatchRoute();
    io.to(socket.id).emit('server-sent-data-pages', pages);
}
function requestServerForFolders(socket, path) {
    const fullPath = __dirname + '/public/feature/projects/' + path;
    const folders = fs.readdirSync(fullPath).filter( item => fs.lstatSync(fullPath + `/${item}`).isDirectory() );
    io.to(socket.id).emit('server-sent-data-folders', folders);
}
function createRoute( name, path) {
    const myFunction = function(req, res){
        res.sendFile(path);
    };
    Object.defineProperty(myFunction, 'name', {value: name, writable: false});
    app.get(`/${name.substring(0, name.indexOf('.html'))}`, myFunction);
}