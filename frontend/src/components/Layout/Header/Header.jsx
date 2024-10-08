import React from "react";
import logo from "../../../images/logo.png";

import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../action/userAction";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isAuthenticated: restaurantAuth } = useSelector(
    (state) => state.restaurant
  );

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    // navigate("/login");
  }

  return (
    <>
      {/* <div className="home-body">
				<div className="container">
					<nav className="navbar">
						<div className="brand ">
							<img src={logo} className="brand-logo" alt="logo" />
							<p className="brand-name ">foodie</p>
							<small className="text-light">anytime anywhere</small>
						</div>

						<div className="nav-links">
							<ul>
								<Link to={"/"} className="link-tag">
									<li className="nav-link" id="home-link">
										Home
									</li>
								</Link>

								{isAuthenticated && (
									<Link to={"/items"} className="link-tag">
										<li className="nav-link" id="food-link">
											Food
										</li>
									</Link>
								)}
								{isAuthenticated && (
									<Link to={"/about"} className="link-tag">
										<li className="nav-link" id="about-link">
											About
										</li>
									</Link>
								)}
								{isAuthenticated && (
									<Link to={"/contact"} className="link-tag">
										<li className="nav-link" id="contact-link">
											Contact
										</li>
									</Link>
								)}
								{isAuthenticated ? (
									<Link to={"/logout"} className="link-tag">
										<li className="nav-link" id="signup-link">
											Logout
										</li>
									</Link>
								) : (
									<Link to={"/login"} className="link-tag">
										<li className="nav-link" id="login-link">
											Login
										</li>
									</Link>
								)}
								{isAuthenticated ? (
									<div></div>
								) : (
									<Link to={"/register"} className="link-tag">
										<li className="nav-link" id="signup-link">
											Sign Up
										</li>
									</Link>
								)}
							</ul>
						</div>
					</nav>
					
				</div>
			</div> */}
      <div className="nav-body">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg bg-body-tertiary ">
            <div className="container-fluid text-center">
              <Link className="navbar-brand text-light text-center" to={"/"}>
                <img
                  src={logo}
                  alt="Logo"
                  width="60"
                  height="50"
                  className="d-inline-block "
                />
                <span className="text-center ">foodie</span>
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"/"}>
                      Home
                    </Link>
                  </li>
                  {isAuthenticated && (
                    <li className="nav-item">
                      <Link className="nav-link" to={"/items"}>
                        Dishes
                      </Link>
                    </li>
                  )}
                  {isAuthenticated &&
                    !restaurantAuth &&
                    user.role === "restaurant" && (
                      <li className="nav-item">
                        <Link className="nav-link" to={"/restaurant/register"}>
                          Register Restauarnt
                        </Link>
                      </li>
                    )}

                  <li className="nav-item">
                    <Link className="nav-link" to={"/about"}>
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/contact"}>
                      Contact
                    </Link>
                  </li>

                  {isAuthenticated ? (
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/login"
                        id="signup-link"
                        onClick={logoutUser}>
                        Logout
                      </Link>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link className="nav-link" to="/login" id="signup-link">
                        Login
                      </Link>
                    </li>
                  )}

                  {isAuthenticated ? (
                    <div></div>
                  ) : (
                    <li className="nav-item ">
                      <Link
                        to={"/register"}
                        className="nav-link"
                        id="signup-link">
                        SignUp
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
