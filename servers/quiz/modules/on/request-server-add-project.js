const fs = require('fs');
module.exports = function ({io, socket, rootDir}) {
    socket.on('request-server-add-project', function (path) {
        const folder = rootDir + `/public/feature/projects/${path}`;
        if (!fs.existsSync(folder)){
            fs.mkdirSync(folder);
        }
    });
};