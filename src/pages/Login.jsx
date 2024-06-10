// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { loginSchema } from "../schemaValid/authSchema";
// import instance from "../axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const nav = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   });
//   const onSubmit = (data) => {
//     (async () => {
//       try {
//         await instance.post(`/login`, data);
//         // console.log(res);
//         if (confirm("Login successful, redirect home page?")) {
//           nav("/home");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     })();
//   };
//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <h1>Login</h1>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             email
//           </label>

//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             {...register("email", { required: true })}
//           />
//           {errors.email?.message && (
//             <p className="text-danger">{errors.email?.message}</p>
//           )}
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             {...register("password", { required: true })}
//           />
//           {errors.password?.message && (
//             <p className="text-danger">{errors.password?.message}</p>
//           )}
//         </div>
//         <div className="mb-3">
//           <button className="btn btn-primary w-100" type="submit">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;
