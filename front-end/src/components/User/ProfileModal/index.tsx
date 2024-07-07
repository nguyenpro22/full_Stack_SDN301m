import React, { useEffect } from "react";
import { Modal, Input, Form, Button } from "antd";
import { Controller, FieldError, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  defaultValues: any;
}

const editSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(5, "Name must be at least 5 characters")
    .max(20, "Name can't be longer than 20 characters"),
  avatar: yup
    .string()
    .url("Avatar must be a valid URL")
    .required("Avatar URL is required"),
  YoB: yup
    .number()
    .required("Year of Birth is required")
    .min(
      1900,
      `Year of Birth must be between 1900 and ${new Date().getFullYear()}`
    )
    .max(
      new Date().getFullYear(),
      `Year of Birth must be between 1900 and ${new Date().getFullYear()}`
    ),
  occupation: yup.string().required("Occupation is required"),
  interests: yup.string().required("Interests are required"),
});

const ProfileModal: React.FC<ProfileModalProps> = ({
  open,
  onClose,
  onSubmit,
  defaultValues,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(editSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      title="Chỉnh sửa thông tin cá nhân"
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Name" required>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.name && (
            <p className="text-red-600">
              {(errors.name as FieldError).message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Avatar URL" required>
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.avatar && (
            <p className="text-red-600">
              {(errors.avatar as FieldError).message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Year of Birth" required>
          <Controller
            name="YoB"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.YoB && (
            <p className="text-red-600">{(errors.YoB as FieldError).message}</p>
          )}
        </Form.Item>
        <Form.Item label="Occupation" required>
          <Controller
            name="occupation"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.occupation && (
            <p className="text-red-600">
              {(errors.occupation as FieldError).message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Interests" required>
          <Controller
            name="interests"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.interests && (
            <p className="text-red-600">
              {(errors.interests as FieldError).message}
            </p>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProfileModal;
