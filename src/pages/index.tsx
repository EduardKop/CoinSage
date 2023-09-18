import styles from '../styles/Home.module.scss'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from '../components/Coin';

interface CoinData {
    name: string;
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

      interface Coin {
        name: string;
      }
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
      };
        const filteredCoins: Coin[] = coins.filter((coin) =>
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
    {filteredCoins.map(coin => {
      return (
        <Coin
          name={coin.name}
        />
      );
    })}
  </div>
);
}