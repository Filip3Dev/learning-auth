'use strict';

const mongoose = require('mongoose'),
			bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	local: {
		email: String,
		password: String,
  },

	facebook: {
		id: String,
    token: String,
    email: String,
		name: String
	},

	twitter: {
		id: String,
    token: String,
    displayName: String,
    username: String
	}
});

// gera o hash
UserSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checa se o password eh valido
UserSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);