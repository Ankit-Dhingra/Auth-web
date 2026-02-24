import React from "react";

const Header = () => {
  return (
    <div className="relative bg-black flex items-center border-b border-white/20 shadow-md px-6 py-4">

      {/* LEFT LOGO */}
      <div className="font-bold text-3xl text-white">
        Crypto
      </div>

      {/* CENTER SEARCH */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <input
          type="text"
          placeholder="Search Coin Here..."
          className="
            w-80
            px-4 py-2
            rounded-full
            text-white
            placeholder-white/60
            bg-white/10
            backdrop-blur-md
            border border-white/20
            focus:outline-none
            focus:border-red-400
            transition
          "
        />
      </div>

    </div>
  );
};

export default Header;