import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../../context/StoreContext";
import { notify } from "../../Utils/notify";

export default function Product({ Products }) {
  let { addToCart, updateGetUserCart } = useContext(storeContext);
  async function addProduct(productId) {
    let token = localStorage.getItem("token");
    if (token) {
      let response = await addToCart(token, productId);
      if (response.status == 200) {
        updateGetUserCart();
        notify("Product added successfully to your cart" ,'success');
      }
      console.log(response);
    } else {
      alert("you are not logging");
    }
  }

  return (
    <>
      {Products.map((item) => {
        return (
          <>
            <div key={item._id} className="col-md-2 mt-5">
              <div className="product">
                <Link
                  to={"/productDetails/" + item._id}
                  className="text-decoration-none text-dark"
                >
                  <img src={item.imageCover} alt="" className="w-100  shadow" />
                  <h6 className="text-main mt-4">{item.category.name}</h6>
                  <p className="fw-bold mt-0">
                    {" "}
                    {item.title.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <div className="d-flex  justify-content-between align-content-center my-4">
                    <span className="text-main mt-0 mb-1 fw-bold">
                      {item.price} $
                    </span>
                    <div>
                      <i className="fas fa-star rating-color"></i>
                      {item.ratingsAverage}
                    </div>
                  </div>{" "}
                </Link>
                <button
                  onClick={() => addProduct(item._id)}
                  className="bg-main text-white w-100 btn my-2 "
                >
                  add to card
                </button>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
