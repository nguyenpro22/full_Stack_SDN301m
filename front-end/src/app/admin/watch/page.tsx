"use client";

import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space, InputNumber } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const WatchesManagementPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [watches, setWatches] = useState([
    { id: "1", watchName: "Omega Seamaster", price: 5000 },
    { id: "2", watchName: "Rolex Submariner", price: 8000 },
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
    { title: "Watch Name", dataIndex: "watchName", key: "watchName" },
    { title: "Price", dataIndex: "price", key: "price" },
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
      <h1 className="text-2xl font-bold mb-4">Watches Management</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        className="mb-4"
      >
        Add Watch
      </Button>
      <div className="overflow-auto h-[calc(100%-100px)]">
        <Table columns={columns} dataSource={watches} rowKey="id" />
      </div>
      <Modal
        title="Add Watch"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item
            label="Watch Name"
            name="watchName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <InputNumber
              className="w-full"
              min={0}
              formatter={(value) => `$ ${value}`}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WatchesManagementPage;
