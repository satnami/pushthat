var ascoltatori = require('ascoltatori');

module.exports = function(config){
    ascoltatori.build(config, function (err, ascoltatore) {
        if(err) {
            console.log('Error connecting to ascoltatori: '+err);
        }else{
            ascoltatore.subscribe('link', function() {
                console.log(arguments);
            });
        }
    });
};