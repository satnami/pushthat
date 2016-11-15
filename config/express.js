var fs = require('fs'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    methodOverride = require('method-override'),
    serveStatic = require('serve-static'),
    path = require('path'),
    cors = require('cors'),
    swig = require('swig');

module.exports = function (app) {
    //Compress all requests
    app.use(compression());

    //BodyParser should be above MethodOverride
    //app.use(bodyParser.text());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(function (req, res, next) {
        res.set('X-Powered-By', 'PushThat');
        next();
    });

    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.use('/apps', serveStatic(path.resolve(__dirname + './../../views')));

    app.use(cors());
};