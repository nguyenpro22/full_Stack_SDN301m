import React, { useState, useEffect } from "react";
import { Avatar, Dropdown, Layout, Menu, Button } from "antd";
import Link from "next/link";
import { clearToken, getCookie } from "@/utils";
import { usePathname } from "next/navigation";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMenuClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    clearToken();
    window.location.href = "/auth/login"; // redirect to login after logout
  };

  const token = isClient ? getCookie("jwt") : null;

  const menuItems = [
    {
      key: "profile",
      label: (
        <Link
          href="/profile"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Profile
        </Link>
      ),
    },
    {
      key: "auth",
      label: (
        <a
          onClick={handleLogout}
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Logout
        </a>
      ),
    },
  ];

  return (
    <Header className="bg-white shadow-md px-4">
      <div className="flex justify-between items-center h-full">
        <div className="text-2xl font-bold text-gray-900">
          <Link href="/">MyApp</Link>
        </div>
        <Menu
          mode="horizontal"
          className="flex-grow-0 flex items-center space-x-4"
        >
          <Menu.Item key="home" className="hover:bg-transparent">
            <Link
              href="/"
              className="text-lg text-gray-700 hover:text-blue-500"
            >
              Home
            </Link>
          </Menu.Item>
          {isClient && token ? (
            <Dropdown
              menu={{ items: menuItems }}
              open={dropdownVisible}
              onOpenChange={setDropdownVisible}
            >
              <Avatar
                className="cursor-pointer bg-blue-500"
                onClick={handleMenuClick}
                size="large"
              >
                U
              </Avatar>
            </Dropdown>
          ) : (
            <Menu.Item key="auth" className="hover:bg-transparent">
              <Link href="/auth/login">
                <Button type="primary" className="rounded-full px-6 py-2">
                  Login
                </Button>
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </div>
    </Header>
  );
};

export default AppHeader;
