var request = require('request');
var webshot = require('webshot');
var fs      = require('fs');

var noop = function(){};

module.exports = function(url, cb) {
    cb = cb || noop;

    var renderStream = webshot(url);
    var file = fs.createWriteStream('.png', {encoding: 'binary'});
    renderStream.on('data', function(data) {
        file.write(data.toString('binary'), 'binary');
        cb(null, new Buffer(data.toString('binary'), 'binary').toString('base64'))
    });
    // request(url, function (error, response, body) {
    //     if (!error && response.statusCode == 200)
    //         cb(null, body);
    //     else
    //         cb('err');
    // })
};