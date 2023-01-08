import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../contexts/ChatContext";
import ConversationNav from "./ConversationNav";
import Input from "./Input";
import Message from "./Message";
import { db } from "../firebase";

const Conversation = () => {
  const { data } = useContext(ChatContext);
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
    <div className="w-2/3 h-screen flex flex-col  ">
      <ConversationNav />
      <div className="h-80vh">
        {messages?.map((message) => (
          <Message message={message} key={message.id} />
        ))}
      </div>

      <Input />
    </div>
  );
};

export default Conversation;
