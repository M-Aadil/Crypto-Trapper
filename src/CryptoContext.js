import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react'
import { createContext } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { CoinList } from './Config/api';
import { auth, db } from "./firebase";
import { onSnapshot, doc } from "firebase/firestore";


const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('INR');
  const [symbol, setSymbol] = useState('₹');
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    messag: "",
    type: "success",
  });


  const [ watchlist, setWatchlist ] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);

      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No items on Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user])

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) setUser(user);
      else setUser(null);
    })
  }, [])

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    // console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === 'INR') setSymbol('₹')
    else if (currency === 'USD') setSymbol('$');
  }, [currency])

  return (
    <div>
      <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user, watchlist, }}>
        {children}
      </Crypto.Provider>
    </div>
  )
}

export default CryptoContext;


export const CryptoState = () => {
  return useContext(Crypto)
};