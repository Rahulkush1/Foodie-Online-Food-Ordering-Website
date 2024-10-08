import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../action/productAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import Tooltip from "@mui/material/Tooltip";
import Formatprice from "../../Helper/FormatPrice";

import ReviewCard from "./ReviewCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../Layout/MetaData";
import Loader from "../Layout/Loader/Loader";
import "./ProductDetails.css";
import { addItemsToCart } from "../../action/cartAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

// import required modules
import { EffectCube, Pagination } from "swiper/modules";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const options = {
    name: "half-rating-read",
    defaultValue: product.ratings,
    precision: 0.5,
    readOnly: true,
  };

  const ColorButton = styled(Button)({
    "&:hover": {
      backgroundColor: "var(--primary)",
    },
  });
  // const handlequantity = (e) => {
  // 	setQuantity(e.target.value);
  // };
  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Items Add to Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };
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
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} -- foodie`} />
          <div className="ProductDetails">
            <div className="row ProductROW">
              <div className="col-lg-6 productCarousel text-center ">
                {/* <img
                  // 	src={`${product.images.url}`}
                  // 	alt="item "
                  // 	className="img-fluid productimg"
                  // 	/> */}
                <Swiper
                  effect={"cube"}
                  grabCursor={true}
                  cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                  }}
                  pagination={true}
                  modules={[EffectCube, Pagination]}
                  className="mySwiper">
                  {product.images &&
                    product.images.map((item, i) => {
                      console.log(item);
                      return (
                        <SwiperSlide>
                          <img src={item.url} alt={`${i} Slide`} />
                        </SwiperSlide>
                      );
                    })}
                </Swiper>

                {/* <img
									src={`${product.images.url}`}
									alt="item "
									className="img-fluid productimg"
								/> */}
                {/* <Carousel>
								{product.images &&
									product.images.map((item, i) => (
										<img
											className="CarouselImage"
											key={i}
											src={item.url}
											alt={`${i} Slide`}
										/>
									))}
							</Carousel> */}
              </div>
              <div className="col-lg-6  productDetailsBlock  ">
                <div className="detailsBlock-1 ">
                  <h2>{product.name}</h2>
                  <blockquote>
                    <i>
                      Product ID : <span>{product._id}</span>
                    </i>
                  </blockquote>
                  <p className="mb-1">
                    <Rating {...options} style={{ color: "#faaf00" }} />
                    <small>{`(${product.numOfReviews})`}</small>
                  </p>
                  <p>
                    MRP{" "}
                    <span className="fw-bold">
                      {<Formatprice price={product.price} />}
                    </span>{" "}
                  </p>
                </div>
                <div className="detailsBlock-2">
                  <p>
                    Available :
                    <b
                      className={product.Stock < 1 ? "redColor" : "greenColor"}>
                      {product.Stock < 1 ? " Out Of Stock" : " InStock"}
                    </b>
                  </p>

                  <p>
                    Category :{" "}
                    <span className="fw-bold">{product.category}</span>
                  </p>
                </div>

                <hr />
                <div className="detailsBlock-3">
                  <div>
                    {quantity === 1 ? (
                      <Tooltip title="Can't be 0" arrow>
                        <button
                          className="border-0 bg-light "
                          onClick={decreaseQuantity}>
                          <RemoveIcon />
                        </button>
                      </Tooltip>
                    ) : (
                      <Tooltip title="remove" arrow>
                        <button
                          className="border-0 bg-light "
                          onClick={decreaseQuantity}>
                          <RemoveIcon />
                        </button>
                      </Tooltip>
                    )}

                    <input
                      readOnly
                      type="number"
                      value={quantity}
                      className="addToCardInput text-center "
                    />
                    <Tooltip title="Add" arrow>
                      <button
                        className="border-0 bg-light"
                        onClick={increaseQuantity}>
                        <AddIcon />
                      </button>
                    </Tooltip>
                  </div>
                  <ColorButton
                    onClick={addToCartHandler}
                    variant="outlined"
                    disabled={product.Stock < 1 ? true : false}>
                    ADD TO CART
                  </ColorButton>
                </div>
                <hr />
                <div className="detailsBlock-4">
                  <p className="fw-bold fs-5">Description : </p>
                  <p className="product-desc text-secondary">
                    {" "}
                    {product.description}
                  </p>
                  <div className="SubmitReview">
                    <ColorButton
                      variant="outlined"
                      onClick={submitReviewToggle}>
                      SUBMIT REVIEW
                    </ColorButton>
                  </div>{" "}
                </div>
              </div>
            </div>
            <div>
              <h3 className="reviewHeading">REVIEWS</h3>
              <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}>
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                  />

                  <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}></textarea>
                </DialogContent>
                <DialogActions>
                  <Button onClick={submitReviewToggle} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={reviewSubmitHandler} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
              {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <ReviewCard review={review} />
                    ))}
                </div>
              ) : (
                <p className="noReviews"> No Reviews</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
