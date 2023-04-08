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
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.user);
	const { error, users } = useSelector((state) => state.allUsers);
	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.profile
	);

	const deleteUserHandler = (id) => {
		dispatch(deleteUser(id));
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
			navigate("/admin/users");
			dispatch({ type: DELETE_USER_RESET });
		}
		dispatch(getAllUsers());
	}, [dispatch, error, isDeleted, deleteError, navigate]);

	const columns = [
		{ field: "id", headerName: "User ID", minwidth: 180, flex: 0.5 },
		{ field: "email", headerName: "Email", minwidth: 200, flex: 0.8 },
		{
			field: "name",
			headerName: "Name ",
			minwidth: 150,
			flex: 0.5,
			type: "number",
		},
		{
			field: "role",
			headerName: "Role ",
			minwidth: 150,
			flex: 0.3,
			type: "number",
			cellClassName: (params) => {
				return params.row.role === "admin" ? "greenColor" : "redColor";
			},
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
						<Link to={`/admin/user/${params.row.id}`}>
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

	users &&
		users.forEach((item) => {
			rows.push({
				id: item._id,
				email: item.email,
				name: item.name,
				role: item.role,
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
						<h3 id="productListHeading">ALL Users</h3>
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

export default UsersList;
