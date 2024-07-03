"use client";
import React from "react";
import { Button, Card } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "@/services/apis";
import { GetDataByToken, setCookie } from "@/utils";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Please input your username!")
    .matches(
      /^[a-zA-Z0-9_@]+$/,
      "Username can only contain letters, numbers, _ and @"
    ),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/^\S*$/, "Password cannot contain spaces")
    .required("Please input your password!"),
});

const LoginPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [login] = useLoginMutation();

  const onSubmit = async (data: any) => {
    try {
      const response = await login(data);
      toast.success("Login successful");
      const { token } = response?.data as any;
      setCookie("jwt", token);
      const { isAdmin } = GetDataByToken(token);
      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.log(err);

      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
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
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </Button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p>
            Don't have an account?{" "}
            <a
              onClick={() => router.push("/auth/register")}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Register
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
