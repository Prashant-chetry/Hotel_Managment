const mongoose = require('mongoose');
const RoomSchema = new mongoose.Schema({
	roomNo: {
		type: Number,
		min: 1,
		trim: true,
	},
	floorNo: {
		type: Number,
		trim: true,
	},
	kitchen: {
		type: Number,
	},
	bedroom: {
		type: Number,
	},
	diningRoom: {
		type: Number,
	},
	bathrooom: {
		type: Number,
	},
	stay: {
		type: Number,
	},
});
const Rooms = mongoose.model('room', RoomSchema);
module.exports = Rooms;
