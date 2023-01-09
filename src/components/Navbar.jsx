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
    <div className="w-full h-10vh flex justify-between items-center  bg-secondary p-2">
      <div className="flex items-center justify-between  w-full">
        <img
          className="w-1/2 h-10 object-contain md:hidden"
          src="src/images/logoblack.png "
        />
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
            className="bg-button rounded-lg px-2 h-8 text-xs font-medium"
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
