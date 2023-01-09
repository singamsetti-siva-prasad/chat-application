import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const handleClick = async () => {
    await signOut(auth);
  };

  return (
    <div className="w-full h-10vh flex justify-between items-center bg-blue p-2">
      <div className="flex items-center justify-between  w-full">
        <h1 className="w-1/3 text-lg font-bold text-black md:text-sm md:hidden ">
          Let's Chat
        </h1>
        <div className="flex justify-around items-center w-2/3">
          <div className="flex items-center">
            <img
              src={currentUser.photoURL}
              className="h-12 w-12 rounded-full mr-3 object-cover"
            />
            <span className="font-bold text-ellipsis	 text-white md:text-sm ">
              {currentUser.displayName}
            </span>
          </div>
          <button
            className="bg-slate-600 rounded-lg px-2 h-8 text-xs font-medium"
            onClick={handleClick}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
