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
app.get('/editor', function catchRoute(req, res){
    console.log('you came home');
    res.sendFile(__dirname + "/public/feature/editor/editor.html");
});
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
        const userConfigs = fs.readdirSync(__dirname + '/public/users')
            .filter( user => user.includes('.json') )
            .map( user => user.substring(0, user.indexOf('.json')) );
        console.log('userConfigs', userConfigs);
        console.log(username, password);

        if (userConfigs.includes(username)) {
            console.log('user already exists!')
        } else {
            console.log('create a user config');
            if (password.length < 2) {
                console.log('failed because of password')
            }
            const data = JSON.stringify({username, password: Buffer.from(username + password).toString('base64')});
            const file = __dirname + `/public/users/${username}.json`;
            fs.writeFileSync(file, data)
        }
    });

    socket.on('client-would-like-to-login', function ({username, password}) {
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
            } else {
                console.log('can not verify your password');
            }
        } else {
            console.log('user does not exists!');
        }
    });




    socket.on( 'request-server-for-redirect', function (page) {
        console.log(`client requested a redirect to ${page}`);
        io.to(socket.id).emit('client-should-redirect', page);
    });

    socket.on('request-server-for-pages', function () {
        const testPages = fs.readdirSync(__dirname + '/public/pages').filter( page => page.includes('.html') );
        testPages.forEach( page => {
           if (pages.indexOf(page) < 0) {
               console.log('new route', page);
               pages.push(page);
               const myFunction = function(req, res){
                   res.sendFile(__dirname + `/public/pages/${page}`);
               };
               Object.defineProperty(myFunction, 'name', {value: page, writable: false});
               app.get(`/${page.substring(0, page.indexOf('.html'))}`, myFunction);
               removePath('catchRoute');
               addCatchRoute();
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
        io.to(socket.id).emit('server-sent-data-pages', pages);
    })
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



