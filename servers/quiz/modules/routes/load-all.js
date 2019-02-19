module.exports = function({app, rootDir}) {
    // Serve Files
    app.get('/', function catchRoute(req, res){
        console.log('you came home');
        res.sendFile( rootDir + "/public/entry/home.html");
    });
    app.get('/home', function catchRoute(req, res){
        console.log('you came home');
        res.sendFile(rootDir + "/public/entry/home.html");
    });
    app.get('/editor/:project/:file', function catchRoute(req, res){
        console.log('/projects/editor/:project/:file');
        res.sendFile(rootDir + "/public/feature/editor/editor.html");
    });

    app.get('/live/:project/:file', function catchRoute(req, res){
        console.log('/projects/live/:project/:file');
        const project = req.params.project;
        const file = req.params.file;
        console.log( {project, file}, req.params);
        res.sendFile(rootDir + `/public/feature/projects/${project}/${file}.html`);
    });
    app.get('/projects/:page', function catchRoute(req, res){
        console.log('/projects/:page');
        res.sendFile(rootDir + "/public/feature/pages/pages.html");
    });
    app.get('/projects', function catchRoute(req, res){
        res.sendFile(rootDir + "/public/feature/projects/projects.html");
    });
    addCatchRoute();
    function addCatchRoute() {
        app.get('/*', function catchRoute(req, res){
            console.log('could not find your route', req.url);
            res.sendFile(rootDir + "/public/entry/not-found.html");
        });
    }
};
