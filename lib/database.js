var mongoose = require('mongoose');
mongoose.set('debug', true);
module.exports = function (config) {
    var connect = function(){
        mongoose.connect(config.uri, config.opts);
    };
    connect();

    mongoose.connection.on("error", function (err) {
        console.log('Error connecting to mongoose: ' + err);
    });

    mongoose.connection.on("disconnected", connect);

    mongoose.connection.once("open", function () {
        console.log("Mongoose connection established to " + config.uri);
    });
};