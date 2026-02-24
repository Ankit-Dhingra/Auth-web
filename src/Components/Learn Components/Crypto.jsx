import axios from "axios";
import React, { useEffect, useState } from "react";
import CoinCard from "./CoinCard";
import Header from "./Header";

const Crypto = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
        );
        setCoins(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCoin();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <div className="bg-black flex flex-wrap gap-9 justify-center p-4">
        {coins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
};

export default Crypto;
