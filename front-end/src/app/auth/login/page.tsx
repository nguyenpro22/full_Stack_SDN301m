"use client";
import React, { useState } from "react";
import { Button, Card } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "@/services/apis";
import { GetDataByToken, setCookie } from "@/utils";
import Error from "next/error";
import { ForgotPasswordModal } from "@/components/User";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Please input your username!")
    .matches(
      /^[a-zA-Z0-9_.@]+$/,
      "Username can only contain letters, numbers, _ @ and ."
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: any) => {
    try {
      const response = await login(data);
      if (response.data?.code === 401) {
        throw new Error({
          statusCode: 401,
          message: "Sai tên đăng nhập hoặc mật khẩu",
        });
      }

      toast.success("Login successful");
      const { token } = response?.data as any;
      setCookie("jwt", token);
      const { isAdmin } = GetDataByToken(token);
      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.props.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg bg-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>
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
              className={`w-full px-4 py-2 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-100`}
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
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-100`}
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
            Don&apos;t have an account?{" "}
            <a
              onClick={() => router.push("/auth/register")}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Register
            </a>
          </p>
          <Button
            type="link"
            className="text-indigo-600 mt-2"
            onClick={showModal}
          >
            Forgot Password
          </Button>
          <ForgotPasswordModal isOpen={isModalOpen} onClose={handleCancel} />
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
