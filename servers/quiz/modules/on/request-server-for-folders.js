const fs = require('fs');
module.exports = function requestServerForFolders({io, socket, rootDir}) {
    socket.on('request-server-for-folders', function(path){
        const fullPath = rootDir + '/public/feature/projects/' + path;
        const folders = fs.readdirSync(fullPath).filter( item => fs.lstatSync(fullPath + `/${item}`).isDirectory() );
        io.to(socket.id).emit('server-sent-data-folders', folders);
    });
};