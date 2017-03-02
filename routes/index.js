var index = require('./pages/index');
var auth = require('./auth');
// var edit = require('./edit');
// var api = require('./routes/api');
var posts = require('./posts');

var Router = function (app) {
	// auth
	app.use('/auth', auth);
	// app.use('/api', api);

	app.use('/posts', posts);

	app.use('/', function (req, res) {
		index.run(req, res);
	});

	// app.use('/edit', edit);
};

module.exports = Router;
