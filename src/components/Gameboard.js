import React from "react";
import Square from "./Square";
import "../styles/gameboard.css";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

function Gameboard() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [symbol, setSymbol] = useState(null);
  const location = useLocation();
  useEffect(() => {
    // Accessing userInfo object from location state
    const userInfo = location.state?.params;

    if (userInfo) {
      // Now you have access to the userInfo object
      console.log("User Information:", userInfo);

      // Extracting individual properties
      const { playerName, roomID, sym } = userInfo;
      setSymbol(sym);
    }
  }, [location.state]);

  // const { playerName, roomID, sym } = paramsObject;
  // console.log(sym);
  // // const { playerName, roomID, sym } = useParams();
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   var userinformation = searchParams.get("user");
  //   setSymbol(userinformation.sym);
  // }, location.search);
  return (
    <div>
      <div className="info">Your symbol is {symbol}</div>
      <div className="gameboard">
        {squares.map((value, index) => (
          <Square key={index} value={value} symbol={symbol} />
        ))}
      </div>
      <div className="info">waiting for another player to move</div>
    </div>
  );
}
export default Gameboard;
