import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import Formatprice from "../../Helper/FormatPrice";

const ProductListCard = ({ product }) => {
	const options = {
		name: "half-rating-read",
		defaultValue: product.ratings,
		precision: 0.5,
		readOnly: true,
	};
	return (
		<>
			<Link className="productCard" to={`/item/${product._id}`}>
				<div className="col-lg-12">
					<div class="card border-0 " style={{ width: "540px", zIndex: "-1" }}>
						<div class="row gx-2 justify-content-center">
							<div class="col-md-4">
								<img
									src={product.images.url}
									class="img-fluid rounded-start productListImg"
									alt="..."
								/>
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">{product.name}</h5>
									<p class="card-text">{product.description}</p>
									<p class="card-text">
										<Formatprice price={product.price} />
									</p>

									<div>
										<Rating {...options} />{" "}
										<span> ({product.numOfReviews}) Reviews</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr />
			</Link>
		</>
	);
};

export default ProductListCard;
