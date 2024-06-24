import { registerUser } from "@/services/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerUser(data.name, data.email, data.password);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
          </span>
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
