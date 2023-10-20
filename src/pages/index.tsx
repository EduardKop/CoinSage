import styles from '../styles/Home.module.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from '../components/Coin';
import ToggleThemeButton from '@/components/ToggleThemeButton';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';




interface CoinData {
  name: string;
  priceUsd: string;
  symbol: string;
  volumeUsd24Hr: string;
  changePercent24Hr: string;
  marketCapUsd: string;
}
interface HistoryData {
  date: string;
  priceUsd:string;
  name:string;
  price:any;
}


export default function Page() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [search, setSearch] = useState<string>('');
  const [infoCoin, setInfoCoin] = useState<CoinData | null>();
  const [historyInfo, sethistoryInfo] = useState<HistoryData[]>([]);
  const [chartData, setchartData] = useState<HistoryData[]>([]);

  useEffect(() => {
    if (infoCoin) {
      console.log(infoCoin)

    axios.get(`https://api.coincap.io/v2/assets/${(infoCoin.name).toLowerCase()}/history?interval=d1`)
    .then((res) => {
        // sethistoryInfo(res.data.data);
        let result:any = []
       for (let i=1; i<7;i++){
        result.push(res.data.data[res.data.data.length-i])
      }
        sethistoryInfo(result);
      
      })
      .catch((error) => console.log(error));
    }
  }, [infoCoin]);

  useEffect(() => {
    axios
      .get('https://api.coincap.io/v2/assets/')
      .then((res) => {
        setCoins(res.data.data);

        const bitcoin = res.data.data.find((coin:any) => coin.name === 'Bitcoin');
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
      let arr: HistoryData[] = [];
      let historyInfo_length = historyInfo.length;
  
      for (let i = 0; i < historyInfo_length; i++) {
          try {
            if(historyInfo[i].priceUsd != undefined){
            let roundedPriceUsd = parseFloat(historyInfo[i].priceUsd).toFixed(3);
            let dateStr = historyInfo[i].date.split("T")[0];
            
            arr.push({
                name: dateStr,
                price: roundedPriceUsd,
            });
          }
          }catch(err){
          console.log(err)
          }
          
       
        
      }
      console.log(arr)
      setchartData(arr);
    }
  };
  const fetchHistoryData = (coinName: string) => {
    axios.get(`https://api.coincap.io/v2/assets/${coinName.toLowerCase()}/history?interval=d1`)
      .then((res) => {
        let result: any = [];
        for (let i = 1; i < 7; i++) {
          result.push(res.data.data[res.data.data.length - i]);
        }
        sethistoryInfo(result);

        // Добавлено обработка данных для графика
        let arr: HistoryData[] = [];
        for (let i = 0; i < result.length; i++) {
          if (result[i].priceUsd != undefined) {
            let roundedPriceUsd = parseFloat(result[i].priceUsd).toFixed(3);
            let dateStr = result[i].date.split("T")[0];
            arr.push({
              name: dateStr,
              price: roundedPriceUsd,
            });
          }
        }
        setchartData(arr);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    if (infoCoin) {
      fetchHistoryData(infoCoin.name);
    }
  }, [infoCoin]);

  useEffect(() => {
    axios
      .get('https://api.coincap.io/v2/assets/')
      .then((res) => {
        setCoins(res.data.data);
        const bitcoin = res.data.data.find((coin: any) => coin.name === 'Bitcoin');
        if (bitcoin) {
          setInfoCoin(bitcoin);
          fetchHistoryData(bitcoin.name);  // Загружаем исторические данные для Bitcoin при первой загрузке
        }
      })
      .catch((error) => console.log(error));
  }, []);

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
            placeholder="Search crypto  "
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
                <div className={styles.img}>
                <img src={`https://assets.coincap.io/assets/icons/${infoCoin.symbol.toLowerCase()}@2x.png`} alt='crypto' />
                </div>
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
              <div className={styles.carts}>
              <LineChart width={600} height={300} data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                </LineChart>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
