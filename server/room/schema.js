var mongoose = require('mongoose');
var Schema = mongoose.Schema({
	name: String,
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	url: {type: String, unique: true, sparse: true, trim: true},
	avatarUrl: {type: String, default: '/api/room/avatar.png'},
	description: String,
	types: {
		type: String,
		enum: ['Education', 'Sport and fitness', 'Dance','Languages', 'Music', 'Trainings', 'Art', 'Games', 'Health and beauty', 'Cooking']
	}
});

Schema.methods.create = function(obj, user, sd) {
	this.author = user._id;
	this.members = [user._id];
	this.types = obj.types;
	this.name = obj.name;
	this.avatarUrl = obj.avatarUrl;
	this.description = obj.description;
}

module.exports = mongoose.model('Room', Schema);
