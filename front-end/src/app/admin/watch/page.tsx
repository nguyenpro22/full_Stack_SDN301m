"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Select,
  InputNumber,
  Checkbox,
  message,
  Spin,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  useGetWatchesQuery,
  useGetBrandsQuery,
  useCreateWatchMutation,
  useUpdateWatchByIdMutation,
  useDeleteWatchByIdMutation,
} from "@/services/apis";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IBrand, IWatch } from "@/types";
import Error from "next/error";

const schema = yup.object().shape({
  watchName: yup
    .string()
    .min(5, "Watch name must be between 5 and 50 characters")
    .max(50, "Watch name must be between 5 and 50 characters")
    .required("Watch name is required"),
  price: yup
    .number()
    .min(0, "Price must be between 0 and 10000")
    .max(10000, "Price must be between 0 and 10000")
    .required("Price is required"),
  watchDescription: yup
    .string()
    .max(200, "Description must be under 200 characters"),
  brand: yup.string().required("Brand is required"),
  image: yup.string().required("Image URL is required"),
  Automatic: yup.boolean().required("Automatic is required"),
});

const WatchesManagementPage: React.FC = () => {
  const { data: watchData, isLoading, error, refetch } = useGetWatchesQuery();
  const { data: brandData } = useGetBrandsQuery();
  const [updateWatch] = useUpdateWatchByIdMutation();
  const [addWatch] = useCreateWatchMutation();
  const [deleteWatch] = useDeleteWatchByIdMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWatch, setEditingWatch] = useState<IWatch | null>(null);
  const [watches, setWatches] = useState<IWatch[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (watchData) {
      setWatches(watchData.data);
    }
    if (brandData) {
      setBrands(brandData.data);
    }
  }, [watchData, brandData]);

  const showModal = (watch: IWatch | null = null) => {
    setEditingWatch(watch);
    setIsModalOpen(true);
    if (watch) {
      reset({
        ...watch,
        brand: watch.brand._id, // Set brand ID for the form
      });
    } else {
      reset({
        watchName: "",
        price: 0,
        watchDescription: "",
        brand: "",
        image: "",
        Automatic: false,
      });
    }
  };

  const handleOk = handleSubmit(async (formData) => {
    try {
      const selectedBrand = brands.find((b) => b.id === formData.brand);
      if (!selectedBrand) {
        throw new Error({ statusCode: 400, message: "Please select a brand" });
      }

      const body = {
        ...formData,
        brand: { _id: selectedBrand.id, brandName: selectedBrand.brandName }, // Convert brand ID to brand object
      };

      if (editingWatch) {
        // Update watch
        const response = await updateWatch({ id: editingWatch.id, body });
        if (response.data?.code === 404) {
          throw new Error({
            statusCode: 404,
            message: "Watch not found",
          });
        }
        message.success("Watch updated successfully");
      } else {
        // Add new watch
        const response = await addWatch(body);
        if (response.data?.code === 409) {
          throw new Error({
            statusCode: 409,
            message: "Watch name already exists",
          });
        }
        message.success("Watch added successfully");
      }
      refetch();
      setIsModalOpen(false);
      reset();
    } catch (error: any) {
      if (error.props?.statusCode) message.error(error.props.message);
      else message.error("An error occurred, please try again");
    }
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteWatch(id);
      if (response.data?.code === 404) {
        throw new Error({
          statusCode: 404,
          message: "Watch not found",
        });
      }
      message.success("Watch deleted successfully");
      refetch();
    } catch (error: any) {
      if (error.props?.statusCode) {
        message.error(error.props.message);
      } else message.error("Failed to delete watch");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredWatches = watches.filter((watch) =>
    watch.watchName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: "Watch Name",
      dataIndex: "watchName",
      key: "watchName",
      align: "center" as const,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center" as const,
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      align: "center" as const,
      render: (brand: IBrand) => (brand ? brand.brandName : ""),
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (_text: any, record: IWatch) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this watch?"
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
    return <p>Error loading watches</p>;
  }

  return (
    <div className="p-4 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 h-full">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Watches Management
      </h2>
      <Input
        placeholder="Search watches"
        prefix={<SearchOutlined />}
        value={searchQuery}
        onChange={handleSearch}
        className="mb-6 w-full max-w-md mx-auto"
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        className="mb-6"
      >
        Add Watch
      </Button>
      <Table
        columns={columns}
        dataSource={filteredWatches}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="bg-white shadow-md rounded-lg overflow-hidden"
      />
      <Modal
        title={editingWatch ? "Edit Watch" : "Add Watch"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Watch Name" help={errors.watchName?.message}>
            <Controller
              name="watchName"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item label="Price" help={errors.price?.message}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  className="w-full"
                  min={0}
                  max={10000}
                  formatter={(value) => `$ ${value}`}
                />
              )}
            />
          </Form.Item>
          <Form.Item label="Image URL" help={errors.image?.message}>
            <Controller
              name="image"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            help={errors.watchDescription?.message}
          >
            <Controller
              name="watchDescription"
              control={control}
              render={({ field }) => <Input.TextArea {...field} />}
            />
          </Form.Item>
          <Form.Item label="Brand" help={errors.brand?.message}>
            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={brands.map((brand) => ({
                    label: brand.brandName,
                    value: brand.id,
                  }))}
                />
              )}
            />
          </Form.Item>
          <Form.Item>
            <Controller
              name="Automatic"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                >
                  Automatic
                </Checkbox>
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WatchesManagementPage;
