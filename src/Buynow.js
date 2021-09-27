import React, { useState, useEffect } from "react";
import "./Buynow.css";
import Cryptotile from "./Cryptotile";
import BuyForm from "./BuyForm";
import Transactions from "./Transactions";

import btc from "./Assets/btc.png";
import eth from "./Assets/eth.png";
import doge from "./Assets/doge.png";
import axios from "axios";

function Buynow() {

  const [list, setList] = useState([]);
  const [tiles, setTiles] = useState([
    { id: 1, icon: btc, name: "BTC", rate: 0 },
    { id: 2, icon: eth, name: "ETH", rate: 0 },
    { id: 3, icon: doge, name: "DOGE", rate: 0 },
  ])
  const [selectedTile, setSelectedState] = useState(tiles[0]);

  useEffect(() => {
    const getData =  async() => {
      try {
        const res = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DOGE&tsyms=INR')
        const newTiles = [...tiles]
        let index = 0
        for(let value in res.data){
          newTiles[index].rate = res.data[value].INR
          index++
        }
        setTiles(newTiles)
      } catch(err) {
        console.log(err)
      }
    }
    getData()
  })


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
              {
                tiles.length > 0 ?
                tiles.map((cryptocoin) => 
                  <Cryptotile
                    key={cryptocoin.id}
                    data={cryptocoin}
                    onClick={handleSelect}
                    selected={cryptocoin.id === selectedTile.id}
                  />
                )
                : null
              }
            </div>
            <BuyForm data={selectedTile} onPurchase={buildList} />
          </div>
          <div className="col-6 TransHist">
            <Transactions list={list} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buynow;
