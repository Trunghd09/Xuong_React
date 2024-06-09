import * as z from "zod";

const productSchema = z.object({
	title: z.string().min(5).max(100),
	price: z.number().min(0),
	description: z.string().optional(),
});
export default productSchema;