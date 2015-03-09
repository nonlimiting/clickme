var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({ 
	account: String,
	pwd: String,
	info: { 
		nickname: String,
		sex: Number,
		intro: String
	}
});

module.exports = mongoose.model('User', UserSchema);
