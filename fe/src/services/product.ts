import { IProduct } from "@/common/types/product";
import instance from "@/configs/axios";
import { AxiosResponse } from "axios";

export const getAllProducts = async (
    params?: any,
): Promise<AxiosResponse<any>> => {
    try {
        const req = await instance.get("/products", { params });
        console.log(req);
        return req;
    } catch (error) {
        return {
            data: null,
            status: 500,
            statusText: "Lỗi",
            headers: {},
            config: {} as any,
        };
    }
};
export const getById = async (id: string) => {
    try {
        const { data } = await instance.get(`/products/${id}`);
        console.log(data);
        return data;
    } catch (error) {
        return error;
    }
};
export const addProducts = async () => {
    try {
        const { data } = await instance.post("/products");
        console.log(data);
        return data;
    } catch (error) {
        return error;
    }
};
export const removeProduct = async (
    product: IProduct,
): Promise<AxiosResponse<any> | undefined> => {
    try {
        const response = await instance.delete(`/products/${product._id}`, {
            // headers: {
            //     'Content-Type': 'application/json',
            //     "Authorization": "Bearer " + token ? token : ''
            // },
        });
        return response;
    } catch (error) {
        return error as any;
    }
};
export const updateProduct = async (
    product: IProduct,
): Promise<AxiosResponse<any> | undefined> => {
    try {
        const response = await instance.put(
            `/products/${product._id}`,
            product,
            {
                // headers: {
                //     "Content-Type": "application/json",
                //     Authorization: `Bearer ${token}`,
                // },
            },
        );
        return response;
    } catch (error) {
        return error as any;
    }
};
