var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var workSchema = new mongoose.Schema({

	title: String,
	name: String,
	description: String
});

mongoose.model('Works',workSchema);
