const fs = require('fs');
const sendUsers = require('../emit/send-users');
module.exports = function ({io, socket, rootDir, users, tokens}) {
    socket.on('client-would-like-to-login', function({username, password}) {
        const userConfigs = fs.readdirSync(rootDir + '/public/users')
            .filter( user => user.includes('.json') )
            .map( user => user.substring(0, user.indexOf('.json')) );
        if (userConfigs.includes(username)) {
            const path = rootDir + '/public/users/' + `${username}.json`;
            const user = JSON.parse(fs.readFileSync(path, 'utf8') );
            user.token = user.password;
            user.socketID = socket.id;
            if (user.password === Buffer.from(username + password).toString('base64')) {
                saveLogin({user, socket});
            } else if(user.password === password) {
                saveLogin({user, socket, io, users, tokens});
            } else {
                socket.emit('error-message', 'Can not verify your password');
            }
        } else {
            socket.emit('error-message', `Can not find an account for ${username}. Sign up.`);
        }
    });

};

function saveLogin({user, socket, io, users, tokens}) {
    io.to(user.socketID).emit('server-sent-login', {username: user.username, token: user.token});
    users[user.username] = {token: user.token, socketID: user.socketID};
    tokens[user.token] = {username: user.username, socketID: user.socketID};
    socket.username = user.username;
    sendUsers({io, users});
}