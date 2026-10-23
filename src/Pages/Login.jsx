
import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const formSubmit = (data) => {
    console.log(data);
    alert("Login successful!");
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        {/* Email */}
        <label className="block text-gray-700 font-medium mb-2">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is mandatory",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@gmail\.com$/,
              message: "Enter a valid Gmail address"
            }
          })}
          className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}

        {/* Password */}
        <label className="block text-gray-700 font-medium mt-5 mb-2">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is mandatory",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            }
          })}
          className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 active:scale-95 transition duration-200"
        >
          Login
        </button>

       

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <a href="/Register.jsx" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
