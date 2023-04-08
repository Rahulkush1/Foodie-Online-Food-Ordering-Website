const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const restaurant = new Schema({
	name: {
		type: String,
		required: true,
	},

	pincode: {
		type: String,
	},
	email: {
		type: String,
		required: [true, "Please Enter Your Email"],
		unique: true,
		// validate: [validator.isEmail, "Please Enter valid Email"],
	},

	address: {
		type: String,
	},
	phone: {
		type: String,
	},
	
	images: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},

	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
	createdAT: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Restaurant", restaurant);
