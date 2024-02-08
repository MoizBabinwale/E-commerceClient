import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../actions/ProductActions";

function DetailPage() {
  const [productData, setProductData] = useState([]);
  const { productId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, []);
  const productDetail = useSelector((state) => state.singleProductData);
  useEffect(() => {
    console.log(productDetail);
    if (productDetail.productData) {
      var product = productDetail.productData.product;
      setProductData(product);
    }
  }, [productDetail]);

  return (
    <div className="bg-red-500 pt-20">
      <p>{productData.name}</p>
    </div>
  );
}

export default DetailPage;
