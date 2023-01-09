import { onSnapshot, doc } from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import { ActiveContext } from "../contexts/ActiveContext";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { active, setActive } = useContext(ActiveContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setActive(true);
  };

  return (
    <div className="w-full">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="w-full h-10vh border-b-2 border-green-100"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <div className="w-full h-full flex bg-slate-300 items-center p-2 hover:bg-slate-500">
              <img
                src={chat[1].userInfo.photoURL}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-2 ">
                <h1 className="font-bold">{chat[1].userInfo.displayName}</h1>
                <p className="text-sm">{chat[1].userInfo.lastMessage?.text}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
