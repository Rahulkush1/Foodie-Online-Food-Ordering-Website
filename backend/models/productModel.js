const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please Enter product Name"],
	},
	description: {
		type: String,
		required: [true, "Please Enter product Descripton"],
	},
	price: {
		type: Number,
		required: [true, "Please Enter product Price"],
		maxLenth: [8, "Price cannot exceed 8 characters"],
	},
	ratings: {
		type: Number,
		default: 0,
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

	category: {
		type: String,
		required: [true, "Please Enter Product Category"],
	},
	Stock: {
		type: Number,
		required: [true, "Please Enter product Stock"],
		maxLenth: [4, "Stock cannot exceed 4 character"],
		default: 1,
	},
	numOfReviews: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			user: {
				type: mongoose.Schema.ObjectId,
				ref: "User",
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			rating: {
				type: Number,
				required: true,
			},
			comment: {
				type: String,
				required: true,
			},
		},
	],

	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
	restaurant: {
		type: mongoose.Schema.ObjectId,
		ref: "Restaurant",
	},
	restaurantName: {
		type: String,
	},

	createdAT: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Product", productSchema);
