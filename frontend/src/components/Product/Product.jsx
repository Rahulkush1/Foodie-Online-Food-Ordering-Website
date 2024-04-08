import React, { useEffect, useState } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import {
	clearErrors,
	getProduct,
	gridView,
	listView,
} from "../../action/productAction";
// import Loader from "../layout/Loader/Loader";
// import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
import FilterSection from "./FilterSection";

import ProductGridView from "./ProductGridView";
import ProductListView from "./ProductListView";
import WindowIcon from "@mui/icons-material/Window";
import ViewListIcon from "@mui/icons-material/ViewList";
import MobileViewFilter from "./MobileViewFilter";
// import Loader from "../layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import ProductCard from "./ProductCard";

const Products = () => {
	const { keyword } = useParams();
	const dispatch = useDispatch();
	const [price, setPrice] = useState([0, 5000]);

	const [currentPage, setCurrentPage] = useState(1);
	const [category, setCategory] = useState("");
	const [ratings, setRatings] = useState(0);

	const { products, loading, filteredProductsCount } = useSelector(
		(state) => state.products
	);

	const { view } = useSelector((state) => state.view);

	// let Count = productsCount;
	// let resPerPage = resultPerPage;
	const count = filteredProductsCount;
	const setCurrentPageNo = (e, p) => {
		console.log(e, p);
		setCurrentPage(p);
	};

	// let totalCount = 1;
	// while (resPerPage < Count) {
	// 	totalCount++;
	// 	Count -= resPerPage;
	// }

	const priceHandler = (e, newPrice) => {
		setPrice(newPrice);
	};

	const ratingHandler = (e, newRating) => {
		setRatings(newRating);
	};

	// const CategoryHandler = () => {
	// 	setCategory(category);
	// 	console.log(`Category -> ${category}`);
	// };

	const GridView = () => {
		dispatch(gridView());
	};

	const ListView = () => {
		dispatch(listView());
	};
	console.log(category);
	useEffect(() => {
		dispatch(getProduct(keyword, currentPage, price, category, ratings));
	}, [dispatch, keyword, currentPage, price, category, ratings]);
	return (
		<>
			<MetaData title="Items -- foodie" />
			<h1 className="productHeading">Products</h1>
			<div className="">
				<div className="row mx-4 ">
					<div className="col-lg-3">
						<div className="mainFilter">
							<FilterSection
								price={price}
								priceHandler={priceHandler}
								// categories={categories}
								setCategory={setCategory}
								rating={ratings}
								ratingHandler={ratingHandler}
							/>
						</div>
						<div className="MobileFilters">
							<MobileViewFilter
								price={price}
								priceHandler={priceHandler}
								// categories={categories}
								setCategory={setCategory}
								rating={ratings}
								ratingHandler={ratingHandler}
							/>
						</div>
					</div>
					<div className="col-lg-9 ">
						<div className="row ">
							<div className="col-lg-12">
								<div className="sort-filter  ">
									<div className="row align-items-center">
										<div className="col-lg-4 col-md-4 col-sm-6 mt-3">
											<button
												onClick={GridView}
												className={view === "grid" ? " activeGrid " : ""}>
												<WindowIcon className="" />
											</button>
											<button
												onClick={ListView}
												className={view === "list" ? "   activeList" : ""}>
												<ViewListIcon />
											</button>
										</div>
										<div className="col-lg-4 col-md-4 col-sm-6">
											<div>
												<h5 className="productsCount">
													Products Found : {count}
												</h5>
											</div>
										</div>
									</div>
								</div>
								<div className="main-product">
									{view === "grid" ? (
										<ProductGridView
											products={products}
											currentPage={currentPage}
											setCurrentPageNo={setCurrentPageNo}
										/>
									) : (
										<ProductListView
											products={products}
											currentPage={currentPage}
											setCurrentPageNo={setCurrentPageNo}
										/>
									)}
									{/* <div className="row g-5 justify-content-center">
										{products.map((product) => (
											<ProductCard key={product._id} product={product} />
										))}
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Products;
