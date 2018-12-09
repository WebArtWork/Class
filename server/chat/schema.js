var mongoose = require('mongoose');
var Schema = mongoose.Schema({
	name: String,
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	url: {type: String, unique: true, sparse: true, trim: true},
	avatarUrl: {type: String, default: '/api/chat/default.png'},
	description: String
});

Schema.methods.create = function(obj, user, sd) {
	this.author = user._id;
	this.members = [user._id];
	this.name = obj.name;
	this.avatarUrl = obj.avatarUrl;
	this.description = obj.description;
}

module.exports = mongoose.model('Chat', Schema);
