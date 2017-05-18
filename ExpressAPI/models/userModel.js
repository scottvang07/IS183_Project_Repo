var mongoose = require('mongoose');

//console.log('mongoose', mongoose);
var userModel = new mongoose.Schema({ // must use mongoose.Schema syntax
    username: { type: String },
    password: { type: String },
    firstname: {type: String},
    lastname: {type: String}
});

var User = mongoose.model('User', userModel);
module.exports = User;