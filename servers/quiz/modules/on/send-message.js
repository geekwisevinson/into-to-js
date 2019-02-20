module.exports = function onSendMessages ({io, socket, users}) {
    socket.on('send-message', function ({username, message, sender}) {
        if (username && users[username]) {
            console.log('sender', sender);
            io.to(users[username].socketID).emit('server-sent-message', message, sender);
        }
    });
};
