import React, { useState } from "react";
import "./Buynow.css";
import Cryptotile from "./Cryptotile";
import BuyForm from "./BuyForm";
import Transactions from "./Transactions";

import btc from "./Assets/btc.png";
import eth from "./Assets/eth.png";
import doge from "./Assets/doge.png";
import axios from "axios";

function Buynow() {
  const getRealValue = () => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DOGE&tsyms=INR"
      )
      .then((response) => {
        console.log(response);
        setRealCoin(response.data.BTC.INR);
      });
  };

  const tiles = [
    { id: 1, icon: btc, name: "BTC", rate: 3000 },
    { id: 2, icon: eth, name: "ETH", rate: 300 },
    { id: 3, icon: doge, name: "DOGE", rate: 30000 },
  ];

  const [selectedTile, setSelectedState] = useState(tiles[0]);
  const [list, setList] = useState([]);
  const [realCoin, setRealCoin] = useState("");

  const handleSelect = (data) => {
    setSelectedState(data);
  };

  const buildList = (list) => {
    setList(list);
  };

  return (
    <div className="buynow">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="d-flex">
              {tiles.map((cryptocoin) => (
                <Cryptotile
                  key={cryptocoin.id}
                  data={cryptocoin}
                  onClick={handleSelect}
                  selected={cryptocoin.id === selectedTile.id}
                />
              ))}
            </div>
            <BuyForm data={selectedTile} onPurchase={buildList} />
          </div>
          <div className="col-6 TransHist">
            <Transactions list={list} />
          </div>
          <div>
            <button onClick={getRealValue}> Hello</button>
            {realCoin}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buynow;
