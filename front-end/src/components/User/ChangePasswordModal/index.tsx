import React from "react";
import { Modal, Input, Form, Button } from "antd";
import { Controller, FieldError, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface PasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

const passwordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "New password must be at least 8 characters")
    .max(20, "New password can't be longer than 20 characters")
    .matches(/^\S+$/, "Password must not contain spaces"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

const PasswordModal: React.FC<PasswordModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      title="Đổi mật khẩu"
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Old Password" required>
          <Controller
            name="oldPassword"
            control={control}
            render={({ field }) => <Input.Password {...field} />}
          />
          {errors.oldPassword && (
            <p className="text-red-600">
              {(errors.oldPassword as FieldError).message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="New Password" required>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => <Input.Password {...field} />}
          />
          {errors.newPassword && (
            <p className="text-red-600">
              {(errors.newPassword as FieldError).message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Confirm New Password" required>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => <Input.Password {...field} />}
          />
          {errors.confirmPassword && (
            <p className="text-red-600">
              {(errors.confirmPassword as FieldError).message}
            </p>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PasswordModal;
