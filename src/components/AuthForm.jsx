import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import instance from "../axios";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema, registerSchema } from "../schemaValid/authSchema";

const AuthForm = ({ isRegister }) => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });
  const onSubmit = (data) => {
    (async () => {
      try {
        if (isRegister) {
          console.log(data);
          await instance.post(`/register`, data);
          if (confirm("Successfully, redirect login page?")) {
            nav("/login");
          }
        } else {
          const result = await instance.post(`/login`, data);
          localStorage.setItem("user", JSON.stringify(result.data));
          if (confirm("Successfully, redirect home page?")) {
            nav("/");
          }
        }
      } catch (error) {
        alert(error?.response?.data);
      }
    })();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{isRegister ? "Register" : "Login"}</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email?.message && (
            <p className="text-danger">{errors.email?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password?.message && (
            <p className="text-danger">{errors.password?.message}</p>
          )}
        </div>
        {isRegister && (
          <div className="mb-3">
            <label htmlFor="confirmPass" className="form-label">
              Confirm password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPass"
              {...register("confirmPass", { required: true })}
            />
            {errors.confirmPass?.message && (
              <p className="text-danger">{errors.confirmPass?.message}</p>
            )}
          </div>
        )}

        <div className="mb-3">
          <button className="btn btn-primary w-100" type="submit">
            {isRegister ? "Register" : "Login"}
          </button>
          {isRegister && (
            <Link to="/login">Da co tai khoan, chuyen sang dang nhap?</Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
