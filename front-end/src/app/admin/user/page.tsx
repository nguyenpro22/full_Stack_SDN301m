"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Avatar,
  Spin,
  message,
  Popconfirm,
  Switch,
  Input,
} from "antd";
import {
  DeleteOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  useGetUsersQuery,
  useDeleteUserByIdMutation,
  useUpdateUserByAdminMutation,
} from "@/services/apis";
import { IUser } from "@/types";
import { getAccessToken, GetDataByToken } from "@/utils";
import { useRouter } from "next/navigation";
import Error from "next/error";

const UsersManagementPage: React.FC = () => {
  const { data, isLoading, error, refetch } = useGetUsersQuery();
  const [updateUser] = useUpdateUserByAdminMutation();
  const [deleteUser] = useDeleteUserByIdMutation();
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const token = getAccessToken() as string;
  const router = useRouter();

  const { id: loggedInUserId } = GetDataByToken(token);

  useEffect(() => {
    if (data) {
      setUsers(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      message.error("Failed to load users");
    }
  }, [error]);

  const handleDelete = async (userId: string) => {
    try {
      const response = await deleteUser(userId);
      console.log(response);
      if (response.data?.code === 404) {
        throw new Error({
          statusCode: 404,
          message: "User not found",
        });
      } else if (response.data?.code === 500) {
        throw new Error({
          statusCode: 500,
          message: "Internal server error",
        });
      }
      message.success("User deleted successfully");
      refetch();
    } catch (error: any) {
      if (error?.props?.statusCode === 404) {
        message.error(error.props?.message);
      } else message.error("Failed to delete user");
    }
  };

  const handleRoleChange = async (id: string | undefined, isAdmin: boolean) => {
    try {
      const response = await updateUser({
        id: id || "",
        body: { isAdmin },
      });

      if (response.data?.code == 401) {
        throw new Error({
          statusCode: 401,
          message: "Phiên đăng nhập đã hết hạn",
        });
      } else if (response.data?.code == 404) {
        throw new Error({
          statusCode: 404,
          message: "User not found",
        });
      }

      message.success("User role updated successfully");
      refetch();
    } catch (error: any) {
      if (error?.props?.message) {
        message.error(error.props.message);
      } else message.error("Failed to update user role");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user?.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text: string, record: IUser) => (
        <Avatar src={`${text}?seed=${record.name}`} />
      ),
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
      render: (isAdmin: boolean, record: IUser) => (
        <Switch
          checked={isAdmin}
          onChange={(checked) => handleRoleChange(record?.id, checked)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_text: any, record: any) => (
        <Space size="middle">
          {record.id !== loggedInUserId && (
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} danger>
                Delete
              </Button>
            </Popconfirm>
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
    <div className="p-4 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 h-full">
      <h2 className="text-3xl font-bold mb-6 text-center">Users Management</h2>
      <Input
        placeholder="Search users"
        prefix={<SearchOutlined />}
        value={searchQuery}
        onChange={handleSearch}
        className="mb-6 w-full max-w-md mx-auto"
      />
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        pagination={{ pageSize: 6 }}
        className="bg-white shadow-md rounded-lg overflow-hidden"
      />
    </div>
  );
};

export default UsersManagementPage;
