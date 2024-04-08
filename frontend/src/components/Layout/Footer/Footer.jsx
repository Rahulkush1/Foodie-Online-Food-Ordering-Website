

import appStoreBadge from "../../../images/AppStoreBadge.svg";
import googleplayBadge from "../../../images/GooglePlayBadge.svg";
import "./Footer.css";
import React from "react";


const Footer = () => {
	const year = new Date();

  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={googleplayBadge} alt="playstore" />
        <img src={appStoreBadge} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>Foodie</h1>
        <p> Food Quality and Taste is our first priority</p>

        <p>Copyrights {year.getFullYear()}  &copy; Rahulkushwaha</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="#">Instagram</a>
        <a href="#">Youtube</a>
        <a href="#">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;