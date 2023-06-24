import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../BURL/BURL";
import Product from "../Product/Product";
import Lodging from "../Lodging/Lodging";

export default function Products() {
  const [Products, setProducts] = useState([]);
  const getAllProducts = () => {
    let { data } = axios.get(`${baseUrl}/products`).then((data) => {
      // console.log(data.data.data);
      setProducts(data.data.data);
    });
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <div className="container">
        {Products.length != 0 ? (
          <div className="row">
            <Product Products={Products} />
          </div>) : ( <Lodging /> ) }
      </div>
    </>
  );
}
