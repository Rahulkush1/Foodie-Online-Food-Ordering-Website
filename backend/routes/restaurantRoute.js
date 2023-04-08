const express = require("express");
const {
	updateRestaurant,
	deleteRestaurant,
	getRestaurantDetails,
	registerRestaurant,
	getAllRestaurant,
	getSingleRestaurant,
} = require("../controllers/restaurantController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router
	.route("/restaurant/register")
	.post(isAuthenticatedUser, authorizeRoles("restaurant"), registerRestaurant);
router.route("/restaurant/me").get(isAuthenticatedUser, getRestaurantDetails);

// router.route("/me/update").put(isAuthenticatedUser, updateRestaurant);
router
	.route("/admin/restaurants")
	.get(isAuthenticatedUser, authorizeRoles("admin"), getAllRestaurant);
router
	.route("/admin/restaurant/:id")
	.get(isAuthenticatedUser, authorizeRoles("admin"), getSingleRestaurant)

	.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteRestaurant);

module.exports = router;
