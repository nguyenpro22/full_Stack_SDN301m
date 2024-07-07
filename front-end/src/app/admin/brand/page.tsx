"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Popconfirm,
  Spin,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  useGetBrandsQuery,
  useUpdateBrandByIdMutation,
  useCreateBrandMutation,
  useDeleteBrandByIdMutation,
} from "@/services/apis";
import type { ColumnsType } from "antd/es/table";
import { IBrand } from "@/types";
import Error from "next/error";

const BrandsManagementPage: React.FC = () => {
  const { data: brandData, isLoading, error, refetch } = useGetBrandsQuery();
  const [updateBrand] = useUpdateBrandByIdMutation();
  const [addBrand] = useCreateBrandMutation();
  const [deleteBrand] = useDeleteBrandByIdMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<IBrand | null>(null);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [form] = Form.useForm();

  useEffect(() => {
    if (brandData) {
      setBrands(brandData.data);
    }
  }, [brandData]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (isEditMode && currentBrand) {
        // Edit existing brand
        const body = {
          brandName: values.brandName,
        };
        try {
          const response = await updateBrand({
            id: currentBrand.id,
            body: body,
          });
          if (response?.data?.code === 400) {
            throw new Error({
              statusCode: 400,
              message: "Invalid brand name",
            });
          }
          message.success("Brand updated successfully");
          refetch();
        } catch (error: any) {
          if (error?.props?.statusCode === 400) {
            message.error(error.props.message);
          } else message.error("Failed to update brand");
        }
      } else {
        // Add new brand
        try {
          const response = await addBrand(values);
          if (response?.data?.code === 409) {
            throw new Error({
              statusCode: 409,
              message: "Brand name already exists",
            });
          }
          message.success("Brand added successfully");
          refetch();
        } catch (error: any) {
          if (error?.props?.statusCode === 409) {
            message.error(error.props.message);
          } else message.error("Failed to add brand");
        }
      }
      setIsModalOpen(false);
      form.resetFields();
      setIsEditMode(false);
      setCurrentBrand(null);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setIsEditMode(false);
    setCurrentBrand(null);
  };

  const handleEdit = (record: IBrand) => {
    setIsEditMode(true);
    setCurrentBrand(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteBrand(id);
      if (response.data?.code === 400) {
        throw new Error({
          statusCode: 400,
          message: "Brand not found",
        });
      }
      message.success("Brand deleted successfully");
      refetch();
    } catch (error) {
      message.error("Failed to delete brand");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredBrands = brands.filter((brand) =>
    brand.brandName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnsType<IBrand> = [
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
      align: "center",
    },
    {
      title: "Actions",
      key: "action",
      align: "center",
      render: (_text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this brand?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
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

  if (error) {
    return <p>Error loading brands</p>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 h-full">
      <h2 className="text-3xl font-bold mb-6 text-center">Brand Management</h2>
      <Input
        placeholder="Search brands"
        prefix={<SearchOutlined />}
        value={searchQuery}
        onChange={handleSearch}
        className="mb-6 w-full max-w-md mx-auto"
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        className="mb-6"
      >
        Add Brand
      </Button>
      <Table
        columns={columns}
        dataSource={filteredBrands}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="bg-white shadow-md rounded-lg overflow-hidden"
      />
      <Modal
        title={isEditMode ? "Edit Brand" : "Add Brand"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Brand Name"
            name="brandName"
            rules={[
              { required: true, message: "Please enter the brand name!" },
              { min: 5, message: "Brand name must be at least 5 characters" },
              {
                max: 50,
                message: "Brand name must not exceed 50 characters",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BrandsManagementPage;
