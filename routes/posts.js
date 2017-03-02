var express = require('express');
var router = express.Router();
var posts = require('./pages/posts');
/* GET Posts page. */
router.get('/', function (req, res) {
});

router.get('/new', function (req, res) {
	return posts.new.run(req, res);
});

router.post('/', function (req, res) {
	return posts.create.run(req, res);
});

router.get('/signup', function (req, res) {
});

module.exports = router;
