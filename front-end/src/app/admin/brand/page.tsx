"use client";

import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const BrandsManagementPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [brands, setBrands] = useState([
    { id: "1", brandName: "Rolex" },
    { id: "2", brandName: "Omega" },
  ]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    { title: "Brand Name", dataIndex: "brandName", key: "brandName" },
    {
      title: "Action",
      key: "action",
      render: (_text: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />}>Edit</Button>
          <Button icon={<DeleteOutlined />} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-gray-100 h-full">
      <h1 className="text-2xl font-bold mb-4">Brands Management</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        className="mb-4"
      >
        Add Brand
      </Button>
      <div className="overflow-auto h-[calc(100%-100px)]">
        <Table columns={columns} dataSource={brands} rowKey="id" />
      </div>
      <Modal
        title="Add Brand"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item
            label="Brand Name"
            name="brandName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BrandsManagementPage;
