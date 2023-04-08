// import React, { useEffect, useState } from "react";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";
// import Payment from "./Payment";

// const Stripe = () => {
// 	// const [stripeApiKey, setStripeApiKey] = useState("");
// 	// console.log("inside stripe component");
// 	// async function getStripeApiKey() {
// 	// 	const { data } = await axios.get("/api/v1/stripeapikey");
// 	// 	console.log("inside  getStripeApiKey component");

// 	// 	console.log(data.stripeApiKey);

// 	// 	setStripeApiKey(data.stripeApiKey);
// 	// }
// 	// console.log("inside 2 stripe component");

// 	// console.warn(stripeApiKey);

// 	// useEffect(() => {
// 	// 	getStripeApiKey();
// 	// }, []);

// 	// const stripe = loadStripe(stripeApiKey);

// 	return (
// 		<>
// 			<Elements stripe={stripeApiKey}>
// 				<Payment />
// 			</Elements>
// 		</>
// 	);
// };

// export default Stripe;
import React from 'react'

export const Stripe = () => {
  return (
    <div>Stripe</div>
  )
}

