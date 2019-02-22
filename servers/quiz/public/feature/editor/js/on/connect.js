socket.on('connect', () => {
    socket.emit('request-text-from-file', redirect.slice(redirect.length - 2).join('/'));
});