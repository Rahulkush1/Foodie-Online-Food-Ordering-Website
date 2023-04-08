import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";

import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import MetaData from "../Layout/MetaData";
// import ProfileImg from "../../images/profile-img.png"

const RestaurantProfile = () => {
	const navigate = useNavigate();
	// const { user, isAuthenticated, loading } = useSelector((state) => state.user);
	const { restaurant, isAuthenticated, loading } = useSelector(
		(state) => state.restaurant
	);

	useEffect(() => {
		if (isAuthenticated === false) {
			navigate("/login");
		}
	}, [navigate, isAuthenticated]);
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title={`${restaurant.name}'s Profile`} />
					<div className="container profilePage">
						<div className="row g-5">
							<div className="col-lg-6">
								<div className="text-center">
									<div className="ProfileImg">
										<img
											src={''}
											className="img-fluid profilepic"
											alt="Profile"
										/>
									</div>
									<div className="updateProfile ">
										<Link
											className="text-decoration-none text-light"
											to="/me/update">
											<Button variant="contained" className="Editbtn">
												Edit Profile
											</Button>
										</Link>
									</div>
								</div>
							</div>
							<div className="col-lg-6">
								<div>
									<div className="username">
										<h4>Full Name</h4>
										<p>{restaurant.name}</p>
									</div>
									<div className="emailAdd">
										<h4>Email</h4>
										<p>{restaurant.email}</p>
									</div>
									<div className="emailAdd">
										<h4>Phone Number</h4>
										<p>{restaurant.phone}</p>
									</div>
									<div className="emailAdd">
										<h4>Address</h4>
										<p>{restaurant.address}</p>
									</div>
									<div className="emailAdd">
										<h4>Pincode</h4>
										<p>{restaurant.pincode}</p>
									</div>

									<div className="createdAt">
										<h4>Joined On</h4>
										<p>{String(restaurant.createdAT).substring(0, 10)}</p>
									</div>
									{/* <div className="d-flex flex-column   ">
										<Link
											className="text-decoration-none text-light"
											to="/me/update">
											<Button variant="contained" className="profilebtn">
												My Orders
											</Button>
										</Link>

										<Link
											className="text-decoration-none text-light"
											to="/password/update">
											<Button variant="contained" className="profilebtn">
												Change Password
											</Button>
										</Link>
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default RestaurantProfile;
