var mongoClient = require('mongodb').MongoClient;
var nconf = require('nconf');
nconf.argv()
    .env()
    .file({file: 'config.json'});
nconf.get('db:connection');
var db;
mongoClient.connect(nconf.get('db:connection'), function (err, client) {
    if (err) {
        console.error("ERR!");
    } else {
        module.exports.db = client;
    }
});