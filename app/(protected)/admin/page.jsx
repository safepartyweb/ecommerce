"use client";

import { useSelector } from "react-redux";

export default function DashboardPage() {
  const { userInfo } = useSelector((state) => state.auth);
  

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-xl font-bold">Dashboard</h1>
      <p>Welcome, {userInfo.name}!</p>
      <p>Your email: {userInfo.email}</p>
    </>
  );
}
