var ascoltatori = require('ascoltatori');

module.exports = function(config){
    ascoltatori.build(config, function (err, ascoltatore) {
        if(err) {
            console.log('Error connecting to ascoltatori: '+err);
        }else{
            console.log("Ascoltatori connection established successfully");
            
            ascoltatore.subscribe('link', function() {
                console.log(arguments);
            });
        }
    });
};