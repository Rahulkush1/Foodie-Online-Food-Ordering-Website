const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Restaurant = require("../models/restaurantModel");

const cloudinary = require("cloudinary").v2;

//Register a Restaurant

exports.registerRestaurant = catchAsyncErrors(async (req, res, next) => {
	const myCloud = await cloudinary.uploader.upload(
		req.body.images,

		{
			folder: "restaurant",
		}
	);

	const { name, email, phone, address, images, pincode } = req.body;

	// const restaurant = await Restaurant.create({
	// 	name,
	// 	email,
	// 	phone,
	// 	address,
	// 	images,
	// 	pincode,
	// 	rating,
	// });

	// res.status(200).json({
	// 	success: true,
	// 	restaurant,
	// });

	userId = req.user.id;

	console.log(req.user.id);
	const restaurant = await Restaurant.create({
		name,
		email,
		phone,
		address,
		images,
		pincode,
		images: {
			public_id: myCloud.public_id,
			url: myCloud.secure_url,
		},
		user: userId,
	});
	res.status(201).json({
		success: true,
		restaurant,
	});
});

//Get Restaurant Detail

exports.getRestaurantDetails = catchAsyncErrors(async (req, res, next) => {
	const restaurant = await Restaurant.findOne({ user: `${req.user.id}` });
	res.status(200).json({
		success: true,
		restaurant,
	});
});

//Update Restaurant Profile

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
	const newRestaurantData = {
		name: req.body.name,
		email: req.body.email,
	};
	console.log(req.Restaurant.id);

	if (req.body.avatar) {
		const restaurant = await Restaurant.findById(req.restaurant.id);
		const imageId = restaurant.avatar.public_id;
		await cloudinary.uploader.destroy(imageId);
		const myCloud = await cloudinary.uploader.upload(
			req.body.avatar,

			{
				folder: "avatars",
				width: 150,
				crop: "scale",
			}
		);
		newRestaurantData.avatar = {
			public_id: myCloud.public_id,
			url: myCloud.secure_url,
		};
	}

	const restaurant = await Restaurant.findByIdAndUpdate(
		req.restaurant.id,
		newRestaurantData,
		{
			new: true,
			runValidators: true,
			useFindAndModify: false,
		}
	);
	res.status(200).json({
		success: true,
	});
});

//Get All Restaurant(Admin)
exports.getAllRestaurant = catchAsyncErrors(async (req, res, next) => {
	const restaurants = await Restaurant.find();

	res.status(200).json({
		success: true,
		restaurants,
	});
});

//Get Single Restaurant(Admin)

exports.getSingleRestaurant = catchAsyncErrors(async (req, res, next) => {
	const restaurant = await Restaurant.findById(req.params.id);
	if (!restaurant) {
		return next(
			new ErrorHandler(`Restaurant does not exist with Id: ${req.params.id}`)
		);
	}
	res.status(200).json({
		success: true,
		restaurant,
	});
});

//Delete Restaurant -- Admin

exports.deleteRestaurant = catchAsyncErrors(async (req, res, next) => {
	const restaurant = await Restaurant.findById(req.params.id);
	
	if (!restaurant) {
		return next(
			new ErrorHandler(`Restaurant does not exist with id : ${req.params.id}`)
		);
	}
	console.log(restaurant.avatar);
	const imageId = restaurant.images.public_id;
	await cloudinary.uploader.destroy(imageId);

	await restaurant.deleteOne();

	res.status(200).json({
		success: true,
		message: "Restaurant Deleted Successfuly",
	});
});
