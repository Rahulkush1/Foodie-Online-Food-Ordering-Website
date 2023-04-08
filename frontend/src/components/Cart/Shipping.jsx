import React, { useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../action/cartAction";
import MetaData from "../Layout/MetaData";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";

import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { City, State } from "country-state-city";
import { Button } from "@mui/material";
import CheckOutStep from "./CheckOutStep";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { shippingInfo } = useSelector((state) => state.cart);
	const [address, setAddress] = useState(shippingInfo.address);
	const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
	const [city, setCity] = useState(shippingInfo.city);

	const [state, setState] = useState(shippingInfo.state);
	const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
	const shippingSubmit = (e) => {
		e.preventDefault();
		if (phoneNo.length < 10 || phoneNo.length > 10) {
			toast.error("Phone Number Number Should be Digit ");
			return;
		}
		const country = "IN";
		dispatch(
			saveShippingInfo({ address, pinCode, phoneNo, state, city, country })
		);
		navigate("/order/confirm");
	};

	return (
		<>
			<MetaData title={"Shipping Details"} />
			<CheckOutStep activeStep={0} />
			<div className="container">
				<h2 className="shippingHeader">Shipping Details</h2>
				<div className="shippingFormBox">
					<form
						className="row gy-2 gx-3 align-items-center shippingForm"
						onSubmit={shippingSubmit}>
						<div>
							<div className="input-group mb-4">
								<div className="input-group-text">
									<HomeIcon />
								</div>
								<input
									type="text"
									className="form-control"
									id="autoSizingInputGroup"
									placeholder="Address"
									value={address}
									onChange={(e) => {
										setAddress(e.target.value);
									}}
								/>
							</div>
							<div className="input-group mb-4">
								<div className="input-group-text">
									<PinDropIcon />
								</div>
								<input
									type="text"
									className="form-control"
									id="autoSizingInputGroup"
									placeholder="Pincode"
									value={pinCode}
									onChange={(e) => {
										setPinCode(e.target.value);
									}}
								/>
							</div>
							<div className="input-group mb-4">
								<div className="input-group-text">
									<PhoneIcon />
								</div>
								<input
									type="text"
									className="form-control"
									id="autoSizingInputGroup"
									placeholder="Phone Number"
									value={phoneNo}
									onChange={(e) => {
										setPhoneNo(e.target.value);
									}}
								/>
							</div>

							<div className="input-group mb-4">
								<div className="input-group-text">
									<TransferWithinAStationIcon />
								</div>
								<select
									required
									className="form-control input-select"
									value={state}
									onChange={(e) => {
										setState(e.target.value);
									}}>
									<option value="">State</option>
									{State &&
										State.getStatesOfCountry("IN").map((item) => (
											<option key={item.isoCode} value={item.isoCode}>
												{item.name}
											</option>
										))}
								</select>
							</div>
							{state && (
								<div className="input-group mb-4">
									<div className="input-group-text">
										<LocationCityIcon />
									</div>
									<select
										required
										className="form-control input-select"
										value={city}
										onChange={(e) => {
											setCity(e.target.value);
										}}>
										<option value="">City</option>
										{City &&
											City.getCitiesOfState("IN", state).map((item) => (
												<option key={item.isoCode} value={item.isoCode}>
													{item.name}
												</option>
											))}
									</select>
								</div>
							)}
						</div>

						<div>
							<Button
								variant="contained"
								className="shippingbtn"
								disabled={state ? false : true}
								type="submit">
								Continue
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Shipping;
