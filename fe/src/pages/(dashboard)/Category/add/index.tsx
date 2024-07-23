import { BackwardFilled, Loading3QuartersOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button, FormProps, Form, Input, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import instance from "@/configs/axios";
type FieldType = {
    name?: string;
};
const Add_Category = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const { mutate, isPending } = useMutation({
        mutationFn: async (category: FieldType) => {
            try {
                return await instance.post("/category", category);
            } catch (error) {
                throw new Error("Thêm danh mục thất bại");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Thêm danh mục thành công",
            });
            form.resetFields();
        },
        onError: (error) => {
            messageApi.open({
                type: "error",
                content: error.message,
            });
        },
    });
    const onFinish: FormProps<FieldType>["onFinish"] = (values: any) => {
        mutate(values);
    };
    // if (isLoading) return <div>Loading...</div>;
    return (
        <>
            {contextHolder}
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold">Thêm danh mục</h1>
                <Button type="primary">
                    <Link to={"/admin/category"}>
                        <BackwardFilled />
                        Quay lại
                    </Link>
                </Button>
            </div>
            <div className="max-w-4xl mx-auto">
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    // initialValues={{ remember: true }}
                    onFinish={onFinish}
                    disabled={isPending}
                    // onFinishFailed={onFinishFailed}
                    // autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Tên danh mục"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Tên danh mục bắt buộc",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            {isPending && <Loading3QuartersOutlined spin />}
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default Add_Category;
