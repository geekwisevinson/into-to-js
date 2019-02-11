"use strict";
/*global __dirname*/

// SETUP
const express = require ( 'express' );
const cors = require ( 'cors' );
const fs = require ( 'fs' );
const path = require ( 'path' );
const app = express ();
const http = require ( 'http' ).Server ( app );
const port = 7000;
const io = require ( 'socket.io' ) ( http );
app.use ( cors () );
http.listen ( port, function () {
    console.log ( 'listening on', port );
});
app.use(express.static(__dirname + '/public'));

// users
const users = [];

// get pages
const pages = fs.readdirSync(__dirname + '/public/pages').filter( page => page.includes('.html') );
console.log('pages', pages);

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
app.get('/projects/editor/:project/:file', function catchRoute(req, res){
    console.log('/projects/editor/:project/:file');
    res.sendFile(__dirname + "/public/feature/editor/editor.html");
});

app.get('/projects/live/:project/:file', function catchRoute(req, res){
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
io.on ( 'connection', function (socket) {
    console.log('*****');
    socket.userIndex = users.length;
    users.push(socket);

    socket.on('client-would-like-to-sign-up', function ({username, password}) {
        clientWouldLikeToSignUp(socket, username, password)
    });

    socket.on('client-would-like-to-login', function ({username, password}) {
        clientWouldLikeToLogin(socket, username, password);
    } );

    socket.on( 'request-server-for-redirect', function (page) {
        console.log(`client requested a redirect to ${page}`);
        io.to(socket.id).emit('client-should-redirect', page);
    });

    socket.on('request-server-for-pages', function(path){
        console.log('path ', path);
        requestServerForPages(socket, path);
    });

    socket.on('request-server-for-folders', function(path){
        console.log('request for folders', path);
        requestServerForFolders(socket, path);
    });
    socket.on('request-text-from-file', function(path){
        const built = __dirname + '/public/feature/projects/' + `${path}.html`;
        const content = fs.readFileSync(built, 'utf8').split('body')[1];
        const final = content.substring(1, content.length -2);
        io.to(socket.id).emit('server-sent-data-text', final);
    });
    socket.on('request-to-save-text', function(path, data, liveCoding){
        const file = __dirname + `/public/feature/projects/${path}.html`;
        const template = fs.readFileSync(__dirname+ '/public/feature/templates/page-template.html', 'utf8').split('<body>');
        template.splice(1, 0, '<body>'+ data.trim());
        const result = template.join('').trim();
        fs.writeFileSync(file, result);
        console.log('broadcast save');
        if (liveCoding) {
            io.emit('file-updated', 'hello friends!');
        }
    });
});


function removePath(path) {
    return function removeMiddleWares(route, i, routes) {
        if (route.handle.name.indexOf('.html') > -1) {
            console.log( 'route.handle.name:', route.handle.name );
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
    console.log('userConfigs', userConfigs);
    console.log(username, password);

    if (userConfigs.includes(username)) {
        console.log('user already exists!');
        socket.emit('error-message', 'User already exists!');
    } else {
        console.log('create a user config');
        if (password.length < 2) {
            console.log('failed because of password');
            socket.emit('error-message', 'Your password has to be at least 3 characters long');
        }
        const data = JSON.stringify({username, password: Buffer.from(username + password).toString('base64')});
        const file = __dirname + `/public/users/${username}.json`;
        fs.writeFileSync(file, data);
        io.to(socket.id).emit('server-sent-login', username);
    }
}

function clientWouldLikeToLogin(socket, username, password) {
    const userConfigs = fs.readdirSync(__dirname + '/public/users')
        .filter( user => user.includes('.json') )
        .map( user => user.substring(0, user.indexOf('.json')) );
    console.log('userConfigs', userConfigs);
    console.log(username, password);

    if (userConfigs.includes(username)) {
        console.log('get user config');
        const path = __dirname + '/public/users/' + `${username}.json`;
        const user = JSON.parse(fs.readFileSync(path, 'utf8') );
        console.log(user);

        if (user.password === Buffer.from(username + password).toString('base64')) {
            console.log('we have a match');
            io.to(socket.id).emit('server-sent-login', username);
        } else {
            console.log('can not verify your password');
            socket.emit('error-message', 'Can not verify your password');
        }
    } else {
        console.log('user does not exists!');
        socket.emit('error-message', `Can not find an account for ${username}. Sign up.`);
    }
}

function requestServerForPages(socket, path) {
    const root = __dirname + '/public/' + 'feature/projects/';
    console.log('path');
    const testPages = fs.readdirSync(root + path).filter( page => page.includes('.html') );
    testPages.forEach( page => {
        if (pages.indexOf(page) < 0) {
            pages.push(page);
            createRoute(page, root + `${path}/${page}` )
        }
    });

    pages.forEach( page => {
        if (testPages.indexOf(page) < 0) {
            console.log('a route is gone!!', page);
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
    console.log('request for folders from ', path);
    const fullPath = __dirname + '/public/feature/projects/' + path;
    const folders = fs.readdirSync(fullPath).filter( item => fs.lstatSync(fullPath + `/${item}`).isDirectory() );
    console.log('found', folders);
    io.to(socket.id).emit('server-sent-data-folders', folders);
}


function createRoute( name, path) {
    console.log('name', name, 'path', path);
    console.log('new route', name);

    const myFunction = function(req, res){
        res.sendFile(path);
    };
    Object.defineProperty(myFunction, 'name', {value: name, writable: false});
    app.get(`/${name.substring(0, name.indexOf('.html'))}`, myFunction);
}