import React from "react";
import { BackwardFilled, Loading3QuartersOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import instance from "@/configs/axios";
import { ZodError } from "zod";
import { useSignupSchema } from "@/common/validations/Auth"; // Import schema từ file validation

type FieldType = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

const Signup_Form = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const SignupSchema = useSignupSchema(); // Import schema validation

    const { mutate, isPending } = useMutation({
        mutationFn: async (signup: FieldType) => {
            try {
                // Gửi yêu cầu đến API signup
                const response = await instance.post("/auth/signup", signup);
                return response.data;
            } catch (error: any) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.messages
                ) {
                    throw new Error(error.response.data.messages.join(", "));
                }
                throw new Error("Đăng ký thất bại");
            }
        },
        onSuccess: (data) => {
            messageApi.open({
                type: "success",
                content: data.message || "Đăng Ký thành công",
            });
            form.resetFields();
            alert("Đăng Ký Thành Công");
            navigate("/signin");
        },
        onError: (error: any) => {
            messageApi.open({
                type: "error",
                content: error.message,
            });
        },
    });

    const onFinish = async (values: FieldType) => {
        try {
            SignupSchema.parse(values);
            mutate(values);
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = zodErrorsToAntdErrors(error);
                form.setFields(
                    Object.keys(errors).map((field) => ({
                        name: field,
                        errors: errors[field],
                    })),
                );
            } else {
                messageApi.open({
                    type: "error",
                    content: "Dữ liệu không hợp lệ",
                });
            }
        }
    };

    const zodErrorsToAntdErrors = (error: ZodError) => {
        const antdErrors: Record<string, string[]> = {};
        error.errors.forEach((err) => {
            if (err.path.length > 0) {
                const path = err.path[0];
                if (!antdErrors[path]) {
                    antdErrors[path] = [];
                }
                antdErrors[path].push(err.message);
            }
        });
        return antdErrors;
    };

    return (
        <>
            {contextHolder}
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold">Đăng Ký</h1>
                <Button type="primary">
                    <Link to={"/"}>
                        <BackwardFilled />
                        Quay lại
                    </Link>
                </Button>
            </div>
            <div className="max-w-4xl mx-auto">
                <Form
                    form={form}
                    name="signup"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    disabled={isPending}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Tên là bắt buộc",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Email là bắt buộc",
                            },
                            {
                                type: "email",
                                message: "Email không hợp lệ",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Mật khẩu là bắt buộc",
                            },
                            {
                                min: 6,
                                message: "Mật khẩu phải có ít nhất 6 ký tự",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: "Xác nhận mật khẩu là bắt buộc",
                            },
                            {
                                min: 6,
                                message:
                                    "Xác nhận mật khẩu phải có ít nhất 6 ký tự",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("Hai mật khẩu không khớp!"),
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={isPending}
                        >
                            {isPending && <Loading3QuartersOutlined spin />}
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default Signup_Form;
