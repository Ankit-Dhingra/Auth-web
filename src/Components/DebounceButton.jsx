import React, { useMemo, useState } from "react";

const DebounceButton = () => {
  const [search, setSearch] = useState("");

  function debounce(fn, delay) {
    let timer;

    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  const searchAPI = (value) => {
    console.log("Search for : ", value);
  };

  const debouncedSearch = useMemo(() => {
    return debounce(searchAPI, 500);
  }, []);

  const handleClick = (e) => {
    const value = e.target.value;

    setSearch(value);

    console.log("typed:", value);

    debouncedSearch(value); // call debounced function
  };

  return (
    <div className="flex justify-center items-center h-screen gap-1.5 ">
      <input
        className="px-2.5 py-2.5 border-3 rounded-md border-red-500 focus:border-red-400"
        type="text"
        value={search}
        onChange={(e) => handleClick(e)}
      />
      <button className="px-3 py-3 rounded-lg bg-red-500 text-white font-semi-bold hover:bg-red-600 transition-all ease-in-out ">
        Click Here
      </button>
    </div>
  );
};

export default DebounceButton;
