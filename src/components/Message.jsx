import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";

let timeStamp = Date.now() / 1000;
let date = new Date(timeStamp * 1000);
let hours = date.getHours();
let minutes = date.getMinutes();
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
            className="w-8 h-8 rounded-full"
          />
          <span className="text-xs text-lightBlack pt-3 pr-1">
            {formattedTime}
          </span>
        </div>
        <div className=" bg-white h-full flex items-center rounded-lg ml-5  ">
          <p className="p-1">{message.text}</p>
          {message.img && (
            <img
              src={message.img}
              className="h-10 w-10 rounded-lg overflow-hidden"
            />
          )}
        </div>
      </div>
      {/* <div className="w-full h-5vh flex items-center p-5 flex-row-reverse  mb-10">
        <div className=" flex flex-col items-center ">
          <img src="src/images/woman.jpg" className="w-8 h-8 rounded-full" />
          <span className="text-xs  text-blue-400 font-semibold ">
            just now
          </span>
        </div>
        <div className=" bg-white h-full flex items-center rounded-lg ml-5  ">
          <span className="p-1">I am good what about you?</span>
          <span className="text-xs text-lightBlack pt-3 pr-1">
            {formattedTime}
          </span>
        </div>
      </div> */}
    </>
  );
};

export default Message;
