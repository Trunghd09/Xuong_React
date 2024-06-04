import * as z from "zod";

const authSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});
export default authSchema;
