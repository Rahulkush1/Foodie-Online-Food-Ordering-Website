import React, { useEffect, useState } from "react";
import "./ForgotPassword.css";
import { Button } from "@mui/material";

// import { Link } from "react-router-dom";
import { clearErrors, forgotPassword } from "../../action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Layout/Loader/Loader";

import MetaData from "../Layout/MetaData";

const ForgotPassword = () => {
	const dispatch = useDispatch();
	

	const { error, message, loading } = useSelector(
		(state) => state.forgotPassword
	);

	const [email, setEmail] = useState("");

	const forgotPasswordSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("email", email);
		dispatch(forgotPassword(myForm));
	};
	useEffect(() => {
		if (error) {
			toast.error(error, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			dispatch(clearErrors());
		}

		if (message) {
			toast.success(message, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	}, [dispatch, error, message]);
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="Forgot Password --- foodie" />
					<div className="ForgotPassword">
						<div className="container ForgotPasswordformBox ">
							<div className="ForgotPasswordHeading">
								<p>
									Forgot <span> Password </span>
								</p>
								<hr />
							</div>

							<form
								className="Form"
								encType="multipart/form-data"
								onSubmit={forgotPasswordSubmit}>
								<div className="mb-3">
									<label for="exampleInputEmail1" className="form-label">
										Email address
									</label>
									<input
										type="email"
										onChange={(e) => {
											setEmail(e.target.value);
										}}
										name="email"
										value={email}
										className="form-control"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
									/>
									<div id="emailHelp" className="form-text">
										We'll never share your email with anyone else.
									</div>
								</div>

								<Button
									variant=" contained "
									className="submitButton"
									type="submit">
									Send
								</Button>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ForgotPassword;
