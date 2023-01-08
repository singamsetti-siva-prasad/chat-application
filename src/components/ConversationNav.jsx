import React, { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";

const ConversationNav = () => {
  const { data } = useContext(ChatContext);

  return (
    <div>
      <div className="w-full h-10vh flex items-center p-2 bg-secondary">
        <img
          src={data.user?.photoURL}
          className="w-12 h-12 rounded-full mr-2"
        />
        <h1 className="font-bold text-xl">{data.user?.displayName}</h1>
      </div>
    </div>
  );
};

export default ConversationNav;
