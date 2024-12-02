const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { sendAttachmentMulter } = require("../middleware/multer");
const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
  .route("/restaurant/products")
  .get(isAuthenticatedUser, authorizeRoles("restaurant"), getAdminProducts);
router
  .route("/admin/product/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    sendAttachmentMulter,
    createProduct
  );
router
  .route("/restaurant/product/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("restaurant"),
    sendAttachmentMulter,
    createProduct
  );
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router
  .route("/restaurant/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("restaurant"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("restaurant"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
