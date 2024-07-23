import instance from "@/configs/axios";
import { AxiosResponse } from "axios";
import { ICategory } from "@/common/types/category";

export const getAllCategory = async (
    params?: any,
): Promise<AxiosResponse<any>> => {
    try {
        const req = await instance.get("/category", { params });
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
        const { data } = await instance.get(`/category/${id}`);
        console.log(data);
        return data;
    } catch (error) {
        return error;
    }
};
export const addCategory = async () => {
    try {
        const { data } = await instance.post("/category");
        console.log(data);
        return data;
    } catch (error) {
        return error;
    }
};
export const removeCategory = async (
    category: ICategory,
): Promise<AxiosResponse<any> | undefined> => {
    try {
        const response = await instance.delete(`/category/${category._id}`, {
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
export const updateCategory = async (
    category: ICategory,
): Promise<AxiosResponse<any> | undefined> => {
    try {
        const response = await instance.put(
            `/category/${category._id}`,
            category,
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
