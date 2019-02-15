const fs = require('fs');
module.exports = function({io, socket, rootDir}) {
    socket.on('client-would-like-to-sign-up', function ({username, password}) {
        const userConfigs = fs.readdirSync(rootDir + '/public/users')
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
            const file = rootDir + `/public/users/${username}.json`;
            fs.writeFileSync(file, data);
            io.to(socket.id).emit('server-sent-login', {username, token});
        }
    });
};