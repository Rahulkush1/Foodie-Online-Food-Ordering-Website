import React, { useEffect, useState } from "react";

import burger from "../../images/burger.png";
import spag from "../../images/spag.png";
import meatBalls from "../../images/meat-balls.png";
import appStoreBadge from "../../images/AppStoreBadge.svg";
import googleplayBadge from "../../images/GooglePlayBadge.svg";
import noodles from "../../images/noodles.png";
import { useSelector, useDispatch } from "react-redux";

// import { Link } from "react-router-dom";
import "./Home.css";
import { clearErrors, getProduct } from "../../action/productAction";
import { toast } from "react-toastify";
import featureProducts from "./featureProducts";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import { Link } from "react-router-dom";
import HeroSlider from "./HeroSlider";
import video from "../../images/video1.mp4";

const Home = () => {
  const special_meals = [
    {
      meal: "Stir fry Pasta",
      meal_description: "Stir fry pasta yada yada yada because of Sesan",
      meal_image: spag,
    },
    {
      meal_image: meatBalls,
      meal: "Meat Balls",
      meal_description: "Stir fry pasta yada yada yada because of Sesan",
    },
    {
      meal_image: burger,
      meal: "Burger Meal",
      meal_description: "Stir fry pasta yada yada yada because of Sesan",
    },
  ];
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Foodie" />

          <div>
            <div className="home-body">
              <div className="main-container">
                <HeroSlider />
                <div
                  className="main-section-1"
                  data-aos="fade-right"
                  data-aos-offset="500"
                  data-aos-delay="50"
                  data-aos-easing="ease-in-sine"
                >
                  <header>
                    <div className="row ">
                      <div className="col-lg-9 col-md-9 main-content-left">
                        <div>
                          <h2 className="jumbotron ">
                            Order food anytime, anywhere
                          </h2>
                          <p className="jumbotron-subtext">
                            Browse from our list of specials to place your order
                            and have food delivered to you in no time.
                            Affordable, tasty and fast!
                          </p>
                          <div className="download-btns">
                            <div className="cta-btn">
                              <img
                                src={googleplayBadge}
                                alt="google-play-badge"
                              />
                            </div>
                            <div className="cta-btn">
                              <img src={appStoreBadge} alt="app-store-badge" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 main-content-right">
                        <div>
                          <img
                            src={noodles}
                            alt="noodles"
                            className=" header-img img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </header>
                </div>
                {/* main */}
                <main>
                  <div className="main-content text-center">
                    <h1 className="main-header text-center mt-3">
                      Special Meals of the day!
                    </h1>
                    <p className="main-subtext text-center">
                      Check our sepecials of the day and get discounts on all
                      our meals and swift delivery to what ever location within
                      Ilorin.
                    </p>
                    <div
                      className="meals-container"
                      data-aos="flip-up"
                      data-aos-offset="500"
                      data-aos-delay="50"
                      data-aos-easing="ease-in-sine"
                    >
                      {/* {products &&
										products.map((product, index) => (
											<Product product={product} key={index} />
										))} */}
                      {/* {products &&
										products.map((product, index) => (
											<featureProducts product={product} key={index} />
										))} */}
                      <div>
                        <div className="row g-5">
                          {products &&
                            products.map((product, index) => {
  

                                return   (
                                  <div className="col-lg-4  col-sm-6 ">
                                    <Link
                                      className="text-decoration-none"
                                      to={`/item/${product._id}`}
                                    >
                                      <div
                                        class="card border-0 special-meal-card"
                                        style={{ width: "18rem;" }}
                                      >
                                        <img
                                          src={product.images.url}  
                                          class="card-img-top productImg"
                                          alt="..."
                                        />
                                        <div class="card-body">
                                          <h5 class="card-title text-light">
                                            {product.name}
                                          </h5>
                                          <p class="card-text">
                                            {product.description}
                                          </p>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                );
                              
                            })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="contact-section"
                    data-aos="fade-right"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine"
                  >
                    <div className="mailist-section mx-5">
                      <div className="row align-items-center">
                        <div className="col-lg-8 ">
                          <div className="mailist-left">
                            <h2 className="mailist-header">
                              Get notified when we update!
                            </h2>
                            <p className="mailist-subtext w-75">
                              Get notified when we add new items to our specials
                              menu, update our price list of have promos!
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4 ">
                          <input
                            type="text"
                            placeholder="gregphillips@gmail.com"
                            className="email"
                          ></input>
                          <button className="email-btn">Get notified</button>
                        </div>
                      </div>
                      <div className=""></div>
                      <div></div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
