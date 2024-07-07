import React, { useState } from "react";
import { Layout, Menu, theme, Input, Select } from "antd";
import { useRouter } from "next/navigation";
import { useToken } from "antd/es/theme/internal";
import { useGetBrandsQuery } from "@/services/apis";
import { IBrand } from "@/types";

const { Sider } = Layout;
const { Search } = Input;
const { Option } = Select;

interface IAppSidebarProps {
  onFilter: (brandId: string | undefined, searchValue: string) => void;
}

const AppSidebar: React.FC<IAppSidebarProps> = ({ onFilter }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(
    undefined
  );
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { data, error, isLoading } = useGetBrandsQuery();

  const onSearch = (value: string) => {
    setSearchQuery(value);

    onFilter(selectedBrand, value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedBrand(value);
    onFilter(value, searchQuery);
  };

  const brands: IBrand[] = data?.data || [];

  return (
    <Sider
      className="h-[calc(100vh-64px)] shadow-md "
      style={{ backgroundColor: colorBgContainer }}
    >
      <div className="p-4">
        <Search
          placeholder="Search watches"
          onChange={(e) => onSearch(e.target.value)}
          enterButton
        />
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
