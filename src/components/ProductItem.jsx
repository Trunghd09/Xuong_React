import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import s from "./ProductItem.module.scss";
const ProductItem = ({ data }) => {
  return (
    <div key={data.id} className={s.productItem}>
      <Link to={`/product-detail/${data.id}`}>
        <img src={data.thumbnail} alt="" />
      </Link>
      <div className={s.content}>
        <Link to={`/product-detail/${data.id}`}>
          <h2>{data.title}</h2>
        </Link>
        <p>${data.price}</p>
        <p>{data.description}</p>
        <Button width="100%" className="btn btn-danger">
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
