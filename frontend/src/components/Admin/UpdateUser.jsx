import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";
import MetaData from "../Layout/MetaData";

import SideBar from "./SideBar";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import "./NewProduct.css";
import {
	clearErrors,
	getUserDetails,
	updateUser,
} from "../../action/userAction";
import Loader from "../Layout/Loader/Loader";

const UpdateUser = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { error, loading, user } = useSelector((state) => state.userDetails);

	const {
		loading: updateLoading,
		error: updateError,
		isUpdated,
	} = useSelector((state) => state.profile);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");

	const roles = ["admin", "user", "restaurant"];
	const userId = id;
	const updateUserHandler = (e) => {
		e.preventDefault();
		const myform = new FormData();
		myform.set("name", name);
		myform.set("email", email);
		myform.set("role", role);

		dispatch(updateUser(userId, myform));
	};

	useEffect(() => {
		if (user && user._id !== userId) {
			dispatch(getUserDetails(userId));
		} else {
			setName(user.name);
			setEmail(user.email);
			setRole(user.role);
		}
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (updateError) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (isUpdated) {
			toast.success("User Updated Successfully");
			navigate("/admin/users");
			dispatch({ type: UPDATE_USER_RESET });
		}
	}, [dispatch, error, isUpdated, updateError]);

	return (
		<>
			<MetaData title={"Create Product -- Admin"} />
			<div className="dashboard">
				<div className="row">
					<div className="col-lg-3">
						<SideBar />
					</div>
					<div className="col-lg-9 newProductContainer">
						{loading ? (
							<Loader />
						) : (
							<form
								className="createProductForm"
								encType="multipart/form-data"
								onSubmit={updateUserHandler}>
								<h1 id="">Update User</h1>
								<div>
									<PersonIcon />
									<input
										type="text"
										name="name"
										placeholder="Product Name"
										required
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div>
									<MailOutlineIcon />
									<input
										type="emal"
										name="email"
										placeholder="Email "
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<div>
									<VerifiedUserIcon />
									<select
										onChange={(e) => setRole(e.target.value)}
										name="category">
										<option value="">Choose Category</option>
										{roles.map((Role) => (
											<option key={Role} value={Role}>
												{Role}
											</option>
										))}
									</select>
								</div>

								<Button
									id="createProductBtn"
									type="submit"
									disabled={
										updateLoading ? true : false || role === " " ? true : false
									}>
									Update
								</Button>
							</form>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default UpdateUser;
