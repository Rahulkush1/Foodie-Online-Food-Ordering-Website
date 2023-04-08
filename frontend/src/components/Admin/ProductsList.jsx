import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SideBar from "./SideBar";
import "./ProductsList.css";
import {
	clearErrors,
	getAdminProducts,
	deleteProduct,
} from "../../action/productAction";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductsList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { error, products } = useSelector((state) => state.products);
	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.product
	);

	const deleteProductHandler = (id) => {
		dispatch(deleteProduct(id));
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
			toast.success("Product Deleted Successfully");
			navigate("/admin/products");
			dispatch({ type: DELETE_PRODUCT_RESET });
		}
		dispatch(getAdminProducts());
	}, [dispatch, error, deleteError, isDeleted]);

	const columns = [
		{ field: "id", headerName: "Product ID", minwidth: 200, flex: 0.5 },
		{ field: "name", headerName: "Name", minwidth: 350, flex: 1 },
		{
			field: "stock",
			headerName: "Stock ",
			minwidth: 150,
			flex: 0.3,
			type: "number",
		},
		{
			field: "price",
			headerName: "Price ",
			minwidth: 270,
			flex: 0.5,
			type: "number",
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
						<Link to={`/admin/product/${params.row.id}`}>
							<EditIcon />
						</Link>
						<Button onClick={() => deleteProductHandler(params.row.id)}>
							<DeleteIcon />
						</Button>
					</>
				);
			},
		},
	];

	const rows = [];

	products &&
		products.forEach((item) => {
			rows.push({
				id: item._id,
				stock: item.Stock,
				price: item.price,
				name: item.name,
			});
		});
	return (
		<>
			<MetaData title={"All Products -- Admin"} />

			<div className="dashboard">
				<div className="row">
					<div className="col-lg-3 ">
						<SideBar />
					</div>
					<div className="col-lg-9 productListContainer">
						<h3 id="productListHeading">ALL PRODUCTS</h3>
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

export default ProductsList;
