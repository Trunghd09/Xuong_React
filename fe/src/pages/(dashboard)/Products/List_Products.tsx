import { IProduct } from "@/common/types/product";
import instance from "@/configs/axios";
import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Table, Popconfirm, message, Skeleton } from "antd";
import { Link } from "react-router-dom";
const ProductPage = () => {
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            try {
                return await instance.get("/products");
            } catch (error) {
                throw new Error("lỗi");
            }
        },
    });
    const { mutate } = useMutation({
        mutationFn: async (id: IProduct) => {
            try {
                return await instance.delete(`/products/${id}`);
            } catch (error) {
                throw new Error("Xóa sản phẩm thất bại");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Xóa Sản phẩm thành công",
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
            throw error;
        },
    });
    const createFilters = (products: IProduct[]) => {
        return products
            .map((product: IProduct) => product.name)
            .filter(
                (value: string, index: number, self: string[]) =>
                    self.indexOf(value) === index,
            )
            .map((name: string) => ({ text: name, value: name }));
    };
    const dataSource = data?.data.map((product: IProduct) => ({
        key: product._id,
        ...product,
    }));
    const columns = [
        {
            key: "name",
            title: "Tên Sản Phẩm",
            dataIndex: "name",
            filterSearch: true,
            filters: data ? createFilters(data.data) : [],
            onFilter: (value: string, product: IProduct) =>
                product.name.includes(value),
            sorter: (a: IProduct, b: IProduct) => a.name.localeCompare(b.name),
            sortDirections: ["ascend", "descend"],
        },
        {
            key: "price",
            title: "giá Sản Phẩm",
            dataIndex: "price",
            sorter: (a: IProduct, b: IProduct) => a.price - b.price,
            render: (price: number) =>
                new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(price),
        },
        {
            key: "description",
            title: "mô tả",
            dataIndex: "description",
            filterSearch: true,
        },
        {
            key: "action",
            render: (_: any, product: IProduct) => {
                return (
                    <>
                        <div className="flex space-x-3">
                            {contextHolder}
                            <Popconfirm
                                title="Xóa sản phẩm"
                                description="Bạn có muốn xóa ko?"
                                onConfirm={() => mutate(product._id!)}
                                // onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button danger>Delete</Button>
                            </Popconfirm>
                            <Button danger>
                                <Link
                                    to={`/admin/products/edit/${product._id}`}
                                >
                                    Cập Nhật
                                </Link>
                            </Button>
                        </div>
                    </>
                );
            },
        },
    ];
    console.log(dataSource);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    return (
        <>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold">Quản lý sản phẩm</h1>
                <Button type="primary">
                    <Link to={"/admin/products/add"}>
                        <PlusCircleFilled />
                        Thêm Sản Phẩm
                    </Link>
                </Button>
            </div>
            <Skeleton loading={isLoading} active>
                <Table dataSource={dataSource} columns={columns}></Table>
            </Skeleton>
        </>
    );
};

export default ProductPage;
