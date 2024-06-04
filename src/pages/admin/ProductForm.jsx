import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import productSchema from "../../schemaValid/productSchema";
import { useForm } from "react-hook-form";

const ProductForm = ({ onProduct }) => {
	const { id } = useParams();
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({ resolver: zodResolver(productSchema) });

	if (id) {
		useEffect(() => {
			(async () => {
				try {
					const { data } = await instance.get(`/products/${id}`);
					reset(data);
				} catch (error) {
					console.log(error);
				}
			})();
		}, []);
	}

	const onSubmit = (data) => {
		onProduct({ ...data, id });
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>{id ? "Product Edit" : "Product Add"}</h1>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input type="text" className="form-control" id="title" {...register("title", { required: true })} />
					{errors.title?.message && <p className="text-danger">{errors.title?.message}</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="price" className="form-label">
						Price
					</label>
					<input
						type="number"
						className="form-control"
						id="price"
						{...register("price", { required: true, valueAsNumber: true })}
					/>
					{errors.price?.message && <p className="text-danger">{errors.price?.message}</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<input type="text" className="form-control" id="description" {...register("description")} />
					{errors.description?.message && <p className="text-danger">{errors.description?.message}</p>}
				</div>
				<div className="mb-3">
					<button className="btn btn-primary w-100" type="submit">
						{id ? "Product Edit" : "Product Add"}
					</button>
				</div>
			</form>
		</>
	);
};

export default ProductForm;
