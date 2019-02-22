const fs = require('fs');
module.exports = function requestServerForPages({io, socket, rootDir}) {
    socket.on('request-server-for-pages', function(path){
        const root = rootDir + '/public/' + 'feature/projects/';
        const pages = fs.readdirSync(root + path).filter( page => page.includes('.html') );

        io.to(socket.id).emit('server-sent-data-pages', pages);
    });
};