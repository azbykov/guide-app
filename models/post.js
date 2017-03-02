var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = require('./user').scheme;

var PostSchema = new Schema({
	created: {type:Date, default:Date.now},
	title: String,
	snippet: String,
	text: String,
	tags: Array,
	author: {type: ObjectId, ref: userSchema}
});

var Post = mongoose.model('post', PostSchema);

module.exports = {
	model: Post,
	scheme: PostSchema
};
