const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/temp");
  },
  filename: function (req, file, cb) {
    console.log(`req: `, file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

exports.singleAvatar = upload.single("avatar");
exports.singleCoverImage = upload.single("coverImage");
exports.sendAttachmentMulter = upload.array("images", 4);
