const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error";

	//Wrong MongoDB ID error

	if (err.name == "CastError") {
		const message = `Resource not Found invalid : ${err.path}`;
		err = new ErrorHandler(message, 400);
	}

	//Mongoose Duplicate error

	if (err.code == 11000) {
		const message = `duplicate ${Object.keys(err.keyValue)} Entered`;
		err = new ErrorHandler(message, 400);
	}
	//Wrong JWT Token error

	if (err.name === "JsonWebTokenError") {
		const message = `Json Web Token is invalid, Try again`;
		err = ErrorHandler(message, 400);
	}
	//JWT EXpire Error

	if (err.name === "TokenExpiredError") {
		const message = `Json Web Token is Expired, Try again`;
		err = ErrorHandler(message, 400);
	}

	res.status(err.statusCode).json({
		success: false,
		message: err.message,
	});
};
