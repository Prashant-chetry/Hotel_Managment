const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
	'email': {
		type: String,
		trim: true,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 6,
	},
	avatar: {
		type: String,
		trim: true,
	},
	createdAt: {
		type: Date,
		immutable: true,
	},
}, {timestamps: true});

UserSchema.pre('save', async function(next) {
	const user = this;
	if (user.isModified('password')) {
		try {
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt);
		}
		catch (err) {console.error(`Error password saving: ${err}`);} // eslint-disable-line no-console
	}
	next();
});
const Users = mongoose.model('user', UserSchema);
module.exports = Users;
