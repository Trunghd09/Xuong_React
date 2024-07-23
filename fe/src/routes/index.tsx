import React from "react";
import { Route, Routes } from "react-router-dom";
import Add_Category from "@/pages/(dashboard)/Category/add";
import Update_Category from "@/pages/(dashboard)/Category/edit";
import CategoryPage from "@/pages/(dashboard)/Category/List_Category";
import Dashboard from "@/pages/(dashboard)/Dashboard/_components/Dashboard";
import LayoutAdmin from "@/pages/(dashboard)/layout";
import Add_Products from "@/pages/(dashboard)/Products/add/Add_Products";
import Update_Products from "@/pages/(dashboard)/Products/edit/Update_Products";
import ProductPage from "@/pages/(dashboard)/Products/List_Products";
import Home from "@/pages/(website)/home/page";
import Lay_Out_Client from "@/pages/(website)/Lay_Out_Client";
import SigninForm from "@/pages/(website)/signin/signin";
import SignupForm from "@/pages/(website)/sinup/signup";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Lay_Out_Client />}>
                <Route index element={<Home />} />
                <Route path="signin" element={<SigninForm />} />
                <Route path="signup" element={<SignupForm />} />
            </Route>

            <Route path="admin" element={<LayoutAdmin />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<ProductPage />} />
                <Route path="products/add" element={<Add_Products />} />
                <Route path="products/edit/:id" element={<Update_Products />} />
                <Route path="category" element={<CategoryPage />} />
                <Route path="category/add" element={<Add_Category />} />
                <Route path="category/edit/:id" element={<Update_Category />} />
            </Route>
        </Routes>
    );
};

export default Router;
