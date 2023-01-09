import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../contexts/ChatContext";
import ConversationNav from "./ConversationNav";
import Input from "./Input";
import Message from "./Message";
import { db } from "../firebase";
import { ActiveContext } from "../contexts/ActiveContext";

const Conversation = () => {
  const w = window.innerWidth;

  const { data } = useContext(ChatContext);
  const { active, setActive } = useContext(ActiveContext);

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <>
      {active ? (
        <div className="w-2/3 h-screen flex flex-col md:w-full ">
          <ConversationNav />
          <div className="h-80vh ">
            {messages?.map((message) => (
              <Message message={message} key={message.id} />
            ))}
          </div>

          <Input />
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center md:hidden">
          <p className="bg-white rounded-lg px-3 font-bold">
            Select a chat and start messaging
          </p>
        </div>
      )}
    </>
  );
};

export default Conversation;
