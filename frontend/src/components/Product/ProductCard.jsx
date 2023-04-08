import React from "react";
import { Link } from "react-router-dom";
// import { Rating } from "react-simple-star-rating";
import { Rating } from "@mui/material";
import Formatprice from "../../Helper/FormatPrice";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
	const options = {
		name: "half-rating-read",
		defaultValue: product.ratings,
		precision: 0.5,
		readOnly: true,
	};

	return (
		<div className="col-lg-4 col-md-4 col-sm-6 ">
			<Link className="productCard" to={`/item/${product._id}`}>
				<div className="card  m-auto">
					<img
						src={product.images.url}
						className="card-img-top product-img "
						alt="ProductImg Img"
					/>
					<div className="card-body">
						<h5 className="card-title">{product.name}</h5>
						<p className="card-text">
							<div>
								<Rating {...options} />{" "}
								<span> ({product.numOfReviews}) Reviews</span>
							</div>
							<div className="d-flex my-2 justify-content-between">
								<span className="restaurantName ">
									{product.restaurantName}
								</span>

								<span className="productPrice">
									{<Formatprice price={product.price} />}
								</span>
							</div>
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default ProductCard;
