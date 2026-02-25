import React, { useState } from "react";

const Header = () => {

  const [search, setSearch] = useState('');

  const searchSuggestion = ['Bitcoin', 'Ethereum', 'Tether', 'Solana', 'Cardano', 'Polkadot'];

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }
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
          value={search}
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

          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div>
        {
          search.length > 0 && (
            <div className="absolute left-1/2 -translate-x-1/2 top-16 bg-black/10 backdrop-blur-xl border border-white/20 w-80 px-4 py-2 rounded-lg">
              {
                searchSuggestion.filter((coin) => coin.toLowerCase().includes(search.toLowerCase())).map((coin) => (
                  <p className="text-white text-sm py-2" key={coin}>{coin}</p>
                ))
              }
            </div>
          )
        }
      </div>

    </div>
  );
};

export default Header;