const fs = require ( 'fs' );
module.exports = function onRequestToSaveText ({io, socket, rootDir}) {
    socket.on('request-to-save-text', function(path, {html, js, username, updatedState, changed}, liveCoding){
        return;
        console.log('attempt', saves, username, {html, js, username, updatedState});
        const payload = arguments[1];
        let replacedHtml = html.replace('&lt;','<');
        replacedHtml = replacedHtml.replace('&gt;', '>');
        const file = rootDir + `/public/feature/projects/${path}.html`;
        // get template
        const template = fs.readFileSync(rootDir+ '/public/feature/templates/page-template.html', 'utf8');
        const dom = new JSDOM(template);
        const links = dom.window.document.getElementsByTagName('link');
        const inlineScript = dom.window.document.createElement('script');
        Array.from(links).forEach(link => {
            dom.window.document.documentElement.appendChild(link);
            link.remove();
        });
        const scripts = dom.window.document.getElementsByTagName('script');
        Array.from(scripts).forEach(script => {
            if (script.src) {
                dom.window.document.documentElement.appendChild(script);
            } else {
                inlineScript.innerHTML += script.innerHTML;
            }
        });
        inlineScript.innerHTML += js;
        dom.window.document.documentElement.appendChild(inlineScript);
        inlineScript.setAttribute('id', 'inline-js');
        dom.window.document.body.innerHTML = '';

        const beforeHtml = `<!doctype html>
<html lang="en">${dom.window.document.documentElement.innerHTML}</html>`;
        const result = beforeHtml.split('<body>').join(`<body>${replacedHtml}`);
        const oldValue = fs.readFileSync(file, 'utf8');
        if (oldValue === result) {return}
        fs.writeFileSync(file, result);
        saves++;
        console.log('saved', file, result);
        // console.log('users', Object.keys(io.sockets.sockets));
        if (true) {
            io.emit('file-updated', path, payload );
        }
    });
};
