import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CartItemCard = ({ item, deleteCartItems }) => {
	const ColorButton = styled(Button)({
		"&:hover": {
			backgroundColor: "var(--secondary)",
		},
	});
	return (
		<>
			<div className="col-lg-6 col-md-6 col-4 col-sm-6">
				<div class="card mb-3 mt-3 CartItemCard border-0">
					<div class="row g-0">
						<div class="col-md-4 col-sm-12 col-12 m-auto">
							<img
								src={item.images}
								class="img-fluid rounded-start productCartimg"
								alt="..."
							/>
						</div>
						<div class="col-md-8  col-sm-12 col-12 ">
							<div class="card-body ">
								<Link
									to={`/item/${item.product}`}
									className="text-decoration-none text-dark">
									<h5 class="card-title CartProductName">{item.name}</h5>
								</Link>

								<div className="SubmitReview">
									<ColorButton
										variant="outlined"
										className="cartRemovebtn"
										onClick={() => deleteCartItems(item.product)}>
										{" "}
										Remove
									</ColorButton>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CartItemCard;
