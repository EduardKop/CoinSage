import React from 'react';
import styles from '../../styles/Coin.module.scss'

interface CoinProps {
    name: string;
    priceUsd: string;
    symbol: string;
    volumeUsd24Hr:string;
    changePercent24Hr:string;
    marketCapUsd:string
  }
  
const Coin: React.FC<CoinProps>  = ({
    name,
    priceUsd,
    symbol,
    volumeUsd24Hr,
    changePercent24Hr,
    marketCapUsd

}) => {

    const changePercent = parseFloat(changePercent24Hr);

  return (

    <div className='coin-container'>
      <div className='coin-row'>
        <div className='coin'>
          {/* <img src={image} alt='crypto' /> */}
          <h1>{name}</h1>
          <p className='coin-symbol'>{symbol}</p>
        </div>
        <div className='coin-data'>
          <p className='coin-price'>${priceUsd}</p>
          <p className='coin-volume'>${volumeUsd24Hr}</p>

          {changePercent < 0 ? (
            <p className='coin-percent red'>{changePercent.toFixed(2)}%</p>
          ) : (
            <p className='coin-percent green'>{changePercent.toFixed(2)}%</p>
          )}

          <p className='coin-marketcap'>
            Mkt Cap: ${marketCapUsd}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Coin;
