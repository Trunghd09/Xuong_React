import { ICategory } from "@/common/types/category";
import instance from "@/configs/axios";
import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Table, Popconfirm, message, Skeleton } from "antd";
import { Link } from "react-router-dom";
const CategoryPage = () => {
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            try {
                return await instance.get("/category");
            } catch (error) {
                throw new Error("lỗi");
            }
        },
    });
    const { mutate } = useMutation({
        mutationFn: async (id: ICategory) => {
            try {
                return await instance.delete(`/category/${id}`);
            } catch (error) {
                throw new Error("Xóa danh mục thất bại");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Xóa danh mục thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["category"],
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
    // const createFilters = (category: ICategory[]) => {
    //     return category
    //         .map((category: ICategory) => category.name)
    //         .filter(
    //             (value: string, index: number, self: string[]) =>
    //                 self.indexOf(value) === index,
    //         )
    //         .map((name: string) => ({ text: name, value: name }));
    // };
    const dataSource = data?.data.map((category: ICategory) => ({
        key: category._id,
        ...category,
    }));
    const columns = [
        {
            key: "name",
            title: "Tên danh mục",
            dataIndex: "name",
            // filterSearch: true,
            // filters: data ? createFilters(data.data) : [],
            // onFilter: (value: string, category: ICategory) =>
            //     category.name.includes(value),
            // sorter: (a: ICategory, b: ICategory) =>
            //     a.name.localeCompare(b.name),
            // sortDirections: ["ascend", "descend"],
        },
        {
            key: "action",
            render: (_: any, category: ICategory) => {
                return (
                    <>
                        <div className="flex space-x-3">
                            {contextHolder}
                            <Popconfirm
                                title="Xóa sản phẩm"
                                description="Bạn có muốn xóa ko?"
                                onConfirm={() => mutate(category._id!)}
                                // onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button danger>Delete</Button>
                            </Popconfirm>
                            <Button danger>
                                <Link
                                    to={`/admin/category/edit/${category._id}`}
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
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    return (
        <>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold">Quản lý danh mục</h1>
                <Button type="primary">
                    <Link to={"/admin/category/add"}>
                        <PlusCircleFilled />
                        Thêm danh mục
                    </Link>
                </Button>
            </div>
            <Skeleton loading={isLoading} active>
                <Table dataSource={dataSource} columns={columns}></Table>
            </Skeleton>
        </>
    );
};

export default CategoryPage;
