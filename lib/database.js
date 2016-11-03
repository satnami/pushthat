var mongoose = require('mongoose');

module.exports = function(config){
    var connection  = mongoose.createConnection(config.uri, config.opts);
    connection.on("error", function (err) {
        console.log('Error connecting to mongoose: '+err);
    });
    connection.once("open", function () {
        console.log("Mongoose connection established to " + config.uri);
    })
};