import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { Button } from "@mui/material";
import ProfileIcon from "../../images/user-circle.svg";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { clearErrors, loadUser, updateProfile } from "../../action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Layout/Loader/Loader";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

import MetaData from "../Layout/MetaData";

const UpdateProfile = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { error, isUpdated, loading } = useSelector((state) => state.profile);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const [avatar, setAvatar] = useState(ProfileIcon);
	const [avatarPreview, setAvatarPreview] = useState(ProfileIcon);

	const updateProfileSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("name", name);
		myForm.set("email", email);

		myForm.set("avatar", avatar);

		dispatch(updateProfile(myForm));
	};

	const updateProfileDataChange = (e) => {
		const reader = new FileReader();

		reader.onloadend = () => {
			if (reader.readyState === 2) {
				setAvatarPreview(reader.result);
				setAvatar(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setAvatarPreview(user.avatar.url);
		}
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
			dispatch(loadUser());
			navigate("/account");

			dispatch({
				type: UPDATE_PROFILE_RESET,
			});
		}
	}, [dispatch, error, isUpdated, navigate, user]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="Update Profile --- foodie" />
					<div className="UpdateProfile">
						<div className="container updateProfileformBox ">
							<div className="updateProfileHeading">
								<p>
									Update <span> Profile </span>
								</p>
							</div>

							<form
								className="Form"
								encType="multipart/form-data"
								onSubmit={updateProfileSubmit}>
								<div className="mb-3">
									<label for="exampleInputEmail1" className="form-label">
										Name
									</label>
									<input
										className="form-control"
										type="text"
										onChange={(e) => {
											setName(e.target.value);
										}}
										name="name"
										value={name}
										aria-label="default input example"></input>
								</div>
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

								<div className="d-flex mb-3  ">
									<div className="me-2">
										<p for="autoSizingInput">
											<img
												src={avatarPreview}
												alt="Avatar Preview"
												className="img-fuild avatar"
											/>
										</p>
									</div>
									<div>
										<div className="input-group">
											<input
												type="file"
												onChange={updateProfileDataChange}
												name="avatar"
												className="form-control"
												accept="image/*"
												id="autoSizingInputGroup"
											/>
										</div>
									</div>
								</div>

								<Button
									variant=" contained "
									className="submitButton"
									type="submit">
									Update
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

export default UpdateProfile;
