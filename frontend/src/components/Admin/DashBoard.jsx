import React, { useEffect } from "react";
import SideBar from "./SideBar";
import "./DashBoard.css";
import MetaData from "../Layout/MetaData";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	ArcElement,
	Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, getAdminProducts } from "../../action/productAction";
import { getAllOrders } from "../../action/orderAction";
import { getAllUsers } from "../../action/userAction";

const DashBoard = () => {
	ChartJS.register(
		CategoryScale,
		ArcElement,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.products);
	const { orders } = useSelector((state) => state.allOrders);
	const { users } = useSelector((state) => state.allUsers);

	let outOfStock = 0;

	products &&
		products.forEach((item) => {
			if (item.Stock === 0) {
				outOfStock += 1;
			}
		});

	useEffect(() => {
		dispatch(getAdminProducts());
		dispatch(getAllOrders());
		dispatch(getAllUsers());
	}, [dispatch]);

	const lineState = {
		labels: ["Initial Amount", "Amount Earned"],
		datasets: [
			{
				label: "TOTAL AMOUNT",
				backgroundColor: ["tomato"],
				hoverBackgroundColor: ["rgb(197, 72, 49)"],
				data: [0, 4000],
			},
		],
	};

	const doughnutState = {
		labels: ["Out of Stock", "InStock"],
		datasets: [
			{
				backgroundColor: ["#00A6B4", "#6800B4"],
				hoverBackgroundColor: ["#4B5000", "#35014F"],
				data: [outOfStock, products.length - outOfStock],
			},
		],
	};
	return (
		<div className="dashboard">
			<MetaData title="Dashboard - Admin Panel" />
			<div>
				<div className="row">
					<div className="col-lg-3">
						<SideBar />
					</div>
					<div className="col-lg-9 dashboardContainer">
						<Typography component="h1">Dashboard</Typography>
						<div className="dashboardSummary">
							<div>
								<p>
									Total Amount <br /> ₹2000
								</p>
							</div>
							<div className="dashboardSummaryBox2">
								<Link to="/admin/products">
									<p>Product</p>
									<p>{products && products.length}</p>
								</Link>
								<Link to="/admin/orders">
									<p>Orders</p>
									<p>{orders && orders.length}</p>
								</Link>
								<Link to="/admin/users">
									<p>Users</p>
									<p>{users && users.length}</p>
								</Link>
							</div>
						</div>
						<div className="lineChart">
							<Line data={lineState} />
						</div>

						<div className="doughnutChart">
							<Doughnut data={doughnutState} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashBoard;
