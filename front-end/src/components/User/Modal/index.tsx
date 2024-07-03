"use client";

import React, { useEffect } from "react";
import { Modal, Form, Input, Switch } from "antd";
import { User } from "@/types";

interface IEditUserModalProps {
  visible: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (user: Partial<User>) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  visible,
  user,
  onClose,
  onSave,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        password: "",
        isAdmin: user.isAdmin,
      });
    }
  }, [user, form]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
        onClose();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Edit User"
      open={visible}
      onCancel={onClose}
      onOk={handleSave}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input the password!" },
            { min: 8, message: "Password must be at least 8 characters" },
            {
              pattern: /^[a-zA-Z0-9@_]+$/,
              message: "Password can only contain letters, numbers, @, and _",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="Admin" name="isAdmin" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
