import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../BURL/BURL";
import { notify } from "../../Utils/notify";
import { storeContext } from "../../context/StoreContext";
import Lodging from "../Lodging/Lodging";

export default function ProductDetails() {
  let { addToCart, updateGetUserCart } = useContext(storeContext);


    async function addProduct(productId) {
      let token = localStorage.getItem("token");
      if (token) {
        let response = await addToCart(token, productId);
        if (response.status == 200) {
          updateGetUserCart();
          notify("Product added successfully to your cart", "success");
        }
        console.log(response);
      } else {
        alert("you are not logging");
      }
    }
  let { id } = useParams();
  // console.log(id);

  const [ProductDetails, setProductDetails] = useState([]);
  const getProductDetails = () => {
    let { data } = axios.get(`${baseUrl}/products/${id}`).then((data) => {
      console.log(data.data.data.category.slug);
      setProductDetails(data.data.data);
    });
  };

  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <>
      {ProductDetails != 0 ? (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-3 ">
              <img
                src={ProductDetails.imageCover}
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-md-8 offset-1">
              <h2 className="">{ProductDetails.title}</h2>
              <p className="mt-4 text-muted">{ProductDetails.description}</p>
              <div className="d-flex  justify-content-between align-content-center my-4">
                <span className="text-main mt-0 mb-1 fw-bold">
                  {ProductDetails.price} $
                </span>
                <div>
                  <i className="fas fa-star rating-color"></i>
                  {ProductDetails.ratingsAverage}
                </div>
              </div>{" "}
              <button
                onClick={() => addProduct(ProductDetails._id)}
                className="bg-main text-white w-100 btn my-2 "
              >
                add to card
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Lodging />
      )}
    </>
  );
}
