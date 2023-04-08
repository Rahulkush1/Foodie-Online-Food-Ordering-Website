import React, { useEffect, useState } from "react";
import {
	clearErrors,
	updateProductRes,
	getProductDetails,
} from "../../action/productAction";
import { Button } from "@mui/material";
import MetaData from "../Layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./SideBar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./NewProduct.css";

const UpdateProduct = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const navigate = useNavigate();

	const { error, product } = useSelector((state) => state.productDetails);

	const {
		loading,
		error: updateError,
		isUpdated,
	} = useSelector((state) => state.product);

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [Stock, setStock] = useState(0);
	const [image, setImage] = useState("");
	const [oldImages, setOldImages] = useState("");
	const [imagePreview, setImagePreview] = useState("");

	const categories = [
		"Fast Food",
		"Pizza",
		"Chinese",
		"South Indian",
		"Noodles",
		"Dosa",
	];
	const productId = id;

	useEffect(() => {
		if (product && product._id !== productId) {
			dispatch(getProductDetails(productId));
		} else {
			setName(product.name);
			setDescription(product.description);
			setPrice(product.price);
			setCategory(product.category);
			setStock(product.Stock);
			setOldImages(product.images);
		}
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (updateError) {
			toast.error(updateError);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			toast.success("Product Updated Successfully");
			navigate("/restaurant/products");
			dispatch({ type: UPDATE_PRODUCT_RESET });
		}
	}, [dispatch, error, navigate, isUpdated, productId, product, updateError]);

	const updateProductSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("name", name);
		myForm.set("price", price);
		myForm.set("description", description);
		myForm.set("category", category);
		myForm.set("Stock", Stock);

		myForm.set("images", image);

		dispatch(updateProductRes(productId, myForm));
	};

	const updateProductImagesChange = (e) => {
		// setImage();
		// setImagePreview();
		// setOldImages();
		const reader = new FileReader();
		// setOldImages("");
		reader.onloadend = () => {
			if (reader.readyState === 2) {
				setImagePreview(reader.result);
				setImage(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	return (
		<>
			<MetaData title="Create Product" />
			<div className="dashboard">
				<div className="row">
					<div className="col-lg-3">
						<SideBar />
					</div>
					<div className="col-lg-9">
						<div className="newProductContainer">
							<form
								className="createProductForm"
								encType="multipart/form-data"
								onSubmit={updateProductSubmitHandler}>
								<h1>Update Product</h1>

								<div>
									<SpellcheckIcon />
									<input
										type="text"
										placeholder="Product Name"
										required
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div>
									<AttachMoneyIcon />
									<input
										type="number"
										placeholder="Price"
										required
										onChange={(e) => setPrice(e.target.value)}
										value={price}
									/>
								</div>

								<div>
									<DescriptionIcon />

									<textarea
										placeholder="Product Description"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										cols="30"
										rows="1"></textarea>
								</div>

								<div>
									<AccountTreeIcon />
									<select
										value={category}
										onChange={(e) => setCategory(e.target.value)}>
										<option value="">Choose Category</option>
										{categories.map((cate) => (
											<option key={cate} value={cate}>
												{cate}
											</option>
										))}
									</select>
								</div>

								<div>
									<StorageIcon />
									<input
										type="number"
										placeholder="Stock"
										required
										onChange={(e) => setStock(e.target.value)}
										value={Stock}
									/>
								</div>

								<div id="createProductFormFile">
									<input
										type="file"
										name="avatar"
										accept="image/*"
										onChange={updateProductImagesChange}
										multiple
									/>
								</div>

								<div id="createProductFormImage">
									<img src={oldImages.url} alt="Old Product Preview" />
								</div>

								<div id="createProductFormImage">
									<img src={imagePreview} className="img-fuild avatar" />
								</div>

								<Button
									id="createProductBtn"
									type="submit"
									disabled={loading ? true : false}>
									Update
								</Button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UpdateProduct;
