import React from "react";
import FilterSection from "./FilterSection";
import "./FilterSection.css";

const MobileViewFilter = (props) => {
	const { price, priceHandler, setCategory, rating, ratingHandler } = props;
	return (
		<>
			<div className="MobileFilter ">
				<button
					class="btn filterButton"
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#offcanvasExample"
					aria-controls="offcanvasExample">
					Filters
				</button>

				<div
					class="offcanvas offcanvas-start"
					tabindex="-1"
					id="offcanvasExample"
					aria-labelledby="offcanvasExampleLabel">
					<div class="offcanvas-header">
						<h5 class="offcanvas-title" id="offcanvasExampleLabel">
							Offcanvas
						</h5>
						<button
							type="button"
							class="btn-close text-reset"
							data-bs-dismiss="offcanvas"
							aria-label="Close"></button>
					</div>
					<div class="offcanvas-body">
						<div>
							<FilterSection
								price={price}
								priceHandler={priceHandler}
								// categories={categories}
								setCategory={setCategory}
								rating={rating}
								ratingHandler={ratingHandler}
							/>
						</div>
						<div class="dropdown mt-3"></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MobileViewFilter;
