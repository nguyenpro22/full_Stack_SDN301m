"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Navigate to user management page on load
    router.push("/admin/user");
  }, [router]);

  return <div className="text-center mt-8">Welcome to the Admin Dashboard</div>;
};

export default AdminPage;
