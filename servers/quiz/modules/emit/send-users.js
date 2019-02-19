module.exports = function sendUsers({io, users}) {
    const keys = Object.keys(users);
    const userSockets = keys.map( key => ({ [key] : users[key].socketID ? users[key].socketID: ''}) );
    io.emit('users', userSockets);
};