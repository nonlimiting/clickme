var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({ 
	account: String,
	pwd: String,
	avatar: { 
		type: String,
		default: '/img/avatar.jpg'
	},
	info: { 
		nickname: String,
		sex: Number,
		intro: String
	},
	friends: [String]
});

module.exports = mongoose.model('User', UserSchema);
