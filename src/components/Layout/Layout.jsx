import React from "react";
import Navbar from "..//Navbar";
import Sidebar from "..//Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="w-64">
          <Sidebar />
        </div>
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;