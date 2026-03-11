import { useForm } from 'react-hook-form';
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { axiosInstance } from "../config/axiosInstance";

const Login = () => {

  const navigate = useNavigate();
   const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  
   const loginMutation = useMutation({
    mutationFn: (data) => axiosInstance.post("/auth/login", data),
    onSuccess: () => navigate("/home"), 
    onError: (error) => alert(error.response?.data?.message || "Login failed")
  });

  const onSubmit = (data) => loginMutation.mutate(data);
  return (
    <div className="flex items-center justify-center ">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-[350px]"
      >

        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Login
        </h2>

      
        <input
          type="email"
          placeholder="Enter Email"
          {...register("email", { required: "Email is required" })}
          className="w-full border p-2 rounded mb-1 focus:outline-purple-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

      
        <input
          type="password"
          placeholder="Enter Password"
          {...register("password", { required: "Password is required" })}
          className="w-full border p-2 rounded mb-1 focus:outline-purple-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}

        <div className="text-right mb-2">
          <span
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-purple-700 cursor-pointer hover:underline"
          >
            Forgot password?
          </span>
        </div>

       
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded mt-2 hover:bg-purple-700 transition"
        >
          Login
        </button>
       <p className="text-center text-sm mt-4">
          Dont't have an account?{" "}
          <span
            onClick={() => navigate("/auth/register")}
            className="text-purple-700 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;