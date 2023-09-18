import React from 'react';
import styles from '../../styles/Coin.module.scss'

interface CoinProps {
    name: string;
  
  }
  
const Coin: React.FC<CoinProps>  = ({
  name,
//   price,
//   symbol,
//   marketcap,
//   volume,
//   image,
//   priceChange
}) => {
  return (
    <h1>{name}</h1>
    // <div className='coin-container'>
    //   <div className='coin-row'>
    //     <div className='coin'>
    //       <img src={image} alt='crypto' />
    //       <h1>{name}</h1>
    //       <p className='coin-symbol'>{symbol}</p>
    //     </div>
    //     <div className='coin-data'>
    //       <p className='coin-price'>${price}</p>
    //       <p className='coin-volume'>${volume.toLocaleString()}</p>

    //       {priceChange < 0 ? (
    //         <p className='coin-percent red'>{priceChange.toFixed(2)}%</p>
    //       ) : (
    //         <p className='coin-percent green'>{priceChange.toFixed(2)}%</p>
    //       )}

    //       <p className='coin-marketcap'>
    //         Mkt Cap: ${marketcap.toLocaleString()}
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Coin;
