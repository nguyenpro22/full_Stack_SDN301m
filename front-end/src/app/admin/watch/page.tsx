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
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetWatchesQuery, useGetBrandsQuery } from "@/services/apis";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IBrand, IWatch } from "@/types";

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
    .max(200, "Description must be less than 200 characters"),
  brand: yup.string().required("Brand is required"),
  image: yup.string().required("Image URL is required"),
  Automatic: yup.boolean().required("Automatic field is required"),
});

const WatchesManagementPage: React.FC = () => {
  const { data: watchData, isLoading, isError } = useGetWatchesQuery();
  const { data: brandData } = useGetBrandsQuery();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingWatch, setEditingWatch] = useState<any | null>(null);
  const [watches, setWatches] = useState<IWatch[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);

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

  const showModal = (watch = null) => {
    setEditingWatch(watch);
    setIsModalVisible(true);
    if (watch) {
      reset(watch);
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
    if (editingWatch) {
      // Update watch
      // Implement update logic here
      message.success("Watch updated successfully");
    } else {
      // Add new watch
      // Implement add logic here
      message.success("Watch added successfully");
    }
    setIsModalVisible(false);
    reset();
  });

  const handleCancel = () => {
    setIsModalVisible(false);
    reset();
  };

  const columns = [
    { title: "Watch Name", dataIndex: "watchName", key: "watchName" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Brand",
      dataIndex: ["brand", "brandName"],
      key: "brand",
      render: (brand: IBrand) => (brand ? brand.brandName : ""),
    },
    {
      title: "Action",
      key: "action",
      render: (_text: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}>
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-gray-100 h-full">
      <h1 className="text-2xl font-bold mb-4">Watches Management</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        className="mb-4"
      >
        Add Watch
      </Button>
      <div className="overflow-auto h-[calc(100%-100px)]">
        <Table columns={columns} dataSource={watches} rowKey="id" />
      </div>
      <Modal
        title={editingWatch ? "Edit Watch" : "Add Watch"}
        open={isModalVisible}
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
