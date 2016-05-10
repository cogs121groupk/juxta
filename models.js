var Mongoose = require('mongoose');

var UserSchema = new Mongoose.Schema({
    "linkedinID": String,
    "token": String
});

exports.User = Mongoose.model('User', UserSchema);