import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { clearErrors, login } from "../../action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import "./LoginSignUp.css";
import Loader from "../Layout/Loader/Loader";

export const Login = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const { email, password } = user;

	const { error, loading, isAuthenticated } = useSelector(
		(state) => state.user
	);
	const loginDataChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUser({ ...user, [name]: value });
	};
	const loginSubmit = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
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
			// toast.success("Login Successfully", {
			// 	position: "top-center",
			// 	autoClose: 5000,
			// 	hideProgressBar: false,
			// 	closeOnClick: true,
			// 	pauseOnHover: false,
			// 	draggable: true,
			// 	progress: undefined,
			// 	theme: "colored",
			// });
			navigate(redirect);
		}
	}, [dispatch, error, isAuthenticated, navigate, redirect]);
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<div>
						<main className="form-page">
							<div className="img-section" id="login"></div>
							<div className="form-section">
								<h3 className="header mb-4">Welcome Back!</h3>
								<form onSubmit={loginSubmit}>
									<input
										placeholder="Your Email address"
										name="email"
										value={email}
										onChange={loginDataChange}></input>
									<input
										type="password"
										placeholder="Your Password"
										name="password"
										value={password}
										onChange={loginDataChange}></input>
									<button className="submit-button" type="submit">
										Login
									</button>
								</form>
								<div className="form-footer">
									<Link to="/register" className="text-decoration-none">
										<p className="text-secondary">Create an account</p>
									</Link>
									<Link to="/password/forgot" className="text-decoration-none">
										<p className="text-secondary">Forgot Passoword</p>
									</Link>
								</div>
							</div>
						</main>
					</div>
				</>
			)}
		</>
	);
};
