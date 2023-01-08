import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  getDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../contexts/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSelect = async () => {
    //check if the currentUSer and user has chat between them in fireStore,
    // if does not exist we have to create
    console.log("handling on handleSelect");

    const combinedID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      //getting docs
      const res = await getDoc(doc(db, "chats", combinedID));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedID), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedID + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedID + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUser(null);
    setUsername("");

    //create document(conversation) in chats Collection using id by
    //combining the uid's
  };
  return (
    <div className="w-full">
      <input
        placeholder="search conversation"
        className="w-full px-2 py-1 bg-slate-100 "
        value={username}
        onKeyDown={handleKey}
        onChange={handleChange}
      />
      {err && <span className="text-center font-bold">User not found!</span>}
      {user && (
        <div
          className="w-full h-10vh border-b-2 border-green-100 border-b-white"
          onClick={handleSelect}
        >
          <div className="w-full h-full flex bg-slate-300 items-center p-2 hover:bg-slate-500">
            <img src={user.photoURL} className="w-12 h-12 rounded-full" />
            <div className="ml-2">
              <h1 className="font-bold">{user.displayName}</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
