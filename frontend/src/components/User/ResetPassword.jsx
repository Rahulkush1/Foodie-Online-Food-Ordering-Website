import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import { Button } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

import { clearErrors, resetPassword } from "../../action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Layout/Loader/Loader";

import MetaData from "../Layout/MetaData";

const ResetPassword = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { token } = useParams();

	const { error, success, loading } = useSelector(
		(state) => state.forgotPassword
	);

	const [Password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	console.log(`ID is ${token}`);
	const ResetPasswordSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("password", Password);

		myForm.set("confirmPassword", confirmPassword);

		dispatch(resetPassword(token, myForm));
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

		if (success) {
			toast.success("Profile Updated Successfully", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});

			navigate("/login");
		}
	}, [dispatch, error, success, navigate]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="Update Password --- foodie" />
					<div className="ResetPassword">
						<div className="container ResetPasswordformBox ">
							<div className="ResetPasswordHeading">
								<p>
									Update <span> Password </span>
								</p>
							</div>

							<form
								className="Form"
								encType="multipart/form-data"
								onSubmit={ResetPasswordSubmit}>
								<div className="mb-3">
									<label htmlFor="exampleInputPassword1" className="form-label">
										 Password
									</label>
									<input
										type="password"
										onChange={(e) => {
											setPassword(e.target.value);
										}}
										name="password"
										value={Password}
										className="form-control"
										id="exampleInputPassword1"
									/>
								</div>

								<div className="mb-3">
									<label htmlFor="exampleInputPassword1" className="form-label">
										Confirm Password
									</label>
									<input
										type="password"
										onChange={(e) => {
											setConfirmPassword(e.target.value);
										}}
										name="confirmPassword"
										value={confirmPassword}
										className="form-control"
										id="exampleInputPassword3"
									/>
								</div>

								<Button
									variant=" contained "
									className="submitButton"
									type="submit">
									Change
								</Button>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ResetPassword;
