import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { clearErrors, register } from "../../action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProfileIcon from "../../images/user-circle.svg";
import validator from "validator";
import Loader from "../Layout/Loader/Loader";
import Banner from "../../images/register-img.png";

import "./LoginSignUp.css";

const SignUp = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [userData, setUserData] = useState({
		name: "",
		email: "",
		password: "",
		phone: null,
	});

	const { error, isAuthenticated, loading } = useSelector(
		(state) => state.user
	);

	const [avatar, setAvatar] = useState(ProfileIcon);
	const [avatarPreview, setAvatarPreview] = useState(ProfileIcon);

	const { name, email, password, phone } = userData;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	console.log(emailRegex.test(email));

	const registerSubmit = (e) => {
		e.preventDefault();
		// const emailRegex = ^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$;
		console.log(validator.isEmail(email));
		console.log(name);
		console.log(validator.isAlpha(name));

		if (name === "") {
			toast.error("Please Enter your name ");
			return;
		}
		if (email === "") {
			toast.error("Please Enter your  email address ");
			return;
		}

		if (phone === "") {
			toast.error("Please Enter your mobile Number  ");
			return;
		}
		if (password === "") {
			toast.error("Please Enter your password  ");
			return;
		}
		if (avatar === "") {
			toast.error("Please Profile Image ");
			return;
		}

		if (validator.isEmail(email) === false) {
			toast.error("Enter valid Email!");
		} else if (
			validator.isAlpha(name.replace(/\s/g, "")) === false ||
			name.length < 2
		) {
			toast.error("Enter valid Name!");
		} else if (validator.isNumeric(phone) === false || phone.length !== 10) {
			toast.error("Enter valid Mobile Number or Should be 10 digits");
		} else if (validator.isStrongPassword(password) === false) {
			toast.error(
				"Password is week! Please Enter Strong Password , Contains minLowercase: 1,minUppercase: 1, minNumbers  1, minSymbols: 1"
			);
		} else {
			const myForm = new FormData();

			myForm.set("name", name);
			myForm.set("email", email);
			myForm.set("password", password);
			myForm.set("phone", phone);
			myForm.set("avatar", avatar);

			console.log(myForm);
			dispatch(register(myForm));
		}
	};

	const registerDataChange = (e) => {
		if (e.target.name === "avatar") {
			const reader = new FileReader();
			setAvatar();
			setAvatarPreview();
			reader.readAsDataURL(e.target.files[0]);
			reader.onloadend = () => {
				if (reader.readyState === 2) {
					setAvatarPreview(reader.result);
					setAvatar(reader.result);
				}
			};
		} else {
			const name = e.target.name;
			const value = e.target.value;

			setUserData({ ...userData, [name]: value });
		}
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

		if (isAuthenticated) {
			toast.success("Register Successfully", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			navigate("/verify/email");
		}
	}, [dispatch, error, isAuthenticated, navigate]);

	return (
		<div>
			<main className="form-page">
				{/* <div className="img-section" id="signup"></div>
				{loading ? (
					<Loader />
				) : (
					<div className="form-section">
						<h3 className="mb-4">Welcome to foodie!</h3>
						<form onSubmit={registerSubmit} className="Form">
							<input
								type="text"
								placeholder="Your First Name"
								name="name"
								value={name}
								onChange={registerDataChange}
							/>

							<input
								type="email"
								placeholder="Your Email address"
								name="email"
								value={email}
								onChange={registerDataChange}
							/>
							<input
								type="text"
								placeholder="Your Number"
								name="phone"
								value={phone}
								onChange={registerDataChange}
							/>
							<input
								type="password"
								placeholder="Your Password"
								name="password"
								value={password}
								onChange={registerDataChange}
							/>
							<p id="emailHelp" className="form-text mt-0 text-danger">
								*Password Should be of Minimum 8 digits.
							</p>
							<div className="d-flex mb-3  ">
								<div className="mx-2">
									<p for="autoSizingInput">
										<img
											src={avatarPreview}
											alt="Avatar Preview"
											className="img-fuild avatar"
										/>
									</p>
								</div>

								<div className="input-group">
									<input
										type="file"
										onChange={registerDataChange}
										name="avatar"
										className="form-control"
										accept="image/*"
										id="autoSizingInputGroup"
										placeholder="choose profile pic"
									/>
								</div>
							</div>

							<button className="submit-button" type="submit">
								SIGN UP
							</button>
						</form>
						<div className="form-footer">
							<Link to="/login" className="text-decoration-none">
								<p className="text-secondary">
									Already have an account.{" "}
									<span className="LoginLink">LOGIN</span>
								</p>
							</Link>
						</div>
					</div>
				)} */}
				<div className="SigupPage">
					<div className="row">
						<div className="col-lg-8">
							<div className="banner"></div>
						</div>
						<div className="col-lg-4"></div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default SignUp;
