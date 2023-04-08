import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SideBar from "./SideBar";
import "./ProductsList.css";
import { clearErrors, getAllUsers, deleteUser } from "../../action/userAction";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import {
	deleteRestaurant,
	getAllRestaurants,
} from "../../action/restaurantAction";
import { DELETE_RESTAURANT_RESET } from "../../constants/restaurantConstants";

const RestaurantList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	
	const { error, restaurants } = useSelector((state) => state.allRestaurants);
	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.profileRes
	);

	const deleteUserHandler = (id) => {
		dispatch(deleteRestaurant(id));
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (deleteError) {
			toast.error(deleteError);
			dispatch(clearErrors());
		}
		if (isDeleted) {
			toast.success("User Deleted Successfully");
			navigate("/admin/restaurants");
			dispatch({ type: DELETE_RESTAURANT_RESET });
		}
		dispatch(getAllRestaurants());
	}, [dispatch, error, navigate]);

	const columns = [
		{ field: "id", headerName: "Restaurant ID", minwidth: 180, flex: 0.5 },
		{ field: "email", headerName: "Email", minwidth: 200, flex: 0.5 },
		{
			field: "name",
			headerName: "Name ",
			minwidth: 150,
			flex: 0.5,
		},

		{
			field: "phone",
			headerName: "Phone Number ",
			minwidth: 150,
			flex: 0.3,
			type: "number",
		},
		{
			field: "address",
			headerName: "Address ",
			minwidth: 250,
			flex: 0.5,
		},
		{
			field: "actions",
			headerName: "Actions ",
			minwidth: 150,
			flex: 0.3,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<>
						<Link to={`/admin/restaurant/${params.row.id}`}>
							<EditIcon />
						</Link>

						<Button onClick={() => deleteUserHandler(params.row.id)}>
							<DeleteIcon />
						</Button>
					</>
				);
			},
		},
	];

	const rows = [];

	restaurants &&
		restaurants.forEach((item) => {
			rows.push({
				id: item._id,
				email: item.email,
				name: item.name,
				phone: item.phone,
				address: item.address,
			});
		});
	return (
		<>
			<MetaData title={"All Products -- Admin"} />

			<div className="dashboard">
				<div className="row">
					<div className="col-lg-3 scroll">
						<SideBar />
					</div>
					<div className="col-lg-9 productListContainer">
						<h3 id="productListHeading">ALL Restaurants</h3>
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={10}
							disableRowSelectionOnClick
							className="productListTable"
							autoHeight
							initialState={{
								pagination: {
									paginationModel: { pageSize: 10, page: 0 },
								},
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default RestaurantList;
