"use client";
import React from "react";
import { Button, Card, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useRegisterMutation } from "@/services/apis";
import Error from "next/error";

const currentYear = new Date().getFullYear();

const schema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be between 5 and 50 characters")
    .max(50, "Username must be between 5 and 50 characters")
    .matches(
      /^[a-zA-Z0-9_.@]+$/,
      "Username can only contain letters, numbers, _ @ and ."
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

  const [signup] = useRegisterMutation();

  const onSubmit = async (data: any) => {
    try {
      const body = {
        username: data.username,
        password: data.password,
        name: data.name,
        avatar: data.avatar,
        YoB: data.YoB,
      };

      const response = await signup(body);
      if (response.data?.code === 409) {
        throw new Error({
          statusCode: 409,
          message: "Tên đăng nhập đã tồn tại",
        });
      }

      toast.success("Registration successful");
      router.push("/auth/login");
    } catch (e: any) {
      if (e.props.statusCode === 409) {
        toast.error(e.props.message);
        return;
      }
      toast.error("Registration failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <Card className="w-full max-w-lg p-8 shadow-2xl rounded-lg bg-white">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
          Register
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              {...register("username")}
              placeholder="Username"
              className={`input input-bordered w-full px-4 py-3 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200`}
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
              className={`input input-bordered w-full px-4 py-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200`}
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
              className={`input input-bordered w-full px-4 py-3 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200`}
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
              className={`input input-bordered w-full px-4 py-3 border ${
                errors.avatar ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200`}
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
              className={`input input-bordered w-full px-4 py-3 border ${
                errors.YoB ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200`}
            />
            {errors.YoB && (
              <span className="text-red-600 text-sm">{errors.YoB.message}</span>
            )}
          </div>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Register
            </Button>
          </div>
        </form>
        <div className="text-center mt-6">
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
