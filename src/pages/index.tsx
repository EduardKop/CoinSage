import styles from '../styles/Home.module.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from '../components/Coin';
import ToggleThemeButton from '@/components/ToggleThemeButton';

interface CoinData {
  name: string;
  priceUsd: string;
  symbol: string;
  volumeUsd24Hr: string;
  changePercent24Hr: string;
  marketCapUsd: string;
}

export default function Page() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [search, setSearch] = useState<string>('');
  const [infoCoin, setInfoCoin] = useState<CoinData | null>(null);

  useEffect(() => {
    axios
      .get('https://api.coincap.io/v2/assets/')
      .then((res) => {
        setCoins(res.data.data);

        const bitcoin = res.data.data.find((coin) => coin.name === 'Bitcoin');
        if (bitcoin) {
          setInfoCoin(bitcoin);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClick = (e: string) => {
    const result = coins.find((target) => target.name === e);
    if (result) {
      setInfoCoin(result);
      console.log(result)
    }
  };

  const filteredCoins: CoinData[] = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.coin_app}>
      <div className={styles.header}>
        <div className={styles.input}>
          <input
            className="coin-input"
            type="text"
            onChange={handleChange}
            placeholder="Search crypto"
          />
        </div>
        <div className={styles.toggle}>
          <ToggleThemeButton />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.coin_body_container}>
          {filteredCoins.map((coin, index) => {
            return (
              <Coin
                image={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                key={index}
                name={coin.name}
                click={() => handleClick(coin.name)}
                priceUsd={coin.priceUsd}
                symbol={coin.symbol}
                volumeUsd24Hr={coin.volumeUsd24Hr}
                changePercent24Hr={coin.changePercent24Hr}
                marketCapUsd={coin.marketCapUsd}
              />
            );
          })}
        </div>
        <div className={styles.info_body_container}>
          {infoCoin && (
            <div className={styles.wrapper_coin}>
              <div className={styles.name}>
                <span className={styles.main_name}>{infoCoin.name}</span>
                <span className={styles.main_symbol}>{infoCoin.symbol}</span>
              </div>
              <div className={styles.main_price}>
                <span className={styles.main_price_value}>
                  $ {parseFloat(infoCoin.priceUsd).toFixed(2)}
                </span>
                <span className={styles.main_symbol}>
                {parseFloat(infoCoin.changePercent24Hr) < 0 ? (
  <div className={styles.coin_percent}> 
    <span className={`${styles.red}`}>{parseFloat(infoCoin.changePercent24Hr).toFixed(2)}%</span>
  </div>
) : (
  <div className={styles.coin_percent}> 
    <span className={`${styles.green}`}>{parseFloat(infoCoin.changePercent24Hr).toFixed(2)}%</span>
  </div>
)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
