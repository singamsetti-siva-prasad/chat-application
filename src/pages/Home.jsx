import React from "react";
import Chats from "../components/Chats";
import Conversation from "../components/Conversation";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="w-screen h-screen  flex items-center justify-center bg-gray">
      <div className="w-full h-full flex">
        <Sidebar />
        <Conversation />
      </div>
    </div>
  );
};

export default Home;
