import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const featureProducts = ({ product }) => {
	return (
		<>
			<Link to={`/item/${product._id}`}>
				<div className="special-meal">
					<img
						src={product.images.url}
						alt="food"
						className=" productImg img-fluid"
					/>
					<h3>{product.name}</h3>
					<p>{product.description}</p>
				</div>
			</Link>
		</>
	);
};

export default featureProducts;
