var Mongoose = require('mongoose');

var UserSchema = new Mongoose.Schema({
    "linkedinID": String,
    "token": String,
    "firstName": String,
    "lastName": String,
    "industry": String,
    "pictureUrl": String
});

exports.User = Mongoose.model('User', UserSchema);