const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const cloudinary = require("cloudinary").v2;

//Register a User

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	const myCloud = await cloudinary.uploader.upload(
		req.body.avatar,

		{
			folder: "profilepics",
			width: 150,
			crop: "scale",
		}
	);

	const { name, email, password, avatar, phone } = req.body;

	const role = "user";

	const user = await User.create({
		name,
		email,
		password,
		phone,
		role,

		avatar: {
			public_id: myCloud.public_id,
			url: myCloud.secure_url,
			// public_id: "demo id",
			// url: "demo url",
		},
	});

	sendToken(user, 201, res);
});

//lOGIN usER
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;

	//checking if user has given password and email both

	if (!email || !password) {
		return next(new ErrorHandler("Please Enter Email & Password", 400));
	}
	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		return next(new ErrorHandler("Invalid email or Password", 401));
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHandler("Invalid email or Password", 401));
	}

	sendToken(user, 200, res);
});

//Logout User

exports.logout = catchAsyncErrors(async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});
	res.status(200).json({
		success: true,
		message: "Logged Out",
	});
});

//FOrget Password

exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new ErrorHandler("User not Found", 404));
	}

	//Get ResetPassword Token
	const resetToken = user.getResetPasswordToken();
	console.log(resetToken);

	await user.save({ validateBeforeSave: false });
	// console.log(process.env.FRONTEND_URL);

	const resetPasswordUrl = `${req.protocol}://${req.get(
		"host"
	)}/password/reset/${resetToken}`;

	const message = `Your Password Reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

	try {
		await sendEmail({
			email: user.email,
			subject: `foodie Password Recovery`,
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to ${user.email} successfully`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });
		return next(new ErrorHandler(error.message, 500));
	}
});
//Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
	// creating token hash
	// console.log(`token is ${req.params.token}`);
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");
	// console.log(`reset : ${resetPasswordToken}`);
	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHandler(
				"Reset Password Token is invalid or has been expired",
				400
			)
		);
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler("Password does not password", 400));
	}

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendToken(user, 200, res);
});

//Get User Detail

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	res.status(200).json({
		success: true,
		user,
	});
});

//Update User Password

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id).select("+password");
	res.status(200).json({
		success: true,
		user,
	});

	const isPasswordMatched = user.comparePassword(req.body.oldPassword);

	if (!isPasswordMatched) {
		return next(new ErrorHandler("Old Password is incorrect ", 400));
	}

	if (req.body.newPassword !== req.body.confirmPassword) {
		return next(new ErrorHandler(" Password does not Matched ", 400));
	}

	user.password = req.body.newPassword;
	await user.save();
	sendToken(user, 200, res);
});

//Update User Profile

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
	};
	console.log(req.user.id);

	if (req.body.avatar) {
		const user = await User.findById(req.user.id);
		const imageId = user.avatar.public_id;
		await cloudinary.uploader.destroy(imageId);
		const myCloud = await cloudinary.uploader.upload(
			req.body.avatar,

			{
				folder: "avatars",
				width: 150,
				crop: "scale",
			}
		);
		newUserData.avatar = {
			public_id: myCloud.public_id,
			url: myCloud.secure_url,
		};
	}

	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({
		success: true,
	});
});

//Get All User(Admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		success: true,
		users,
	});
});

//Get Single user(Admin)

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(
			new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
		);
	}
	res.status(200).json({
		success: true,
		user,
	});
});

//Update User Role -- Admin

exports.updateRole = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
	};

	const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({
		success: true,
	});
});

//Delete User -- Admin

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHandler(`User does not exist with id : ${req.params.id}`)
		);
	}
	console.log(user.avatar);
	const imageId = user.avatar.public_id;
	await cloudinary.uploader.destroy(imageId);

	await user.deleteOne();

	res.status(200).json({
		success: true,
		message: "User Deleted Successfuly",
	});
});

exports.sendEmailKey = catchAsyncErrors(async (req, res, next) => {
	res.status(200).json({ emailKey: process.env.EMAIL_VERIFICATION_KEY });
});
