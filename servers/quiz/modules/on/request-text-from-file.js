const fs = require ( 'fs' );
module.exports = function ({io, socket, rootDir}) {
    socket.on('request-text-from-file', function(path, payload){
        console.log('request for file', path );
        const built = rootDir + '/public/feature/projects/' + `${path}.html`;
        debugger;
        if (!fs.existsSync(built)) {
            console.log(built, 'does not exist');
            return;
        }
        const content = fs.readFileSync(built, 'utf8');
        let js = '';
        const links = dom.window.document.getElementsByTagName('script');
        Array.from(links).forEach( link => {
            dom.window.document.getElementsByTagName('html')[0].appendChild(link);
        });
        const scripts = dom.window.document.getElementsByTagName('script');
        Array.from(scripts).forEach( script => {
            const dom = new JSDOM(content);
            if (script.src) {
            } else {
                js += script.innerHTML;
            }
            script.remove();
        });
        const rx = new RegExp("<script[\\d\\D]*?\/script>", "g");
        const html = content.includes('<body>') ? content.substring(content.indexOf('<body>') + 6, content.indexOf('</body>')).replace(rx, '') : '';
        io.to(socket.id).emit('server-sent-data-text', {html, js, file: path, payload});
    });
};