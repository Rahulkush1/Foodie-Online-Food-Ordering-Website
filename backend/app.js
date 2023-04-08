const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const dotenv = require("dotenv");
// const cloudinary = require("cloudinary").v2;

const errorsMiddleware = require("./middleware/error");
dotenv.config({ path: "config/config.env" });

// app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

// app.use(cloudinary());

//Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const restaurant = require("./routes/restaurantRoute");
const payment = require("./routes/paymentRoute");

const order = require("./routes/orderRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", restaurant);
app.use("/api/v1", payment);

app.use("/api/v1", order);

// Middleware for Errors
app.use(errorsMiddleware);

module.exports = app;
