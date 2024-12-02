const Product = require("../models/productModel");
const Restaurant = require("../models/restaurantModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

//Create Product -- Admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  // req.body.restaurant = req.restaurant.id;
  // const restaurant = await Restaurant.findById(req.body.user);
  // console.log(req.body);
  //   const myCloud = await cloudinary.uploader.upload(
  //     req.body.images,

  //     {
  //       folder: "productImage",
  //     }
  //   );
  console.log(req.files);
  let imagesObject = [];
  const files = req.body.files || [];
  //   console.log(files.length	);
  if (files.length < 1) {
    return next(new ErrorHandler("Please provide attachments", 400));
  }
  for (let i = 0; i < files.length; i++) {
    // let localFilePath = req.files[i].path;
    // if (!localFilePath) {
    //   return next(new ErrorHandler("Please upload images", 400));
    // }
    //   const image = await uploadOnCludinary(localFilePath);
    // console.log(files[i]);
    const myCloud = await cloudinary.uploader.upload(
      files[i],

      {
        folder: "productImage",
      }
    );
    if (!myCloud) {
      return next(
        new ErrorHandler("Something went wrong while uploading", 400)
      );
    }
    imagesObject.push({
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    });
  }
  const images = imagesObject;
  req.body.images = images;

  if (req.user.role === "restaurant") {
    const restaurant = await Restaurant.findOne({ user: `${req.user.id}` });
    req.body.restaurant = restaurant._id;
    req.body.restaurantName = restaurant.name;
  }

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 6;
  const featureProduct = 3;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

//Get All Product(Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//Gety Product Details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
  // console.log(product)
});

//Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res) => {
  // console.log(req.body.images);
  console.log(req.body.images);

  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  if (req.body.images !== undefined && req.body.images !== "") {
    await cloudinary.uploader.destroy(product.images.public_id);
    const myCloud = await cloudinary.uploader.upload(
      req.body.images,

      {
        folder: "productImage",
      }
    );

    images = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
      // public_id: "demo id",
      // url: "demo url",
    };
    req.body.images = images;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  //Deleting product img from cloudinary
  await cloudinary.uploader.destroy(product.images.public_id);

  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

//Create New Review or Update The review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  // console.log(isReviewed);
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//Get All Reviews of a Product

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Review

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = avg / product.reviews.length;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
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
