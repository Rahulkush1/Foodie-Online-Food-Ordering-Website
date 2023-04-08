import React from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import Formatprice from "../../Helper/FormatPrice";
import { Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemFromCart } from "../../action/cartAction";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state) => state.cart);

	const increaseQuantity = (id, quantity, stock) => {
		const newQty = quantity + 1;
		if (stock <= quantity) {
			return;
		}
		dispatch(addItemsToCart(id, newQty));
	};

	const decreaseQuantity = (id, quantity) => {
		const newQty = quantity - 1;
		if (1 >= quantity) {
			return;
		}
		dispatch(addItemsToCart(id, newQty));
	};

	const deleteCartItems = (id) => {
		dispatch(removeItemFromCart(id));
	};

	const checkOutHandler = () => {
		navigate("/login?redirect=shipping");
	};
	return (
		<>
			{cartItems.length === 0 ? (
				<div className="emptyCart">
					<RemoveShoppingCartIcon />

					<Typography>No Product in Your Cart</Typography>
					<Link to="/items">View Items</Link>
				</div>
			) : (
				<>
					<div className="container ">
						<div className="row cartHeader">
							<div className="col-lg-6 col-md-6 col-sm-6 col-4">Item</div>
							<div className="col-lg-2 col-md-2 col-sm-2 col-2">Price</div>
							<div className="col-lg-2 col-md-2 col-sm-2 col-3">Quantity</div>
							<div className="col-lg-2 col-md-2 col-sm-2 col-3 totalTitle">
								Total
							</div>
						</div>
						<div className="row cartRows">
							{cartItems &&
								cartItems.map((item) => (
									<>
										<CartItemCard
											item={item}
											deleteCartItems={deleteCartItems}
										/>

										<div className="col-lg-2 col-md-2 col-sm-2 col-2">
											<div className="">
												<Formatprice price={item.price} />
											</div>
										</div>
										<div className="col-lg-2 col-md-2 col-sm-2 col-3">
											<div className="">
												<div>
													{item.quantity === 1 ? (
														<Tooltip title="Can't be 0" arrow>
															<button
																className="border-0 bg-light "
																onClick={() =>
																	decreaseQuantity(item.product, item.quantity)
																}>
																<RemoveIcon className="cartIcons" />
															</button>
														</Tooltip>
													) : (
														<Tooltip title="remove" arrow>
															<button
																className="border-0 bg-light "
																onClick={() =>
																	decreaseQuantity(item.product, item.quantity)
																}>
																<RemoveIcon className="cartIcons" />
															</button>
														</Tooltip>
													)}

													<input
														readOnly
														type="number"
														value={item.quantity}
														className="addToCardInput text-center "
													/>
													<Tooltip title="Add" arrow>
														<button
															className="border-0 bg-light"
															onClick={() =>
																increaseQuantity(
																	item.product,
																	item.quantity,
																	item.stock
																)
															}>
															<AddIcon className="cartIcons" />
														</button>
													</Tooltip>
												</div>
											</div>
										</div>
										<div className="col-lg-2 col-md-2 col-sm-2 col-3 totalTitle">
											<div className="">
												<Formatprice price={item.price * item.quantity} />{" "}
											</div>
										</div>
										<hr />
									</>
								))}
						</div>

						<div className="row ">
							<div className="col-lg-12  ">
								<div className="row justify-content-end ">
									<div className="col-lg-3 col-md-3 col-sm-6 col-6 text-end grossTotal">
										Gross Total
									</div>
									<div className="col-lg-3  col-md-3 col-sm-6 col-6 text-end">
										<Formatprice
											price={cartItems.reduce(
												(acc, item) => acc + item.quantity * item.price,
												0
											)}
										/>
									</div>
								</div>
								<hr style={{ width: "40%", float: "right" }} />
							</div>
							<div>
								<Button
									variant="contained"
									className="checkoutbtn"
									onClick={checkOutHandler}>
									Check Out
								</Button>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Cart;
