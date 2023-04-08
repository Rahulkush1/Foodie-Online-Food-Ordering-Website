const express = require("express");
const {
	newOrder,
	getSingleOrder,
	myOrders,
	getAllOrders,
	updateOrder,
	deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router
	.route("/admin/order/:id")
	.put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
	.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

router
	.route("/restaurant/order/:id")
	.put(isAuthenticatedUser, authorizeRoles("restaurant"), updateOrder)
	.delete(isAuthenticatedUser, authorizeRoles("restaurant"), deleteOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
	.route("/admin/orders")
	.get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router
	.route("/restaurant/orders")
	.get(isAuthenticatedUser, authorizeRoles("restaurant"), getAllOrders);

module.exports = router;
