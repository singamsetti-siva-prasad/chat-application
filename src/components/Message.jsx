import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";

let timeStamp = Date.now() / 1000;
let date = new Date(timeStamp * 1000);
let hours = date.getHours();
let minutes = "0" + date.getMinutes();
let formattedTime = hours + ":" + minutes;
// console.log(formattedTime);

const Message = ({ message }) => {
  const ref = useRef();

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <div
        className={`w-full h-5vh flex items-center p-5 mb-10 ${
          message.senderId === currentUser.uid ? "flex-row" : "flex-row-reverse"
        }`}
        ref={ref}
      >
        <div className=" flex flex-col items-center ">
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            className="w-8 h-8 rounded-full m-1 object-cover"
          />
        </div>
        <div className=" bg-white h-full flex items-center rounded-lg ml-5 flex-col ">
          {message.img && (
            <img
              src={message.img}
              className="h-80 w-80  object-contain overflow-hidden"
            />
          )}
          <div className="flex flex-col  min-w-full	">
            <p className="p-1 mb-1 ">{message.text} </p>
            {/* <p className="text-[10px] text-lightBlack font-normal flex items-end  ">
              {formattedTime}
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
