import React, { useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../Layout/Loader/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearErrors, login, register } from "../../action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProfileIcon from "../../images/user-circle.svg";
import validator from "validator";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";

const LoginSignUp = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { error, loading, isAuthenticated } = useSelector(
		(state) => state.user
	);

	const [emailKey, setEmailKey] = useState("");

	async function getEmailKey() {
		const { data } = await axios.get("/api/v1/emailkey");
		setEmailKey(data.emailKey);
	}

	const apiURL =
		"https://emailvalidation.abstractapi.com/v1/?api_key=" + emailKey;

	const loginTab = useRef(null);
	const registerTab = useRef(null);
	const switcherTab = useRef(null);

	const [user, setUser] = useState({
		loginemail: "",
		loginpassword: "",
	});
	const { loginemail, loginpassword } = user;

	const loginDataChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUser({ ...user, [name]: value });
	};
	const loginSubmit = (e) => {
		e.preventDefault();

		dispatch(login(loginemail, loginpassword));
	};

	const [userData, setUserData] = useState({
		name: "",
		email: "",
		password: "",
		phone: null,
	});

	const [avatar, setAvatar] = useState(ProfileIcon);
	const [avatarPreview, setAvatarPreview] = useState(ProfileIcon);

	const { name, email, password, phone } = userData;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const sendEmailValidationRequest = async (email) => {
		try {
			const response = await axios.get(apiURL + "&email=" + email);
			return response.data;
		} catch (error) {
			throw error;
		}
	};

	const [isValid, setIsValid] = useState(false);
	const validateEmail = (email) => {
		// Regular expression to validate email format
		const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (regex.test(email)) {
			// Split email address into user and domain parts
			const [user, domain] = email.split("@");
			console.log(domain);

			// Check if domain has valid MX records (indicating a real domain)
			if (
				[
					"outlook.com",
					"yahoo.com",
					"hotmail.com",
					"gmail.com",
					"sistec.ac.in",
				].includes(domain)
			) {
				setIsValid(true);
			} else {
				setIsValid(false);
			}
		} else {
			setIsValid(false);
		}
	};

	const registerSubmit = async (e) => {
		e.preventDefault();
		// const emailRegex = ^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$;
		validateEmail(email);
		console.log(isValid);

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

		if (isValid === false) {
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
	const redirect = location.search ? location.search.split("=")[1] : "/account";
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
			navigate(redirect);
		}

		getEmailKey();
	}, [dispatch, error, isAuthenticated, navigate, redirect]);

	const switchTabs = (e, tab) => {
		if (tab === "login") {
			switcherTab.current.classList.add("shiftToNeutral");
			switcherTab.current.classList.remove("shiftToRight");

			registerTab.current.classList.remove("shiftToNeutralForm");
			loginTab.current.classList.remove("shiftToLeft");
		}
		if (tab === "register") {
			switcherTab.current.classList.add("shiftToRight");
			switcherTab.current.classList.remove("shiftToNeutral");

			registerTab.current.classList.add("shiftToNeutralForm");
			loginTab.current.classList.add("shiftToLeft");
		}
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className="LoginSignUpContainer">
						<div className="LoginSignUpBox">
							<div>
								<div className="login_signUp_toggle">
									<p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
									<p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
								</div>
								<button ref={switcherTab}></button>
							</div>
							<form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
								<div className="loginEmail">
									<MailOutlineIcon />
									<input
										placeholder="Your Email address"
										name="loginemail"
										value={loginemail}
										onChange={loginDataChange}
									/>
								</div>
								<div className="loginPassword">
									<LockIcon />
									<input
										type="password"
										placeholder="Your Password"
										name="loginpassword"
										value={loginpassword}
										onChange={loginDataChange}
									/>
								</div>
								<Link to="/password/forgot">Forget Password ?</Link>
								<input type="submit" value="Login" className="loginBtn" />
							</form>
							<form
								className="signUpForm"
								ref={registerTab}
								encType="multipart/form-data"
								onSubmit={registerSubmit}>
								<div className="signUpName">
									<PersonIcon />
									<input
										type="text"
										placeholder="Your First Name"
										name="name"
										value={name}
										onChange={registerDataChange}
									/>
								</div>
								<div className="signUpEmail">
									<MailOutlineIcon />
									<input
										type="email"
										placeholder="Your Email address"
										name="email"
										value={email}
										onChange={registerDataChange}
									/>
								</div>
								<div className="signUpEmail">
									<LocalPhoneIcon />
									<input
										type="text"
										placeholder="Your Number"
										name="phone"
										value={phone}
										onChange={registerDataChange}
									/>
								</div>
								<div className="signUpPassword">
									<LockIcon />
									<input
										type="password"
										placeholder="Your Password"
										name="password"
										value={password}
										onChange={registerDataChange}
									/>
								</div>

								<div id="registerImage">
									<img src={avatarPreview} alt="Avatar Preview" />
									<input
										type="file"
										name="avatar"
										accept="image/*"
										onChange={registerDataChange}
									/>
								</div>
								<input type="submit" value="Register" className="signUpBtn" />
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default LoginSignUp;
