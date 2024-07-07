import React from "react";
import { Button, Modal, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "@/services/apis";
import Error from "next/error";

// Schema validation
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please input your email!")
    .email("Invalid email format"),
  username: yup
    .string()
    .required("Please input your username!")
    .matches(
      /^[a-zA-Z0-9_.@]+$/,
      "Username can only contain letters, numbers, _ @ and ."
    ),
});

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [resetPassword] = useResetPasswordMutation();
  const onSubmit = async (data: any) => {
    try {
      const response = await resetPassword(data);
      if (response.data?.code === 404) {
        throw new Error({
          statusCode: 404,
          message: "User not found",
        });
      }
      toast.success(
        "Password reset mail has been sent!, please check your email"
      );
      onClose();
    } catch (error: any) {
      if (error?.props.statusCode) {
        toast.error(error.props.message);
      } else toast.error("An unknow error");
    }
  };

  return (
    <Modal
      title="Forgot Password"
      visible={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Email"
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:ring-indigo-100`}
              />
            )}
          />
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Username"
                className={`w-full px-3 py-2 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:ring-indigo-100`}
              />
            )}
          />
          {errors.username && (
            <span className="text-red-600 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>
        <div>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ForgotPasswordModal;
