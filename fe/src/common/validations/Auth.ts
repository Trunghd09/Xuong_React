import { z } from "zod";

export const Signin = z.object({
    email: z
        .string()
        .email({ message: "Trường email không hợp lệ" })
        .nonempty({ message: "Trường email không được để trống" }),
    password: z
        .string()
        .min(6, { message: "Trường password phải có ít nhất 6 ký tự" })
        .max(30, { message: "Trường password không được vượt quá 30 ký tự" })
        .nonempty({ message: "Trường password không được để trống" }),
});
export const useSignupSchema = () =>
    z
        .object({
            email: z
                .string()
                .email({ message: "Trường email không hợp lệ" })
                .nonempty({ message: "Trường email không được để trống" }),
            name: z.string().nonempty({ message: "Tên không được để trống" }),
            password: z
                .string()
                .min(6, { message: "Trường password phải có ít nhất 6 ký tự" })
                .max(30, {
                    message: "Trường password không được vượt quá 30 ký tự",
                })
                .nonempty({ message: "Trường password không được để trống" }),
            confirmPassword: z.string().nonempty({
                message: "Trường confirmPassword không được để trống",
            }),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Password và confirmPassword phải giống nhau",
            path: ["confirmPassword"],
        });
