// Require Dependencies
require('dotenv').config();

var express = require('express');
var grNode = require('goodreads-api-node');

var db = require('./app/models');

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '/app/public'));
// app.use(express.static('public'));

// API
const keys = require('./app/config/keys');
const gr = new grNode(keys.goodreads);

// Routes
require('./app/routes/apiRoutes')(app);
require('./app/routes/htmlRoutes')(app);
require('./app/routes/userRoutes')(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
	syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
	app.listen(PORT, function() {
		console.log(
			'==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
			PORT,
			PORT
		);
	});
});

module.exports = app;

//gr.getBooksByAuthor('175417').then(console.log);