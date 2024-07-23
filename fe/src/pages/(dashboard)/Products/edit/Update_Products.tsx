import { BackwardFilled, Loading3QuartersOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import {
    Button,
    FormProps,
    Form,
    Input,
    message,
    Checkbox,
    InputNumber,
    Select,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
const Update_Products = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();
    const {
        data: product,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["products", id],
        queryFn: async () => {
            try {
                return await instance.get(`/products/${id}`);
            } catch (error) {
                throw new Error("lỗi");
            }
        },
    });
    const { data: category } = useQuery({
        queryKey: ["category"],
        queryFn: () => instance.get("/categories"),
    });
    const { mutate, isPending } = useMutation({
        mutationFn: async (product: FieldType) => {
            try {
                return await instance.put(`/products/${id}`, product);
            } catch (error) {
                throw new Error("Cập nhật sản phẩm thất bại");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Cập nhật sản phẩm thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
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
    if (isError) return <div>Error: {error.message}</div>;
    return (
        <>
            {contextHolder}
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold">
                    Cập nhât: {product?.data.name}
                </h1>
                <Button type="primary">
                    <Link to={"/admin/products"}>
                        <BackwardFilled />
                        Quay lại
                    </Link>
                </Button>
            </div>
            <div className="max-w-4xl mx-auto">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ ...product?.data }}
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
                                value: category.id,
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

export default Update_Products;
