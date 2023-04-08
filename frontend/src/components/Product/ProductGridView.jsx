import React from "react";
import ProductCard from "./ProductCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
// import { clearErrors, getProduct } from "../../actions/productAction";
// import { useParams } from "react-router-dom";
// import Loader from "../layout/Loader/Loader";
import Loader from "../Layout/Loader/Loader";
import "./Product.css";

const ProductGridView = (props) => {
	const { currentPage, setCurrentPageNo } = props;
	// console.log(state);
	// const [currentPage, setCurrentPage] = useState(1);
	// const dispatch = useDispatch();
	// const { keyword } = useParams();

	// const { products, loading, error, productsCount, resultPerPage } =
	// 	useSelector((state) => state.products);

	// const setCurrentPageNo = (e, p) => {
	// 	console.log(e, p);
	// 	setCurrentPage(p);
	// };

	// useEffect(() => {
	// 	dispatch(getProduct(keyword, currentPage));
	// }, [dispatch, keyword, currentPage]);
	console.log(currentPage);
	const {
		products,
		loading,

		productsCount,
		resultPerPage,
		filteredProductsCount,
	} = useSelector((state) => state.products);
	let count = filteredProductsCount;
	console.log(`filterProductsCount : ${count}`);

	let Count = productsCount;
	console.log(`Count : ${Count}`);
	let resPerPage = resultPerPage;
	let totalCount = 1;
	while (resPerPage < Count) {
		totalCount++;
		Count -= resPerPage;
	}
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className="products ">
						{count === 0 ? (
							<div className="NoProducts m-auto">Items are not Avialable</div>
						) : (
							<div className="row g-5 justify-content-center">
								{products &&
									products.map((product) => (
										<ProductCard key={product._id} product={product} />
									))}
							</div>
						)}
					</div>

					{resultPerPage < count && (
						<div className="paginationBox d-flex justify-content-center mt-5">
							<Stack spacing={2}>
								<Pagination
									count={totalCount}
									shape="rounded"
									page={currentPage}
									// defaultPage={productsCount}
									// siblingCount={resultPerPage}
									onChange={setCurrentPageNo}
									color="primary"
									showFirstButton
									showLastButton
									size="large"
								/>
							</Stack>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default ProductGridView;
