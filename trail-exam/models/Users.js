const mongoose = require('mongoose');
// kullanıcı scheması ekleme
const UserSchema = new mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    password: {type: String, required:true}
});

module.exports = mongoose.model('Users', UserSchema);