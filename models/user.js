var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: {type : String},
	password: {type : String},
	email: {type : String},
	token: {type : String}
});

module.exports = mongoose.model('User',userSchema);