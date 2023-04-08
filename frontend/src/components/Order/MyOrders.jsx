import React, { useEffect } from "react";
import "./MyOrder.css";
import { DataGrid } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, myOrders } from "../../action/orderAction";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";

const MyOrders = () => {
	const dispatch = useDispatch();
	const { loading, error, orders } = useSelector((state) => state.myOrders);
	const { user } = useSelector((state) => state.user);

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
			flex: 0.3,
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
			headerName: "Actions",
			type: "number",
			sortable: false,
			minWidth: 150,
			flex: 0.3,
			renderCell: (params) => {
				return (
					<Link to={`/order/${params.row.id}`}>
						<LaunchIcon />
					</Link>
				);
			},

			// render: (row) => console.log(`row -- ${row}`),
		},
	];
	const rows = [];

	orders &&
		orders.forEach((item, index) => {
			rows.push({
				itemsQty: item.orderItems.length,
				id: item._id,
				status: item.orderStatus,
				amount: item.totalPrice,
			});
		});

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors);
		}
		dispatch(myOrders());
	}, [dispatch, error]);

	return (
		<>
			<MetaData title={`${user.name} -- Orders`} />
			{loading ? (
				<Loader />
			) : (
				<>
					<div className="myOrdersPage">
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={10}
							disableRowSelectionOnClick
							className="myOrdersTable"
							autoHeight
						/>
						<Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
					</div>
				</>
			)}
		</>
	);
};

export default MyOrders;
