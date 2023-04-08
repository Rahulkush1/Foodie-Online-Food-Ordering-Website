import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SideBar from "./SideBar";
import "./ProductsList.css";

import { Link, useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import {
	clearErrors,
	deleteOrderRes,
	getAllOrdersRes,
} from "../../action/orderAction";

const OrderList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { error, orders } = useSelector((state) => state.allOrders);
	const { error: deleteError, isDeleted } = useSelector((state) => state.order);

	const deleteOrderHandler = (id) => {
		dispatch(deleteOrderRes(id));
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
			toast.success("Order Deleted Successfully");
			navigate("/restaurant/orders");
			dispatch({ type: DELETE_ORDER_RESET });
		}
		dispatch(getAllOrdersRes());
	}, [dispatch, error, deleteError, isDeleted, navigate]);

	const columns = [
		{ field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
		{
			field: "status",
			headerName: "Status ",
			minWidth: 150,
			flex: 0.5,
			cellClassName: (params) => {
				return params.row.status === "Delivered" ? "greenColor" : "redColor";
			},
		},
		{
			field: "itemsQty",
			headerName: "Items Qty",
			type: "number",
			minWidth: 150,
			flex: 0.5,
		},
		{
			field: "amount",
			headerName: "Amount ",
			type: "number",
			minWidth: 270,
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
						<Link to={`/restaurant/order/${params.row.id}`}>
							<EditIcon />
						</Link>
						<Button onClick={() => deleteOrderHandler(params.row.id)}>
							<DeleteIcon />
						</Button>
					</>
				);
			},
		},
	];

	const rows = [];

	orders &&
		orders.forEach((item) => {
			rows.push({
				id: item._id,
				itemsQty: item.orderItems.length,
				amount: item.totalPrice,
				status: item.orderStatus,
			});
		});
	return (
		<>
			<MetaData title={"All Orders -- Restaurant"} />

			<div className="dashboard">
				<div className="row">
					<div className="col-lg-3">
						<SideBar />
					</div>
					<div className="col-lg-9 productListContainer">
						<h3 id="productListHeading">ALL Orders</h3>
						<DataGrid
							rows={rows}
							columns={columns}
							initialState={{
								pagination: {
									paginationModel: { pageSize: 10, page: 0 },
								},
							}}
							disableRowSelectionOnClick
							className="productListTable"
							autoHeight
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default OrderList;
