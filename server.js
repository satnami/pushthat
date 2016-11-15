var express = require('express'),
    http = require('http'),
    html = require('./lib/html'),
    link = require('./model/links'),
    config = require('./config/index');

var port = config.port;
var app = express();

require('./lib/database')(config.dbConfig);

var ascoltatori = require('./lib/queue')(config.queueConfig).ascoltatori;
ascoltatori.then(function (ascoltatore) {
    ascoltatore.subscribe('*', function () {
        var queue = arguments['0'];
        var message = arguments['1'];
        switch (queue) {
            case 'link':
                if (message.url != null && message.url != "") {
                    html(message.url, function(err, htmlBody) {
                        if(!err) {
                            link.saveLink({url: message.url, html: htmlBody});
                        }
                    });
                }
                break;
            default:
                break;
        }
    });
});

require('./config/express')(app);
require('./lib/api')(app, ascoltatori);

var httpServer = http.createServer(app);

httpServer.listen(port, function () {
    console.log('pushthat running on port ' + port + '.');
});
