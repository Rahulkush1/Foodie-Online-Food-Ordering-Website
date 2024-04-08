import React from "react";
import { Carousel } from "antd";
import bg1 from "../../images/bg1.jpg";
import bg2 from "../../images/bg2.jpg";
import bg3 from "../../images/bg3.jpg";


const HeroSlider = () => {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={bg1} className="d-block w-100 bg-image " alt="..." />
          <div className="carousel-caption d-none d-md-block bg-text" data-aos="zoom-in-right">
            <h5 className="fs-1">Indulge in Indian Delicacies from the Comfort of Your Home</h5>
            <p className="fs-4">Explore Our Online Menu and Treat Yourself to the Flavors of India, Delivered to Your Doorstep!.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={bg2} className="d-block w-100 bg-image" alt="..." />
          <div className="carousel-caption d-none d-md-block bg-text" data-aos="zoom-in-right">
            <h5 className="fs-1">Satisfy Your Cravings: Order Indian Flavors for Delivery Today</h5>
            <p className="fs-4"> Discover a World of Spice and Tradition with Our Online Food Ordering Service!.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={bg3} className="d-block w-100 bg-image" alt="..." />
          <div className="carousel-caption d-none d-md-block bg-text" data-aos="zoom-in-right">
            <h5 className="fs-1">Flavors of India, Delivered to Your Doorstep</h5>
            <p className="fs-4">Order Now for a Taste Sensation from the Heart of Indian Cuisine!.</p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
export default HeroSlider;
