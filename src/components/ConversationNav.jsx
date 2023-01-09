import React, { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { ActiveContext } from "../contexts/ActiveContext";

const ConversationNav = () => {
  const { data } = useContext(ChatContext);
  const { active, setActive } = useContext(ActiveContext);

  return (
    <div>
      <div className="w-full h-10vh flex items-center justify-between p-1 pb-2 bg-secondary">
        <div className="flex items-center ">
          <img
            src={data.user?.photoURL}
            className="w-12 h-12 md:w-8 md:h-8 rounded-full object-cover mr-2"
          />
          <h1 className="font-bold  md:text-sm">{data.user?.displayName}</h1>
        </div>
        <CancelOutlinedIcon onClick={() => setActive(false)} />
      </div>
    </div>
  );
};

export default ConversationNav;
