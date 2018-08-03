var express = require('express');
var dust = require('dustjs-linkedin');
var app = express();

app.use('/', express.static('htdocs'));

app.listen(undefined, function() {
	console.log('listen on http://localhost:3000');
});