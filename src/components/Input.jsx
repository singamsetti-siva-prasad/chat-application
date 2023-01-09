import {
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import { storage, db } from "../firebase";
import { v4 as uuid } from "uuid";

const Input = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          data: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className="w-2/3 flex bg-white p-2 fixed bottom-0 left-1/3 sm:left-0 sm:w-full">
      <input
        placeholder="Type something here..."
        className="w-full border-none "
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="flex items-center">
        <input
          type="file"
          className="hidden"
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src="src/images/add-file.png" alt="" className=" mr-2 h-8 w-8" />
        </label>
        <button
          className="px-2 h-8 w-12 bg-button rounded-lg text-center text-xs font-medium"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
