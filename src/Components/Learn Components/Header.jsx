import axios from "axios";
import React, { useMemo, useState } from "react";

const Header = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (value) => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${value}`,
      );

      setSuggestions(data.coins.slice(0, 6));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const debounceSearch = (fn, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      console.log("fnfj", timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const debounceSearchSuggestion = useMemo(
    () => debounceSearch(fetchSuggestions, 200),
    [],
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    debounceSearchSuggestion(value);
  };
  return (
    <div className="relative bg-black flex items-center border-b border-white/20 shadow-md px-6 py-4">
      {/* LEFT LOGO */}
      <div className="font-bold text-3xl text-white">Crypto</div>

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
        {search.length > 0 && suggestions.length > 0 && (
          <div className="absolute left-1/2 -translate-x-1/2 top-16 bg-black/80 backdrop-blur-xl border border-white/20 w-80 px-4 py-2 rounded-lg">
            {loading && <p className="text-white">Searching...</p>}

            {suggestions.map((coin) => (
              <p
                key={coin.id}
                className="text-white text-sm py-2 cursor-pointer hover:text-red-400"
              >
                {coin.name} ({coin.symbol})
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
