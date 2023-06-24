import React, { useContext, useEffect, useState } from "react";
import { storeContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import Lodging from "../Lodging/Lodging";


export default function Cart() {
  const notify = (msg, type) => {
    toast[type](msg);
  };

  let { getUserCart, removeCart, UpdateCart, updateGetUserCart } =
    useContext(storeContext);
  let [cart, setCart] = useState([]);
  let [totalPrice, setotalPrice] = useState([]);
  //getCart
  async function getCart() {
    let token = localStorage.getItem("token");
    if (token) {
      let response = await getUserCart(token);
      setCart(response.data.data.products);
      setotalPrice(response.data.data.totalCartPrice);
      console.log(response);
    }
  }
  //deleteProduct
  async function deleteProduct(productId) {
    let token = localStorage.getItem("token");
    if (token) {
      let response = await removeCart(token, productId);
      setCart(response.data.data.products);
      setotalPrice(response.data.data.totalCartPrice);
      notify("Product delete", "error");
      console.log(response);
      updateGetUserCart();
    }
  }

  async function UpdateCartItem(productId, count) {
    let token = localStorage.getItem("token");
    if (token) {
      let response = await UpdateCart(token, productId, count);
      setCart(response.data.data.products);
      setotalPrice(response.data.data.totalCartPrice);
      notify("Product Update", "success");
      console.log(response);
    }
  }

  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      {cart.length != 0 ? (
        <div className="container">
          <div className="bg-main-light p-5 my-3 ">
            <h2>shop cart</h2>
            <h6 className="text-main my-3 fw-bold fs-5">
              Total cart price : {totalPrice} ${" "}
            </h6>
            {cart.map((item) => {
              return (
                <div key={item._id} className="row border-bottom my-5">
                  <div className="col-md-2 p-3">
                    <img
                      src={item.product.imageCover}
                      alt=""
                      className="w-100"
                    />
                  </div>
                  <div className="col-md-10 d-flex justify-content-between">
                    <div>
                      <h6> {item.product.title}</h6>
                      <h6 className="text-main fs-6"> {item.price} $</h6>
                      <button
                        className="text-danger btn"
                        onClick={() => deleteProduct(item.product._id)}
                      >
                        <i className="fa-solid fa-trash fs-4"></i> remove
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          UpdateCartItem(item.product._id, item.count + 1)
                        }
                        className="btn fs-3 border  p-2 border-success m-2"
                      >
                        +
                      </button>
                      <span> {item.count}</span>
                      <button
                        onClick={() =>
                          UpdateCartItem(item.product._id, item.count - 1)
                        }
                        className="btn fs-3 border p-2  border-success m-2"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Lodging />
      )}
    </>
  );
}
