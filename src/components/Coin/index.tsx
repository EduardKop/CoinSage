import React from 'react';
import styles from '../../styles/Coin.module.scss'

interface CoinProps {
    name: string;
    priceUsd: string;
    symbol: string;
    volumeUsd24Hr:string;
    changePercent24Hr:string;
    marketCapUsd:string;
    image:any;
    click:any
  }
  
const Coin: React.FC<CoinProps>  = ({
    name,
    priceUsd,
    symbol,
    volumeUsd24Hr,
    changePercent24Hr,
    marketCapUsd,
    image,
    click

}) => {

    const changePercent = parseFloat(changePercent24Hr);
    const price = parseFloat(priceUsd);
    const volume = parseFloat(volumeUsd24Hr);
    const marketCup = parseFloat(marketCapUsd);

  return (

    <div className={styles.coin_container} onClick={click}>
      <div className={styles.coin_row}>
        <div className={styles.coin}>
          <div className={styles.img}>
            <img src={image} alt='crypto' />
          </div>
          <div className={styles.name_info}>
            <span className={styles.name}>{name}</span>
            <span className={styles.symbol}>{symbol}</span>
          </div>
        </div>
        <div className={styles.coin_data}>
          <div className={styles.coin_main_info}>
          <span className={styles.coin_price}>${price.toFixed(2)}</span>
          {changePercent < 0 ? (
            <div className={styles.coin_percent}> 
              <span className={`${styles.red}`}>{changePercent.toFixed(2)}%</span>
            </div>
          ) : (
            <div className={styles.coin_percent}> 
              <span className={`${styles.green}`}>{changePercent.toFixed(2)}%</span>
            </div>
          )}
          </div>
         
        </div>
      </div>
      <div className={styles.coin_second_info}>
          {/* <p className='coin-volume'>${volume.toFixed(2)}</p> */}

          <p className={styles.coin_marketcap}>
            Mkt Cap: ${marketCup.toFixed(2)}
          </p>
          </div>
    </div>
  );
};

export default Coin;
