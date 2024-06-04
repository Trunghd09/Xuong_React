import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import s from "./ProductItem.module.scss";
const ProductItem = ({ data }) => {
	return (
		<div className={s.productItem} key={data.id}>
			<Link to={`/data-detail/${data.id}`}>
				<img src={data.thumbnail} alt="" />
			</Link>
			<div className={s.content}>
				<Link to={`/data-detail/${data.id}`}>
					<h2>{data.title}</h2>
				</Link>
				<p>${data.price}</p>
				<p>{data.description}</p>
				<Button className="btn btn-danger" width="100%">
					Add to cart
				</Button>
			</div>
		</div>
	);
};

export default ProductItem;
