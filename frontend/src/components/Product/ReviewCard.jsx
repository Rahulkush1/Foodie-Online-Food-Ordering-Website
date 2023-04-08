import React from "react";
import ProfileIcon from "../../images/user-circle.svg";
import { Rating } from "@mui/material";

const ReviewCard = ({ review }) => {
	const options = {
		name: "half-rating-read",
		defaultValue: review.rating,
		// size: window.innerWidth < 600 ? 20 : 25,
		precision: 0.5,
		readOnly: true,
	};
	return (
		<>
			<div className="reviewCard1 " >
				{/* <div className="card reviewCard">
					<img
						src={ProfileIcon}
						className="card-img-top img-fluid profileIcon"
						alt="User"
					/>
					<div className="card-body">
						<h5 className="card-title">{review.name}</h5>
						<Rating {...options} size="small" />
						<p>{review.comment}</p>
					</div>
				</div> */}
				<hr />
				{/* <img src={ProfileIcon} className="profileIcon" alt="User" /> */}
				<div className="d-flex align-items-center  ">
					
					<h5 className="pt-2">{review.name}</h5>
				</div>
				<div>
					<Rating {...options} size="small" />
					<p> {review.comment}</p>
				</div>
				<hr />
			</div>
		</>
	);
};

export default ReviewCard;
