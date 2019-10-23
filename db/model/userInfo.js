const mongoose = require('mongoose');
const nameSchema = new mongoose.Schema({
	full: {
		type: String,
		trim: true,
		required: true,
		min: 2,
	},
	first: {
		type: String,
		trim: true,
		required: true,
		min: 2,
	},
	middle: {
		type: String,
		trim: true,
	},
	last: {
		type: String,
		trim: true,
	},
});
const addressSchema = new mongoose.Schema({
	personal: {
		type: String,
	},
	Office: {
		type: String,
	},
});

const userInfoSchma = new mongoose.Schema({
	name: {
		type: nameSchema,
	},
	dob: {
		type: Date,
		trim: true,
	},
	mobile: [{
		verified: {
			type: Boolean,
			default: false,
		},
		value: {
			type: String,
			required: true,
			trim: true,
		},
		code: {
			type: String,
			trim: true,
			default: '+91',
			max: 3,
		},
	}],
	email: [{
		verified: {
			type: Boolean,
			default: false,
		},
		value: {
			type: String,
			required: true,
			trim: true,
			min: 7,
		},
	}],
	aadharCard: {
		type: String,
		trim: true,
	},
	panId: {
		type: String,
		trim: true,
	},
	address: {
		type: addressSchema,
	},
	state: {
		type: String,
	},
	pincode: {
		type: String,
		required: true,
		min: 4,
		trim: true,
	},
	city: {
		type: String,
	},
	removed: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		immutable: true,
	},
}, {timestamps: true});

const UserInfo = mongoose.model('userinfo', userInfoSchma);
module.exports = UserInfo;
