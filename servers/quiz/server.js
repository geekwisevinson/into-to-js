"use strict";
/*global __dirname*/
// listeners
const onRequestToSignUp = require('./modules/on/request-to-sign-up');
const onRequestToLogIn = require('./modules/on/request-to-log-in');
const onRequestServerForPages = require('./modules/on/request-server-for-pages');
const onRequestFolders = require('./modules/on/request-server-for-folders');
const onRequestServerAddProject = require('./modules/on/request-server-add-project');
const onRequestTextFromFile = require('./modules/on/request-text-from-file');
const onRequestToSaveText = require('./modules/on/request-to-save-text');
const onSendMessage = require('./modules/on/send-message');
// emitters
const sendUsers = require('./modules/emit/send-users');
// app routes
const routesLoadAll = require('./modules/routes/load-all');
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
app.use ( cors () );
const rootDir = __dirname;
app.use(express.static(rootDir + '/public'));
http.listen ( port, function () {
    console.log ( 'listening on', port );
});
// users
const users = {};
const tokens = {};
routesLoadAll({app, rootDir});
// Socket messages
setInterval( () => {
    sendUsers({io, users});
}, 10000);
io.on ( 'connection', function (socket) {
    const userConfigs = fs.readdirSync(__dirname + '/public/users')
        .map( user => user.substring(0, user.indexOf('.json')));
    userConfigs.forEach( user => {
        if (!users[user]) {
            users[user] = '';
        }
    });
    sendUsers({io, users, rootDir});
    onRequestToSignUp({io, socket, rootDir});
    onRequestToLogIn({io, socket, rootDir, users, tokens});
    onRequestServerForPages({io, socket, rootDir});
    onRequestFolders({io, socket, rootDir});
    onRequestServerAddProject({io, socket, rootDir});
    onRequestTextFromFile({io, socket, rootDir});
    onRequestToSaveText({io, socket, rootDir});
    onSendMessage({io, socket, rootDir, users});
    socket.on( 'request-server-for-redirect', function (page) {
        io.to(socket.id).emit('client-should-redirect', page);
    });
    socket.on( 'request-server-for-redirect-all', function (page) {
        console.log(`client requested all redirect to ${page}`);
        io.emit('client-should-redirect', page);
    });
    socket.on('client-show-cursor', function(type, cursor, username) {
        io.emit('server-show-cursor', type, cursor, username);
    });
    socket.on('client-location', function(location) {
        if (socket.username && location) {
            users[socket.username].location = location;
        }
    });
    socket.on('request-server-add-page', function (path) {
        const file = __dirname + `/public/feature/projects/${path}.html`;
        fs.writeFileSync(file, '');
    });
    socket.on('disconnect', function() {
        if (socket.username) {
            users[socket.username] = '';
        }
    });
});
