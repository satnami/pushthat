var link = require('../model/links');

module.exports = function(app, ascoltatori){
    app.get('/', function (req, res) {
        ascoltatori.then(function (ascoltatore) {
            ascoltatore.publish('link', {url: "https://www.infoq.com/presentations/azure-service-fabric?utm_source=infoqWeeklyNewsletter&utm_medium=WeeklyNL_EditorialContent_architecture-design&utm_campaign=10252016news"}, function () {
                console.log('message published');
            });
        });
        res.status(200).send("Let's start from here");
    });

    app.get('/:id', function(req, res){
        link.findLink({id: req.params.id}, function (err, links) {
            if(err) res.status(500).send(err);
            else {
                // res.send(links.html);
                var img = new Buffer(links.html, 'base64').toString('binary');

                res.writeHead(200, {
                    'Content-Type': 'image/png',
                    'Content-Length': img.length
                });
                res.end(img);
            }
        })
    });
};