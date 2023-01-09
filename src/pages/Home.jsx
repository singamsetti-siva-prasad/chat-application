import React, { useContext } from "react";
import Chats from "../components/Chats";
import Conversation from "../components/Conversation";
import Sidebar from "../components/Sidebar";
import { ActiveContext } from "../contexts/ActiveContext";

const Home = () => {
  const { active, setActive } = useContext(ActiveContext);

  return (
    <div className="w-screen h-screen  flex items-center justify-center bg-gray">
      <div className={`w-full h-full flex md:flex-col `}>
        <Sidebar />

        <Conversation />
      </div>
    </div>
  );
};

export default Home;
