var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MsgSchema = new Schema({ 
	from: String,
	to: String,
	date: { 
		type: Date,
		default:Date.now
	},
	msg: String
});

module.exports = mongoose.model('Msg', MsgSchema);