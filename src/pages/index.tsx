import styles from '../styles/Home.module.scss'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from '../components/Coin';

interface CoinData {
    name: string;
    priceUsd: string;
    symbol: string;
    volumeUsd24Hr:string;
    changePercent24Hr:string;
    marketCapUsd:string
  }

export default function Page() {
    const [coins, setCoins] = useState<CoinData[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        axios
          .get(
            'https://api.coincap.io/v2/assets/'
          )
          .then(res => {
            setCoins(res.data.data);
            console.log(coins);
          })
          .catch(error => console.log(error));
      }, []);

   
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
      };
        const filteredCoins: CoinData[] = coins.filter((coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase())
        );
        
   return (
    <div className='coin-app'>
    <div className='coin-search'>
      <h1 className='coin-text'>Search a currency</h1>
      <form>
        <input
          className='coin-input'
          type='text'
          onChange={handleChange}
          placeholder='Search'
        />
      </form>
    </div>
    {filteredCoins.map((coin,index) => {
      return (
        <Coin
            key={index}
            name={coin.name}
            priceUsd = {coin.priceUsd}
            symbol = {coin.symbol}
            volumeUsd24Hr = {coin.volumeUsd24Hr}
            changePercent24Hr = {coin.changePercent24Hr}
            marketCapUsd = {coin.marketCapUsd}
        />
      );
    })}
  </div>
);
}