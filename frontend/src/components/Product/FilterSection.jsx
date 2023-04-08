import React, { useState } from "react";
import { Slider } from "@mui/material";
import Typography from "@mui/material/Typography";

// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { clearErrors, getProduct } from "../../actions/productAction";
import { styled } from "@mui/material/styles";
import "./FilterSection.css";
const PrettoSlider = styled(Slider)({
	color: "var(--primary)",
	height: 3,
	"& .MuiSlider-track": {
		border: "none",
	},
	"& .MuiSlider-thumb": {
		height: 15,
		width: 15,
		backgroundColor: "tomato",
		border: "2px solid currentColor",
		"&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
			boxShadow: "inherit",
		},
		"&:before": {
			display: "none",
		},
	},
	"& .MuiSlider-valueLabel": {
		lineHeight: 1.2,
		fontSize: 11,
		background: "unset",
		padding: 10,
		width: 40,
		height: 40,
		borderRadius: "50% 50% 50% 0",
		backgroundColor: "tomato",
		transformOrigin: "bottom left",
		transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
		"&:before": { display: "none" },
		"&.MuiSlider-valueLabelOpen": {
			transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
		},
		"& > *": {
			transform: "rotate(45deg)",
		},
	},
});

const categories = [
	"Fast Food",
	"Pizza",
	"Chinese",
	"South Indian",
	"Noodles",
	"Dosa",
];

function valuetext(value) {
	return `${value}°C`;
}

const FilterSection = (props) => {
	// const [price, setPrice] = useState([0, 25000]);
	// const dispatch = useDispatch();
	// const priceHandler = (e, newPrice) => {
	// 	setPrice(newPrice);
	// };
	const { price, priceHandler, setCategory, ratings, ratingHandler } = props;

	// useEffect(() => {
	// 	dispatch(getProduct(price));
	// }, [dispatch, price]);

	return (
		<>
			<div className="filterBox">
				<hr />
				<Typography>Price</Typography>
				<PrettoSlider
					size="small"
					value={price}
					onChange={priceHandler}
					valueLabelDisplay="auto"
					aria-labelledby="pretto slider"
					min={0}
					max={5000}></PrettoSlider>
				<hr />

				<Typography>Categories</Typography>
				<ul className="categoris">
					{categories.map((category) => (
						<li
							className="category-link"
							key={category}
							onClick={() => {
								setCategory(category);
							}}>
							{category}
						</li>
					))}
				</ul>
				<hr />

				<fieldset>
					<Typography component="legend">Ratings </Typography>

					<Slider
						aria-label="Small steps"
						// getAriaValueText={valuetext}
						step={1}
						marks
						min={0}
						max={5}
						valueLabelDisplay="auto"
						value={ratings}
						onChange={ratingHandler}
					/>
				</fieldset>
			</div>
		</>
	);
};

export default FilterSection;
