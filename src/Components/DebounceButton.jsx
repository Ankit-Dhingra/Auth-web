import React from "react";

const DebounceButton = () => {

  const handleClick = () => {
    console.log("clicked")
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="px-3 py-3 rounded-lg bg-red-500 text-white font-semi-bold hover:bg-red-600 transition-all ease-in-out "
        onClick={handleClick}
      >
        Click Here
      </button>
    </div>
  );
};

export default DebounceButton;
