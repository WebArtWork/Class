var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var schema = mongoose.Schema({
	email: {type: String, unique: true, sparse: true, trim: true},
	reg_email: {type: String, unique: true, sparse: true, trim: true},
	is: {},
	kind: {},
	password: {type: String},
	avatarUrl: {type: String, default: '/api/user/default.png'},
	gender: {type: String, enums: ['male', 'female'], sparse: true},
	name: {type: String},
	age: {type: Number},
	data: {}, 

});
schema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
schema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};
schema.methods.create = function(obj, user, sd) {
	this.name = obj.name;
	this.email = obj.email;
	this.fake = true;
	if(obj.avatarUrl.length > 100) {
		this.avatarUrl = '/api/user/avatar/' + this._id + '.jpg?' + Date.now();
		sd._dataUrlToLocation(obj.avatarUrl, __dirname + '/files/', this._id + '.jpg');
	}
};

module.exports = mongoose.model('User', schema);