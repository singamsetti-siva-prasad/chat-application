import React from "react";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";

const Sidebar = () => {
  return (
    <div className="w-1/3  bg-white border-r-2 sm:w-full ">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
