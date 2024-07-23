import React from "react";
import { BackwardFilled, Loading3QuartersOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import instance from "@/configs/axios"; // Ensure this is your API instance configuration
type ApiError = {
    response?: {
        data?: {
            messages: string[];
        };
    };
};
const Signin_Form = () => {
    const [form] = Form.useForm();
    const { mutate: signin, isPending } = useMutation({
        mutationFn: async (values: { email: string; password: string }) => {
            const response = await instance.post("/auth/signin", values);
            return response.data;
        },
        onSuccess: (data) => {
            message.success(data.message);
        },
        onError: (error: unknown) => {
            if (error instanceof Error) {
                const apiError = error as ApiError;
                if (apiError.response && apiError.response.data) {
                    message.error(apiError.response.data.messages.join(", "));
                } else {
                    message.error("Đăng nhập thất bại");
                }
            } else {
                message.error("Đăng nhập thất bại");
            }
        },
    });

    const onFinish = (values: { email: string; password: string }) => {
        signin(values);
    };

    return (
        <>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold">Đăng Nhập</h1>
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
                    name="signin"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    disabled={isPending}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Email là bắt buộc" },
                            { type: "email", message: "Email không hợp lệ" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            { required: true, message: "Mật khẩu là bắt buộc" },
                            {
                                min: 6,
                                message: "Mật khẩu phải có ít nhất 6 ký tự",
                            },
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
                            Đăng Nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default Signin_Form;
