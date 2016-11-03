var express = require('express'),
    redis = require('redis');

var app = express();

var queueConfig = {
    type: 'redis',
    redis: redis,
    host: process.env.REDIS_URI || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASS || null,
    db: process.env.REDIS_DB || 12,
    return_buffers: true // to handle binary payloads
};

var dbConfig = {
    uri: process.env.MONGODB_URI || '',
    opts: {}
};

require('./lib/queue')(queueConfig);
require('./lib/database')(dbConfig);

app.use('/public', express.static(path.join(__dirname, '/public')));


app.get('/', function(req, res) {
    res.status(200).send("Let's start from here");
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('pushthat running on port ' + port + '.');
});