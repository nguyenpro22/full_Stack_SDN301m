"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Avatar,
  Spin,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useGetUsersQuery, useUpdateUserByIdMutation } from "@/services/apis";
import { IUser } from "@/types";
import { getCookie, GetDataByToken } from "@/utils";
import EditUserModal from "@/components/User/Modal";
import { useRouter } from "next/navigation";

const UsersManagementPage: React.FC = () => {
  const { data, isLoading, error, refetch } = useGetUsersQuery();
  const [updateUser] = useUpdateUserByIdMutation();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const token = getCookie("jwt") as string;
  const router = useRouter();

  const { id: loggedInUserId } = GetDataByToken(token);

  useEffect(() => {
    if (data) {
      setUsers(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      if (error) message.error("Failed to load users");
    }
  }, [error]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (user: IUser) => {
    setEditingUser(user);
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = async (updatedUser: Partial<IUser>) => {
    // Save the updated user information here
    const userID = editingUser?.id as string;
    await updateUser({ id: userID, body: updatedUser });
    console.log("Updated User:", updatedUser);
    setIsEditModalVisible(false);
    refetch();
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text: string) => <Avatar src={`https://${text}`} />,
    },
    { title: "Username", dataIndex: "membername", key: "membername" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Year of Birth",
      dataIndex: "YoB",
      key: "YoB",
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin: boolean) => (isAdmin ? "Yes" : "No"),
    },
    {
      title: "Action",
      key: "action",
      render: (_text: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          {record.id !== loggedInUserId && (
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          )}
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 h-full">
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>

      <div className="overflow-auto h-[calc(100vh-64px-80px)]">
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{ pageSize: 6 }}
        />
      </div>
      <EditUserModal
        visible={isEditModalVisible}
        user={editingUser}
        onClose={() => setIsEditModalVisible(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default UsersManagementPage;
