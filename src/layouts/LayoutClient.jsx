import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LayoutClient = ({ children, data }) => {
	console.log(data);
	return (
		<>
			<Header />
			<main className="container">{children}</main>
			<Footer />
		</>
	);
};

export default LayoutClient;
