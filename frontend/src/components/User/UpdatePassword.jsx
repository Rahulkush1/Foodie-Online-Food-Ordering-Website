import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { clearErrors, updatePassword } from "../../action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Layout/Loader/Loader";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

import MetaData from "../Layout/MetaData";

const UpdatePassword = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { error, isUpdated, loading } = useSelector((state) => state.profile);

	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const updatePasswordSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("oldPassword", oldPassword);
		myForm.set("newPassword", newPassword);
		myForm.set("confirmPassword", confirmPassword);

		dispatch(updatePassword(myForm));
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

		if (isUpdated) {
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

			navigate("/account");

			dispatch({
				type: UPDATE_PASSWORD_RESET,
			});
		}
	}, [dispatch, error, isUpdated, navigate]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="Update Password --- foodie" />
					<div className="UpdatePassword">
						<div className="container UpdatePasswordformBox ">
							<div className="UpdatePasswordHeading">
								<p>
									Update <span> Password </span>
								</p>
							</div>

							<form
								className="Form"
								encType="multipart/form-data"
								onSubmit={updatePasswordSubmit}>
								<div className="mb-3">
									<label htmlFor="exampleInputPassword1" className="form-label">
										Old Password
									</label>
									<input
										type="password"
										onChange={(e) => {
											setOldPassword(e.target.value);
										}}
										value={oldPassword}
										className="form-control"
										id="exampleInputPassword1"
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="exampleInputPassword1" className="form-label">
										New Password
									</label>
									<input
										type="password"
										onChange={(e) => {
											setNewPassword(e.target.value);
										}}
										value={newPassword}
										className="form-control"
										id="exampleInputPassword2"
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
		</>
	);
};

export default UpdatePassword;
