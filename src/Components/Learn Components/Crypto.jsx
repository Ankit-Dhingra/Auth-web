import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import CoinCard from "./CoinCard";
import Header from "./Header";

const Crypto = () => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchCoin = async () => {
      if (loading || !hasMore) return;
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=${page}&sparkline=false`,
        );

        if (data.length === 0) {
          setHasMore(false);
          return;
        }
        setCoins((prev) => [...prev, ...data]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [page]);

  // With OnScroll

  function throttle(fn, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();

      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      fn(...args);
    };
  }

  // useEffect(() => {
  //   const handleScroll = throttle(() => {
  //     const nearBottom =
  //       window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  //       console.log("tesrrr " , nearBottom)
  //     if (nearBottom && hasMore && !loading) {
  //       setPage((prev) => prev + 1);
  //     }
  //   }, 200);

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // },[page]);

  // With Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];

      if (firstEntry.isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    const currentLoader = loaderRef.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      observer.disconnect(); // cleaner cleanup
    };
  }, [hasMore]); // attach once

  return (
    <div className="min-h-screen bg-black">
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <div className="bg-black flex flex-wrap gap-9 justify-center p-4">
        {coins.length === 0 ? (
          <div className="text-center p-4 font-bold text-red-400 text-4xl w-full">
            Loading Coins...
          </div>
        ) : (
          coins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
        )}
      </div>
      <div
        ref={loaderRef}
        className="text-center p-4 font-bold text-red-400 text-4xl"
      >
        {loading && "Loading..."}
        {!hasMore && "No more coins"}
      </div>
    </div>
  );
};

export default Crypto;
