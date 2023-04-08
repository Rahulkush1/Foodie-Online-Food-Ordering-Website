import React, { Fragment, useEffect, useRef } from "react";
import CheckOutStep from "../Cart/CheckOutStep";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Layout/MetaData";
import { Typography } from "@mui/material";

import {
	CardNumberElement,
	CardCvcElement,
	CardExpiryElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./Payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../../action/orderAction";

const Payment = () => {
	const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const paybtn = useRef(null);

	const { shippingInfo, cartItems } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.user);
	const { error } = useSelector((state) => state.newOrder);

	const paymentData = {
		amount: Math.round(orderInfo.totalPrice * 100),
	};
	console.log(orderInfo.subtotal);
	const order = {
		shippingInfo,
		orderItems: cartItems,
		itemsPrice: orderInfo.subtotal,
		taxPrice: orderInfo.tax,
		shippingPrice: orderInfo.shippingCharges,
		totalPrice: orderInfo.totalPrice,
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		paybtn.current.disabled = true;
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const { data } = await axios.post(
				"/api/v1/payment/process",
				paymentData,
				config
			);
			const client_secret = data.client_secret;

			if (!stripe || !elements) return;

			const result = await stripe.confirmCardPayment(client_secret, {
				payment_method: {
					card: elements.getElement(CardNumberElement),

					billing_details: {
						name: user.name,
						email: user.email,
						address: {
							line1: shippingInfo.address,
							city: shippingInfo.city,
							state: shippingInfo.state,
							postal_code: shippingInfo.pinCode,
							country: "IN",
						},
					},
				},
			});

			if (result.error) {
				paybtn.current.disabled = false;
				toast.error(result.error.message);
			} else {
				if (result.paymentIntent.status === "succeeded") {
					order.paymentInfo = {
						id: result.paymentIntent.id,
						status: result.paymentIntent.status,
					};
					dispatch(createOrder(order));
					navigate("/success");
				} else {
					toast.error("There's some issue while processing payment");
				}
			}
		} catch (error) {
			paybtn.current.disabled = false;
			toast.error(error.response.data.message);
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, error]);

	return (
		<>
			<MetaData title={"Payment"} />
			<CheckOutStep activeStep={2} />
			<div className="container ">
				<form
					className="paymentForm m-auto"
					onSubmit={(e) => {
						submitHandler(e);
					}}>
					<Typography>Card Info</Typography>
					<div>
						<CreditCardIcon />
						<CardNumberElement className="paymentInput" />
					</div>
					<div>
						<EventIcon />
						<CardExpiryElement className="paymentInput" />
					</div>
					<div>
						<VpnKeyIcon />
						<CardCvcElement className="paymentInput" />
					</div>
					<input
						type="submit"
						value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
						ref={paybtn}
						className="paymentFormBtn"
					/>
				</form>
			</div>
		</>
	);
};

export default Payment;
