const app = require("./app");
const dotenv = require("dotenv");


const cloudinary = require("cloudinary").v2;
const connectDatabse = require("./config/database");

//Handle Uncaught Exception
process.on("uncaughtException", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to  Uncaught Exception`);
	process.exit(1);
});
const { path } = require("./app");
dotenv.config({ path: "config/config.env" });

connectDatabse();


cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});
// console.log(cloudinary.config());

const server = app.listen(process.env.PORT, () => {
	console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
	console.log(`Error : ${err.message}`);
	console.log(`Shutting down the server due to Unhandled Promise Rejection`);

	server.close(() => {
		process.exit(1);
	});
});
