import React from "react";
import "./Loader.css"

const Loader = () => {
	return (
		<>
			<div className="loading">
				<lottie-player
					src="https://assets2.lottiefiles.com/packages/lf20_pA5ap551rl.json"
					background="transparent"
					speed="1"
					style={{ width: "200px", height: "200px;" }}
					loop
					autoplay></lottie-player>
			</div>
		</>
	);
};

export default Loader;
