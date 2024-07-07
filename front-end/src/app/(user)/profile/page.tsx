"use client";
import React, { useState, useEffect } from "react";
import { Avatar, Divider, Button } from "antd";
import AppHeader from "@/components/Header";
import Link from "next/link";
import {
  BriefcaseIcon,
  HeartIcon,
  LinkIcon,
  SettingsIcon,
  UserIcon,
} from "@/components/Icons";
import { IUser } from "@/types";
import {
  useGetUserByIdQuery,
  useUpdatePasswordMutation,
  useUpdateUserByIdMutation,
} from "@/services/apis";
import { getAccessToken, GetDataByToken } from "@/utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChangePasswordModal, ProfileModal } from "@/components/User";
import Error from "next/error";

const UserProfile: React.FC = () => {
  const token = getAccessToken() as string;
  const id = GetDataByToken(token).id;
  const [updateUser] = useUpdateUserByIdMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const {
    data: userData,
    isLoading,
    isError,
    refetch,
  } = useGetUserByIdQuery(id);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const [dataUser, setDataUser] = useState<IUser>({
    name: "",
    YoB: 0,
    avatar: "",
    occupation: "",
    interests: [],
    id: "",
  });

  useEffect(() => {
    if (userData) {
      setDataUser(userData.data);
    }
  }, [userData]);

  const handleEditUser = async (values: any) => {
    try {
      const submitData = {
        name: values.name,
        avatar: values.avatar,
        YoB: values.YoB,
        occupation: values.occupation,
        interests: values.interests
          .split(",")
          .map((interest: string) => interest.trim()),
      };

      const response = await updateUser({ body: submitData });
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
      toast.success("User updated successfully");
      setEditModalOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error.props.message);
    }
  };

  const handleChangePassword = async (values: any) => {
    try {
      const body = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      const response = await updatePassword({ body: body });
      if (response.data?.code == 400) {
        throw new Error({
          statusCode: 400,
          message: "Mật khẩu cũ không chính xác",
        });
      } else if (response.data?.code === 401) {
        throw new Error({
          statusCode: 401,
          message: "Phiên đăng nhập đã hết hạn",
        });
      } else if (response.data?.code === 500) {
        throw new Error({
          statusCode: 500,
          message: "Internal server error",
        });
      }
      toast.success("Đổi mật khẩu thành công");
      setPasswordModalOpen(false);
    } catch (error: any) {
      toast.error(error.props.message);
    }
  };

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const openPasswordModal = () => {
    setPasswordModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data</div>;
  }

  return (
    <div className="h-screen bg-gray-50">
      <AppHeader />
      <div className="flex w-full max-w-3xl h-auto mx-auto mt-8 p-4">
        <div className="w-full bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="relative w-full h-32 bg-gradient-to-r from-green-400 to-blue-500">
            <Avatar
              src={`${dataUser.avatar}?seed=${dataUser.name}`}
              size={64}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white"
            />
          </div>
          <div className="pt-12 pb-6 px-6 text-center">
            <h2 className="text-2xl font-bold mt-2">{dataUser.name}</h2>
            <div className="mt-4 flex justify-center space-x-4">
              <Button type="primary" onClick={openEditModal}>
                Chỉnh sửa thông tin cá nhân
              </Button>
              <Button type="primary" onClick={openPasswordModal}>
                Đổi mật khẩu
              </Button>
            </div>
          </div>
          <Divider />
          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <UserIcon className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{dataUser.name}</p>
                <p className="text-xs text-gray-500">
                  Năm sinh: {dataUser.YoB}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <BriefcaseIcon className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Nghề nghiệp</p>
                <p className="text-xs text-gray-500">{dataUser.occupation}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <HeartIcon className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Sở thích</p>
                <p className="text-xs text-gray-500">
                  {dataUser?.interests?.join(", ")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <LinkIcon className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Social</p>
                <div className="flex gap-2 text-xs text-gray-500">
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Twitter
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    LinkedIn
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Divider />
        </div>
      </div>
      <ProfileModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditUser}
        defaultValues={{
          name: dataUser.name,
          avatar: dataUser.avatar,
          YoB: dataUser.YoB,
          occupation: dataUser.occupation,
          interests: dataUser?.interests?.join(", "),
        }}
      />
      <ChangePasswordModal
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSubmit={handleChangePassword}
      />
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
