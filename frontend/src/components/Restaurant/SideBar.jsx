import React from "react";
import logo from "../../images/logo.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddIcon from "@mui/icons-material/Add";
import PostAddIcon from "@mui/icons-material/PostAdd";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import ImportExportIcon from '@mui/icons-material/ImportExport';

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./SideBar.css";

const SideBar = () => {
	return (
		<>
			<div className="sidebar">
				<Link to={"/"}>
					<img src={logo} alt="foodie" className="" />
					foodie
				</Link>
				<Link to="/restaurant/dashboard">
					<p>
						<DashboardIcon /> Dashboard
					</p>
				</Link>
				<TreeView
					defaultCollapseIcon={<ExpandMoreIcon />}
					defaultExpandIcon={<ChevronRightIcon />}
					className="TreeView">
					<TreeItem nodeId="1" label="Products">
						<Link to="/restaurant/products">
							<TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
						</Link>

						<Link to="/restaurant/product">
							<TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
						</Link>
					</TreeItem>
				</TreeView>
				<Link to="/restaurant/orders">
					<p>
						<ListAltIcon />
						Orders
					</p>
				</Link>

				<Link to="/restaurant/reviews">
					<p>
						<RateReviewIcon />
						Reviews
					</p>
				</Link>
			</div>
		</>
	);
};

export default SideBar;
