var Q = require('q'),
    ascoltatori = require('ascoltatori'),
    deferred = Q.defer();

module.exports = function(config) {
    ascoltatori.build(config, function (err, ascoltatore) {
        if (err) {
            console.log('Error connecting to ascoltatori: ' + err);
            deferred.reject(err);
        } else {
            console.log("Ascoltatori connection established successfully");
            deferred.resolve(ascoltatore);
        }
    });

    return {
        ascoltatori: deferred.promise
    }
};