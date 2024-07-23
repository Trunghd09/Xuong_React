import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import instance from "@/configs/axios";
import { User } from "@/common/types/user";
import { Signin, Signup } from "@/common/validations/Auth";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
    isLogin?: boolean;
};

const AuthForm = ({ isLogin }: Props) => {
    const { login: contextLogin } = useAuth();
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<User>({
        resolver: zodResolver(isLogin ? Signin : Signup),
    });

    const onSubmit = async (data: User) => {
        try {
            if (isLogin) {
                const res = await instance.post(`/auth/v1/signin`, data);
                contextLogin(res.data.accessToken, res.data.user);
            } else {
                const res = await instance.post(`/auth/v1/signup`, {
                    email: data.email,
                    password: data.password,
                });
                alert(res.data.message);
            }
        } catch (error: any) {
            console.log(error);
            alert(error.response?.data?.message || "Error!");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{isLogin ? "signin" : "signup"}</h1>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    email
                </label>
                <input
                    type="email"
                    className="form-control"
                    {...register("email", { required: true })}
                />
                {errors.email && (
                    <span className="text-danger">{errors.email.message}</span>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    password
                </label>
                <input
                    type="password"
                    className="form-control"
                    {...register("password", { required: true })}
                />
                {errors.password && (
                    <span className="text-danger">
                        {errors.password.message}
                    </span>
                )}
            </div>

            {!isLogin && (
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        {...register("confirmPassword", { required: true })}
                    />
                    {errors.confirmPassword && (
                        <span className="text-danger">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>
            )}
            <button className="btn btn-success">
                {isLogin ? "Login" : "Register"}
            </button>
            {isLogin ? (
                <Link to="/signup">Register</Link>
            ) : (
                <Link to="/signin">Login</Link>
            )}
        </form>
    );
};

export default AuthForm;
