const express = require('express')
    , http = require('http');

var app = module.exports = express();
var server = http.createServer(app);
var port = process.env.port || 3000;
app.use(express.static(__dirname + '/public'));

server.listen( port, function() {
    console.log('Server listening on port ' + port + '!');
});

app.get("/", function(req, res) {
    res.render("index.html");
});