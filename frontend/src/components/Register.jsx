import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const Register = () => {

 const navigate = useNavigate();
const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

 const registerMutation = useMutation({
    mutationFn: (data) => axiosInstance.post("/auth/register", data),
    onSuccess: (res) => {
      alert(res.data.message); 
      navigate("/auth/login"); 
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Registration failed");
    }
  });

  const onSubmit = (data) => registerMutation.mutate(data);
  
  return (
    <div className="flex items-center justify-center">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-[350px]"
      >

        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Create Account
        </h2>

     
        <input
          type="text"
          placeholder="Enter Name"
          {...register("name", { required: "Name is required" })}
          className="w-full border p-2 rounded mb-1 focus:outline-purple-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
        )}

        
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
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be 6 characters",
            },
          })}
          className="w-full border p-2 rounded mb-1 focus:outline-purple-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded mt-4 hover:bg-purple-700 transition"
        >
          Register
        </button>

       <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/auth/login")}
            className="text-purple-700 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;