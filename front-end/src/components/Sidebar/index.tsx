import React from "react";
import { Layout, Menu, theme, Input, Select } from "antd";
import { useRouter } from "next/navigation";
import { useToken } from "antd/es/theme/internal";
import { useGetBrandsQuery } from "@/services/apis";
import { Brand } from "@/types";

const { Sider } = Layout;
const { Search } = Input;
const { Option } = Select;

interface IAppSidebarProps {
  onFilter: (brandId: string | undefined) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ onFilter }) => {
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { data, error, isLoading } = useGetBrandsQuery();

  const onSearch = (value: string) => {
    console.log("Search:", value);
    // Implement search functionality here
  };

  const handleCategoryChange = (value: string) => {
    console.log("Selected Category:", value);
    onFilter(value);
  };

  const brands: Brand[] = data?.data || [];

  return (
    <Sider
      className="h-[calc(100vh-64px)] shadow-md "
      style={{ backgroundColor: colorBgContainer }}
    >
      <div className="p-4">
        <Search placeholder="Search watches" onSearch={onSearch} enterButton />
      </div>
      <div className="p-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading brands</p>
        ) : (
          <Select
            placeholder="Filter by Brand"
            onChange={handleCategoryChange}
            className="w-full"
          >
            <Option value={null}>All</Option>
            {brands.map((brand) => (
              <Option key={brand.id} value={brand.id}>
                {brand.brandName}
              </Option>
            ))}
          </Select>
        )}
      </div>
    </Sider>
  );
};

export default AppSidebar;
