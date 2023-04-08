import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	newProductReducer,
	newReviewReducer,
	productDetailsReducer,
	productReducer,
	productReviewsReducer,
	productsReducer,
	reviewReducer,
	ToggleReducer,
} from "./reducers/productReducer";
import {
	userReducer,
	profileReducer,
	forgotPasswordReducer,
	allUsersReducer,
	userDetailsReducer,
	verifyEmailReducer,
} from "./reducers/userReducer";
import {
	allRestaurantReducer,
	profileResReducer,
	restaurantReducer,
} from "./reducers/restaurantReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
	allOrdersReducer,
	myOrdersReducer,
	newOrderReducer,
	orderDetailsReducer,
	orderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
	products: productsReducer,
	productDetails: productDetailsReducer,
	view: ToggleReducer,
	user: userReducer,
	profile: profileReducer,
	restaurant: restaurantReducer,
	forgotPassword: forgotPasswordReducer,

	cart: cartReducer,
	newOrder: newOrderReducer,
	myOrders: myOrdersReducer,
	orderDetails: orderDetailsReducer,
	newReview: newReviewReducer,
	newProduct: newProductReducer,
	product: productReducer,
	allOrders: allOrdersReducer,
	order: orderReducer,
	allUsers: allUsersReducer,
	userDetails: userDetailsReducer,
	productReviews: productReviewsReducer,
	review: reviewReducer,
	allRestaurants: allRestaurantReducer,
	profileRes: profileResReducer,
});

let initialState = {
	cart: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems"))
			: [],
		shippingInfo: localStorage.getItem("shippingInfo")
			? JSON.parse(localStorage.getItem("shippingInfo"))
			: {},
	},
};

const midddleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...midddleware))
);

export default store;
