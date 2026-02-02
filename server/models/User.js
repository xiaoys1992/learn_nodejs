const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*const {Schema}= mongoose; this is the same as the line above*/

const userSchema = new Schema({
    googleId: String



});

mongoose.model('users', userSchema);
