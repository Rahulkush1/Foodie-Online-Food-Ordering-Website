import React from "react";
import social1 from "../../../images/Social-Icons.svg";
import social2 from "../../../images/Social-Icons-1.svg";
import social3 from "../../../images/Social-Icons-2.svg";

import appStoreBadge from "../../../images/AppStoreBadge.svg";
import googleplayBadge from "../../../images/GooglePlayBadge.svg";
import "./Footer.css";

const Footer = () => {
	const year = new Date();

	return (
		<>
			<footer id="footer">
				<div className="footer-top">
					<div className="footer-item">
						<h4 className="footer-header">Company</h4>
						<ul className="items-container">
							<li className="item">About Us</li>
							<li className="item">Careers</li>
							<li className="item">Contact Us</li>
						</ul>
					</div>

					<div className="footer-item">
						<h4 className="footer-header">Support</h4>
						<ul className="items-container">
							<li className="item">Help Center</li>
							<li className="item">Safety Center</li>
						</ul>
					</div>

					<div className="footer-item">
						<h4 className="footer-header">Legal</h4>
						<ul className="items-container">
							<li className="item">Cookies Policy</li>
							<li className="item">Privacy Policy</li>
							<li className="item">Terms of Service</li>
							<li className="item">Dispute resolution</li>
						</ul>
					</div>

					<div className="footer-item">
						<h4 className="footer-header">Install</h4>
						<ul className="items-container">
							<li className="item">
								<img src={googleplayBadge} alt="appstorebadge" />
							</li>
							<li className="item">
								<img src={appStoreBadge} alt="playstorebadge" />
							</li>
						</ul>
					</div>
				</div>
				<div className="footer-bottom">
					<p>© {year.getFullYear()}  FOODIE, All rights reserved</p>
					<div className="socials">
						<img src={social1} alt="instagram" className="soial-icon" />
						<img src={social2} alt="twitter" className="soial-icon" />
						<img src={social3} alt="youtube" className="soial-icon" />
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
