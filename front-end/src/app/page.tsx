"use client";

import HomePage from "./(user)/home";
import AppHeader from "@/components/Header";
import AppSidebar from "@/components/Sidebar";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";

export default function Home() {
  const [filteredBrand, setFilteredBrand] = useState<string | undefined>();

  const handleFilter = (brandId: string | undefined) => {
    setFilteredBrand(brandId);
  };
  return (
    <>
      <AppHeader />
      <Layout className="flex">
        <AppSidebar onFilter={handleFilter} />
        <Layout className="flex-grow p-4 bg-gray-100">
          <Content className="bg-white p-4 rounded-lg shadow-md h-[calc(100vh-300px)]">
            <HomePage brandId={filteredBrand} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
