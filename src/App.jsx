import React, { useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Notfound from "./pages/Notfound";
import instance, { getProducts } from "./axios";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/admin/Dashboard";
import ProductAdd from "./pages/admin/ProductAdd";
import ProductEdit from "./pages/admin/ProductEdit";
import ProductForm from "./pages/admin/ProductForm";
import Register from "./pages/Register";

function App() {
	const [products, setProducts] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const { data } = await instance.get("/products");
				console.log(data);
				setProducts(data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	// const handleSubmit = (data) => {
	// 	(async () => {
	// 		try {
	// 			const res = await instance.post("/products", data);
	// 			setProducts([...products, res.data]);
	// 			if (confirm("Add product successfully, redirect to admin page!")) {
	// 				navigate("/admin");
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	})();
	// };

	// const handleSubmitEdit = (data) => {
	// 	(async () => {
	// 		try {
	// 			await instance.patch(`/products/${data.id}`, data);
	// 			const newData = await getProducts();
	// 			// setProducts(products.map((p) => (p.id === data.id ? data : p)));
	// 			setProducts(newData);
	// 			if (confirm("Edit product successfully, redirect to admin page!")) {
	// 				navigate("/admin");
	// 				// window.location.href = "/admin"
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	})();
	// };
	const handleSubmitForm = (data) => {
		(async () => {
			try {
				if(data.id) {
					//logic cho edit
					await instance.patch(`/products/${data.id}`, data);
				const newData = await getProducts();
			
				setProducts(newData);
				}else{
					//logic cho thêm
					const res = await instance.post("/products", data);
				setProducts([...products, res.data]);
				}
				
				if (confirm("successfully, redirect to admin page!")) {
					navigate("/admin");
				}
			} catch (error) {
				console.log(error);
			}
		})();
	};
	return (
		<>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Home data={products} />} />
					<Route path="/home" element={<Navigate to="/" />} />
					<Route path="/product-detail/:id" element={<ProductDetail />} />
					<Route path="/about" element={<About />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/admin" element={<Dashboard data={products} />} />
					{/* <Route path="/admin/product-add" element={<ProductAdd onAdd={handleSubmit} />} />
					<Route path="/admin/product-edit/:id" element={<ProductEdit onEdit={handleSubmitEdit} />} /> */}
					<Route path="/admin/product-form/" element={<ProductForm onProduct={handleSubmitForm} />} />
					<Route path="/admin/product-form/:id" element={<ProductForm onProduct={handleSubmitForm} />} />
					<Route path="*" element={<Notfound />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}

export default App;