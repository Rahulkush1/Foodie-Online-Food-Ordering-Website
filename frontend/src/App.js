import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import { Login } from "./components/User/Login";

import SignUp from "./components/User/SignUp";

import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import store from "./store";
import UserOption from "./components/Layout/Header/UserOption";
import { loadUser } from "./action/userAction";
import Product from "./components/Product/Product";
import ProductDetails from "./components/Product/ProductDetails";
import ProtectedRoute from "./components/Route/ProtectedRoute";

import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import WebFont from "webfontloader";
import Shipping from "./components/Cart/Shipping.jsx";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import DashBoardAdmin from "./components/Admin/DashBoard";
import ProductsListAdmin from "./components/Admin/ProductsList";
import NewProductAdmin from "./components/Admin/NewProduct";
import UpdateProductAdmin from "./components/Admin/UpdateProduct";
import OrderListAdmin from "./components/Admin/OrderList";
import ProcessOrderAdmin from "./components/Admin/ProcessOrder";
import UsersListAdmin from "./components/Admin/UsersList";
import UpdateUserAdmin from "./components/Admin/UpdateUser";
import ProductReviewsAdmin from "./components/Admin/ProductReviews";

import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import DashBoard from "./components/Restaurant/DashBoard";
import ProductsList from "./components/Restaurant/ProductsList";
import NewProduct from "./components/Restaurant/NewProduct";
import UpdateProduct from "./components/Restaurant/UpdateProduct";
import OrderList from "./components/Restaurant/OrderList";
import ProcessOrder from "./components/Restaurant/ProcessOrder";

import ProductReviews from "./components/Restaurant/ProductReviews";
// import NotFound from "./components/Layout/NotFound";
import RestaurantRagister from "./components/User/RestaurantRagister";
import { loadRestaurant } from "./action/restaurantAction";
import RestaurantProfile from "./components/User/RestaurantProfile";
import RestaurantList from "./components/Admin/RestaurantList";
import LoginSignUp from "./components/User/LoginSignUp";
import About from "./components/Layout/About/About";
import Contact from "./components/Layout/Contact/Contact";

function App() {
	const { isAuthenticated, user } = useSelector((state) => state.user);

	const [stripeApiKey, setStripeApiKey] = useState("");
	async function getStripeApiKey() {
		const { data } = await axios.get("/api/v1/stripeapikey");
		setStripeApiKey(data.stripeApiKey);
	}

	const stripePromise = loadStripe(stripeApiKey);

	useEffect(() => {
		WebFont.load({
			google: {
				families: ["Roboto", "Droid Sans", "Chilanka"],
			},
		});
		store.dispatch(loadUser());
		if (user.role === "restaurant") {
			store.dispatch(loadRestaurant());
		}

		getStripeApiKey();
	}, []);

	return (
		<div className="App">
			<Router>
				<Header />
				{isAuthenticated && <UserOption user={user} />}
				{stripeApiKey && (
					<Elements stripe={stripePromise}>
						<Routes>
							<Route
								path="/process/payment"
								element={
									<ProtectedRoute>
										<Payment />
									</ProtectedRoute>
								}
							/>
						</Routes>
					</Elements>
				)}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />

					<Route path="/register" element={<LoginSignUp />} />
					<Route path="/login" element={<LoginSignUp />} />
					<Route path="/items" element={<Product />} />
					<Route path="/item/:id" element={<ProductDetails />} />

					<Route
						exact
						path="/account"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/restaurant/profile"
						element={
							<ProtectedRoute>
								<RestaurantProfile />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/me/update"
						element={
							<ProtectedRoute>
								<UpdateProfile />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/password/update"
						element={
							<ProtectedRoute>
								<UpdatePassword />
							</ProtectedRoute>
						}
					/>
					<Route exact path="/password/forgot" element={<ForgotPassword />} />
					<Route
						exact
						path="/password/reset/:token"
						element={<ResetPassword />}
					/>
					<Route exact path="/cart" element={<Cart />} />
					<Route
						exact
						path="/login/shipping"
						element={
							<ProtectedRoute>
								<Shipping />
							</ProtectedRoute>
						}
					/>

					<Route
						exact
						path="/order/confirm"
						element={
							<ProtectedRoute>
								<ConfirmOrder />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/success"
						element={
							<ProtectedRoute>
								<OrderSuccess />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/orders"
						element={
							<ProtectedRoute>
								<MyOrders />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/order/:id"
						element={
							<ProtectedRoute>
								<OrderDetails />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/admin/dashboard"
						element={
							<ProtectedRoute isAdmin={true}>
								<DashBoardAdmin />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/admin/products"
						element={
							<ProtectedRoute isAdmin={true}>
								<ProductsListAdmin />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/admin/product"
						element={
							<ProtectedRoute isAdmin={true}>
								<NewProductAdmin />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/admin/product/:id"
						element={
							<ProtectedRoute isAdmin={true}>
								<UpdateProductAdmin />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/admin/orders"
						element={
							<ProtectedRoute isAdmin={true}>
								<OrderListAdmin />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/admin/order/:id"
						element={
							<ProtectedRoute isAdmin={true}>
								<ProcessOrderAdmin />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/admin/users"
						element={
							<ProtectedRoute isAdmin={true}>
								<UsersListAdmin />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/admin/user/:id"
						element={
							<ProtectedRoute isAdmin={true}>
								<UpdateUserAdmin />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/admin/reviews"
						element={
							<ProtectedRoute isAdmin={true}>
								<ProductReviewsAdmin />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/admin/restaurants"
						element={
							<ProtectedRoute isAdmin={true}>
								<RestaurantList />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/restaurant/register"
						element={
							<ProtectedRoute isAdmin={true}>
								<RestaurantRagister />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/restaurant/dashboard"
						element={
							<ProtectedRoute isAdmin={true}>
								<DashBoard />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/restaurant/products"
						element={
							<ProtectedRoute isAdmin={true}>
								<ProductsList />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/restaurant/product"
						element={
							<ProtectedRoute isAdmin={true}>
								<NewProduct />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/restaurant/product/:id"
						element={
							<ProtectedRoute isAdmin={true}>
								<UpdateProduct />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/restaurant/orders"
						element={
							<ProtectedRoute isAdmin={true}>
								<OrderList />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path="/restaurant/order/:id"
						element={
							<ProtectedRoute isAdmin={true}>
								<ProcessOrder />
							</ProtectedRoute>
						}
					/>

					<Route
						exact
						path="/restaurant/reviews"
						element={
							<ProtectedRoute isAdmin={true}>
								<ProductReviews />
							</ProtectedRoute>
						}
					/>
					{/* <Route path="*" element={<NotFound />} /> */}
				</Routes>
				<Footer />
			</Router>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</div>
	);
}

export default App;
