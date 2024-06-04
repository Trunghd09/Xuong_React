import React from "react";
import ProductItem from "../components/ProductItem";

function Home({ data }) {
	return (
		<>
			<h1>Danh sach san pham</h1>
			<div className="row">
				{data.map((item) => (
					<div className="col-12 col-sm-6 col-md-4 col-lg-3">
						<ProductItem data={item} />
					</div>
				))}
			</div>
		</>
	);
}

export default Home;
