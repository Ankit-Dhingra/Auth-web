import React from "react";

const CoinCard = ({ coin }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-60">
      <img
        className="h-24 object-contain mx-auto"
        src={coin.image}
        alt={coin.name}
      />

      <h3 className="text-center mt-2 font-bold text-lg">{coin.name}</h3>

      <h2 className="text-md font-semibold text-green-600 text-center">
        <span className="text-black">Price:</span> $
        {coin.current_price.toLocaleString()}
      </h2>

      <h6 className="text-sm text-center mt-1">
        <span className="font-bold">Last Updated:</span>{" "}
        {new Date(coin.last_updated).toLocaleString()}
      </h6>
    </div>
  );
};

export default CoinCard;
