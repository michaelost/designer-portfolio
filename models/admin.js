var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var amdinSchema = new Schema({
	login: String,
	password: String
});

mongoose.model('Admin',amdinSchema);