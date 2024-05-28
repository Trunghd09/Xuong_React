import React from "react";

function Home({ data }) {
	return (
		<>
			<h1>Danh sach san pham</h1>
			{data.map((product) => (
				<div key={product.id} className="card">
					<img src={product.thumbnail} alt="" />
					<h2>{product.name}</h2>
					<p>${product.price}</p>
					<p>{product.description}</p>
					<button className="btn btn-danger">Add to cart</button>
				</div>
			))}
		</>
	);
}

export default Home;
