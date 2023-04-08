import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import SpeedDial from "@mui/material/SpeedDial";

import SpeedDialAction from "@mui/material/SpeedDialAction";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { logout } from "../../../action/userAction";
import Backdrop from "@mui/material/Backdrop";
import Badge from "@mui/material/Badge";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
	position: "absolute",

	"&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
		top: theme.spacing(2),
		left: theme.spacing("90vmax"),
	},
}));

export default function UserOptions({ user }) {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { cartItems } = useSelector((state) => state.cart);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const actions = [
		{ icon: <ListAltIcon />, name: "Orders", func: orders },
		{ icon: <PersonIcon />, name: "Profile", func: account },
		,
		{
			icon: (
				<Badge badgeContent={cartItems.length} color="primary">
					<ShoppingCartCheckoutIcon
						style={{
							color: `${cartItems.length > 0 ? "tomato" : "unset"}`,
						}}
					/>
				</Badge>
			),
			name: `Cart(${cartItems.length})`,
			func: cart,
		},
		{ icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
	];
	if (user.role === "restaurant") {
		actions.unshift({
			icon: <PersonIcon />,
			name: "Restaurant Profile",
			func: restaurantPro,
		});
	}
	if (user.role === "admin") {
		actions.unshift({
			icon: <DashboardIcon />,
			name: "Dashboard",
			func: Dashboard,
		});
	}
	if (user.role === "restaurant") {
		actions.unshift({
			icon: <DashboardIcon />,
			name: "Dashboard",
			func: Dashboard,
		});
	}

	function Dashboard() {
		if (user.role === "admin") {
			navigate("/admin/dashboard");
		} else {
			navigate("/restaurant/dashboard");
		}
	}

	function orders() {
		navigate("/orders");
	}
	function cart() {
		navigate("/cart");
	}
	function logoutUser() {
		dispatch(logout());
		toast.success("Logout Successfully", {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});
		navigate("/login");
	}

	function account() {
		navigate("/account");
	}
	function restaurantPro() {
		navigate("/restaurant/profile");
	}

	return (
		<>
			<Backdrop open={open} className="backdrop" />
			<div className="speedDialbox">
				<Box
					sx={{ transform: "translateZ(0px)", flexGrow: 1 }}
					className="speedDial">
					<Box sx={{ position: "fixed", mt: 3, height: 320, top: 0 }}>
						<StyledSpeedDial
							ariaLabel="SpeedDial playground example"
							icon={
								<img
									src={user.avatar.url}
									className="speedDialIcon img-fluid"
									alt="Profile"
								/>
							}
							className="speedDialButton"
							onClose={handleClose}
							onOpen={handleOpen}
							open={open}
							color="white"
							direction="down">
							{actions.map((action) => (
								<SpeedDialAction
									key={action.name}
									icon={action.icon}
									tooltipTitle={action.name}
									tooltipOpen={window.innerWidth < 600 ? true : false}
									onClick={action.func}
								/>
							))}
						</StyledSpeedDial>
					</Box>
				</Box>
			</div>
		</>
	);
}
