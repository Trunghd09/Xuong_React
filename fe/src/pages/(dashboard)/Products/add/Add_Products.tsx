import { BackwardFilled, Loading3QuartersOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
    Button,
    FormProps,
    Form,
    Input,
    message,
    Select,
    InputNumber,
    Checkbox,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "@/configs/axios";
type FieldType = {
    name?: string;
    price?: number;
    description?: string;
    category?: string;
    discount?: number;
    featured?: boolean;
    countInStock?: number;
};
const Add_Products = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const {
        data: category,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["category"],
        queryFn: () => instance.get("/categories"),
    });
    const { mutate, isPending } = useMutation({
        mutationFn: async (product: FieldType) => {
            try {
                return await instance.post("/products", product);
            } catch (error) {
                throw new Error("Thêm sản phẩm thất bại");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Thêm sản phẩm thành công",
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
    if (isLoading) return <div>Loading...</div>;
    return (
        <>
            {contextHolder}
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold">Thêm sản phẩm</h1>
                <Button type="primary">
                    <Link to={"/admin/products"}>
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
                        label="Tên sản phẩm"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Tên sản phẩm bắt buộc",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType> label="Danh mục" name="category">
                        <Select
                            showSearch
                            placeholder="Chọn danh mục"
                            optionFilterProp="label"
                            options={category?.data.map((category: any) => ({
                                value: category._id,
                                label: category.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Giá sản phẩm"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: "Giá sản phẩm bắt buộc",
                            },
                        ]}
                    >
                        <InputNumber addonAfter="Vnd" />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Giá khuyến mãi"
                        name="discount"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        value < getFieldValue("price")
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "Giá khuyến mãi phải nhỏ hơn giá sản phẩm!",
                                        ),
                                    );
                                },
                            }),
                        ]}
                    >
                        <InputNumber addonAfter="Vnd" />
                    </Form.Item>
                    <Form.Item<FieldType> label="Số lượng" name="countInStock">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item<FieldType> label="Mô tả" name="description">
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Sản phẩm nổi bật"
                        name="featured"
                        valuePropName="checked"
                    >
                        <Checkbox />
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

export default Add_Products;
