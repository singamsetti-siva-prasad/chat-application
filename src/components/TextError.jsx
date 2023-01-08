import React from "react";

function TextError(props) {
  return <div className="text-red-600 font-bold text-xs">{props.children}</div>;
}
export default TextError;
