import react from "react";
import "../styles/square.css";
import { useState, useEffect } from "react";
function Square(props) {
  const [value, setValue] = useState("");
  function handleClick() {
    setValue(props.symbol);
  }
  return (
    <button className="square" onClick={() => handleClick()}>
      {value}
    </button>
  );
}

export default Square;
