const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  displayName: { type: String, default: 'New User' }, // preset list
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
