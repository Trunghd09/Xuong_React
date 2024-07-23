import { BackwardFilled, Loading3QuartersOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { Button, FormProps, Form, Input, message } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "@/configs/axios";

type FieldType = {
    name?: string;
};

const Update_Category = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["categories", id],
        queryFn: async () => {
            try {
                return await instance.get(`/category/${id}`);
            } catch (error) {
                console.error(error);
                throw new Error("lỗi");
            }
        },
    });

    console.log(data?.data);

    const { mutate, isPending } = useMutation({
        mutationFn: async (category: FieldType) => {
            try {
                return await instance.put(`/category/${id}`, category);
            } catch (error) {
                throw new Error("Cập nhật danh mục thất bại");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Cập nhật danh mục thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["categories"],
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
                    Cập nhât: {data?.data?.name}
                </h1>
                <Button type="primary">
                    <Link to={"/admin/category"}>
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
                    initialValues={{ ...data?.data }}
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

export default Update_Category;
