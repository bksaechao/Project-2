var path = require('path');
const { User } = require('../models');

module.exports = function (app) {
	// Load index page
	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, '../public/pages/index.html'));
	});

	app.get('/account/edit', function (req, res) {
		res.sendFile(path.join(__dirname, '../public/pages/profile-edit.html'));
	});

	app.get('/temp', function (req, res) {
		res.sendFile(path.join(__dirname, '../public/pages/temp.html'));
	});

	// Load example page and pass in an example by id
	app.get('/example/:id', function (req, res) {
		db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
		});
	});

	// Render 404 page for any unmatched routes
	// app.get('*', function (req, res) {
	// 	// res.render('404');
	// });
};
