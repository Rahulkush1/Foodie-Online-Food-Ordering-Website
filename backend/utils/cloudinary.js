const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const ErrorHandler = require("./errorHandler");

exports.uploadOnCludinary = async (localPath) => {
  try {
    if (!localPath) {
      console.log("No local path specified");
      return null;
    }
    const response = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });
    console.log("file uploaded successfully", response.url);
    fs.unlinkSync(localPath);
    return response;
  } catch (error) {
    fs.unlinkSync(localPath);
    return null;
  }
};

exports.deleteFilesFromCloudinary = async (public_id) => {
  try {
    if (!public_id) {
      return next(new ErrorHandler("Image not Found", 403));
    }
    const response = await cloudinary.uploader.destroy(public_id);
    console.log("file deleted successfully", response);
    return response;
  } catch (error) {
    return next(
      new ErrorHandler("Somthing went wrong when deleting files", 403)
    );
  }
};
