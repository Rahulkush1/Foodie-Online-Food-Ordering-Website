import React, { useEffect, useState } from "react";
import { clearErrors, createProduct } from "../../action/productAction";
import { Button } from "@mui/material";
import MetaData from "../Layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./SideBar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./NewProduct.css";

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  // const [name, setName] = useState("");
  // const [price, setPrice] = useState(0);
  // const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("");
  // const [Stock, setStock] = useState(0);

  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    Stock: 0,
  });
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { name, price, description, Stock, category } = productData;

  const categories = [
    "Fast Food",
    "Pizza",
    "Chinese",
    "South Indian",
    "Noodles",
    "Dosa",
  ];
  // console.log(images);
  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("name", name);
    myform.set("price", price);
    myform.set("description", description);
    myform.set("Stock", Stock);
    myform.set("category", category);
    Array.from(images).forEach((image) => {
      console.log(image)
      myform.append("images", image);
    });
    //   images.forEach((image) => {
    //     myform.append("files", image);
    // });
    // for (let i = 0; i < images.length; i++) {
    //   myform.append("images", images[i]);
    // }
    // console.log(myform);

    dispatch(createProduct(myform));
  };

  const crateProductDataChange = (e) => {
    if (e.target.name === "image") {
      const files = Array.from(e.target.files);
      setImages(e.target.files);
      const previewImages = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            previewImages.push(reader.result);
            setImagesPreview(previewImages);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      const name = e.target.name;
      const value = e.target.value;
      setProductData({ ...productData, [name]: value });
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success]);

  //   const createProductImagesChange = (e) => {
  //     const files = Array.from(e.target.files);

  //     setImages([]);
  //     setImagesPreview([]);

  //     files.forEach((file) => {
  //       const reader = new FileReader();

  //       reader.onload = () => {
  //         if (reader.readyState === 2) {
  //           setImagesPreview((old) => [...old, reader.result]);
  //           setImages((old) => [...old, reader.result]);
  //         }
  //       };

  //       reader.readAsDataURL(file);
  //     });
  //   };

  return (
    <>
      <MetaData title={"Create Product -- Admin"} />
      <div className="dashboard">
        <div className="row">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9 newProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={createProductSubmitHandler}>
              <h1 id="">Create Product</h1>
              <div>
                <SpellcheckIcon />
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={crateProductDataChange}
                />
              </div>
              <div>
                <AttachMoneyIcon />
                <input
                  type="number"
                  name="price"
                  placeholder="Price "
                  required
                  value={price}
                  onChange={crateProductDataChange}
                />
              </div>
              <div>
                <DescriptionIcon />
                <textarea
                  type="text"
                  name="description"
                  placeholder="Product Description"
                  required
                  value={description}
                  onChange={crateProductDataChange}></textarea>
              </div>
              <div>
                <AccountTreeIcon />
                <select onChange={crateProductDataChange} name="category">
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <StorageIcon />
                <input
                  type="number"
                  placeholder="Stock"
                  name="Stock"
                  required
                  value={Stock}
                  onChange={crateProductDataChange}
                />
              </div>
              <div id="createProductFormFile">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={crateProductDataChange}
                  multiple
                />
              </div>

              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>
              <Button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}>
                Create
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
