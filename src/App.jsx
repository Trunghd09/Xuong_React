import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import instance, { getProducts } from "./axios";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Dashboard from "./pages/admin/Dashboard";
import ProductForm from "./pages/admin/ProductForm";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notfound from "./pages/Notfound";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";

function App() {
	const [products, setProducts] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const { data } = await instance.get("/products");
				setProducts(data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const handleSubmitForm = (data) => {
		(async () => {
			try {
				if (data.id) {
					// logic cho edit product
					await instance.patch(`/products/${data.id}`, data);
					const newData = await getProducts();
					setProducts(newData);
				} else {
					// logic cho add product
					const res = await instance.post("/products", data);
					setProducts([...products, res.data]);
				}
				if (confirm("Successfully, redirect to admin page!")) {
					navigate("/admin");
				}
			} catch (error) {
				console.log(error);
			}
		})();
	};

	const handleRemove = (id) => {
		console.log(id);
		(async () => {
			try {
				if (confirm("Are yout sure?")) {
					await instance.delete(`/products/${id}`);
					const newData = products.filter((item) => item.id !== id && item);
					setProducts(newData);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	};
	console.log(<Header />);
	return (
		<>
			<Header />
			<main>
				<Routes>
					{/* path for client */}
					<Route index element={<Home data={products} />} />
					<Route path="/home" element={<Navigate to="/" />} />
					<Route path="/product-detail/:id" element={<ProductDetail />} />
					<Route path="/about" element={<About />} />

					{/* path for admin */}
					<Route path="/admin" element={<Dashboard data={products} remove={handleRemove} />} />
					<Route path="/admin/product-form" element={<ProductForm onProduct={handleSubmitForm} />} />
					<Route path="/admin/product-form/:id" element={<ProductForm onProduct={handleSubmitForm} />} />

					{/* path empty */}
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<Notfound />} />
				</Routes>
			</main>

			<Footer />
		</>
	);
}

export default App;
