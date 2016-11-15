var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

var noop = function () {
};

var linkSchema = new Schema({
    url: {type: String},
    author: {type: String},
    html: {type: String},
    date: {type: Date, default: Date.now}
});

var Link = mongoose.model('link', linkSchema);

Link.findLink = function (opts, cb) {
    cb = cb || noop;

    var options = {};
    if (opts.id) options._id = opts.id;
    if (opts.url) options.url = opts.url;

    Link.findOne(options).exec(cb);
};

Link.findAll = function (cb) {
    cb = cb || noop;

    Link.find({}).lean().exec(cb);
};

Link.saveLink = function (linkObj, cb) {
    cb = cb || noop;
    var links = new Link(linkObj);
    links.save(cb);
};

module.exports = Link;