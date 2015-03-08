var mongoose = require('mongoos'),
	Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({ 
    account: String,
    pwd: String
});

module.exports = mongoose.model('User', UserSchema);