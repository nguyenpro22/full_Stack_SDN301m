"use client";
import React from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import AppHeader from "@/components/Header";
import { usePathname } from "next/navigation";

const { Sider, Content } = Layout;

interface IProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<IProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      <AppHeader />
      <Layout className="h-[calc(100vh-64px)]">
        <Sider>
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="/admin/user">
              <Link href="/admin/user">Users</Link>
            </Menu.Item>
            <Menu.Item key="/admin/brand">
              <Link href="/admin/brand">Brands</Link>
            </Menu.Item>
            <Menu.Item key="/admin/watch">
              <Link href="/admin/watch">Watches</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="flex-1 overflow-hidden">
          <Content className="p-4 h-full overflow-auto bg-white">
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;
