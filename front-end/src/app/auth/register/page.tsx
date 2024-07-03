"use client";
import React from "react";
import { Button, Card, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

const currentYear = new Date().getFullYear();

const schema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be between 5 and 50 characters")
    .max(50, "Username must be between 5 and 50 characters")
    .matches(
      /^[a-zA-Z0-9_@]+$/,
      "Username can only contain letters, numbers, _ and @"
    )
    .required("Please input your username!"),
  password: yup
    .string()
    .min(8, "Password must be between 8 and 20 characters")
    .max(20, "Password must be between 8 and 20 characters")
    .matches(/^\S+$/, "Password must not contain spaces")
    .required("Please input your password!"),
  name: yup
    .string()
    .min(5, "Name must be between 5 and 20 characters")
    .max(20, "Name must be between 5 and 20 characters")
    .required("Please input your name!"),
  avatar: yup
    .string()
    .url("Avatar must be a valid URL")
    .required("Please input your avatar URL!"),
  YoB: yup
    .number()
    .typeError("Year of Birth must be a number")
    .min(1900, `Year of Birth must be between 1900 and ${currentYear}`)
    .max(currentYear, `Year of Birth must be between 1900 and ${currentYear}`)
    .required("Please input your Year of Birth!"),
});

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    // Simulate registration
    console.log("Success:", data);
    toast.success("Registration successful");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              {...register("username")}
              placeholder="Username"
              className={`input input-bordered w-full px-3 py-2 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring focus:ring-indigo-100`}
            />
            {errors.username && (
              <span className="text-red-600 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className={`input input-bordered w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring focus:ring-indigo-100`}
            />
            {errors.password && (
              <span className="text-red-600 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              {...register("name")}
              placeholder="Name"
              className={`input input-bordered w-full px-3 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring focus:ring-indigo-100`}
            />
            {errors.name && (
              <span className="text-red-600 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Avatar URL
            </label>
            <input
              {...register("avatar")}
              placeholder="Avatar URL"
              className={`input input-bordered w-full px-3 py-2 border ${
                errors.avatar ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring focus:ring-indigo-100`}
            />
            {errors.avatar && (
              <span className="text-red-600 text-sm">
                {errors.avatar.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year of Birth
            </label>
            <input
              {...register("YoB")}
              placeholder="Year of Birth"
              className={`input input-bordered w-full px-3 py-2 border ${
                errors.YoB ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring focus:ring-indigo-100`}
            />
            {errors.YoB && (
              <span className="text-red-600 text-sm">{errors.YoB.message}</span>
            )}
          </div>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Register
            </Button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <a
              onClick={() => router.push("/auth/login")}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Login
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
