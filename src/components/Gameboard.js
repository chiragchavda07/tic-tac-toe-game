import React from "react";
import "../styles/gameboard.css";
import "../styles/square.css";
import "../styles/winning_crackers.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Gameboard(props) {
  const socket = props.socket;
  const [symbol, setSymbol] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [roomID, setRoomID] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(
    () => {
      const isRefreshed =
        window.performance && window.performance.navigation.type === 1;
      if (isRefreshed) {
        navigate("/gameboard");
      }
      document.getElementById("winner").style.display = "none";
      // Accessing userInfo object from location state
      const userInfo = location.state?.params;
      if (userInfo) {
        // Now you have access to the userInfo object
        console.log("User Information:", userInfo);
        // Extracting individual properties
        const { playerName, roomID, symbol } = userInfo;
        setPlayerName(playerName);
        setRoomID(roomID);
        setSymbol(symbol);
      }
      socket.on("player_turn", (data) => {
        document.getElementById("status").innerText = "Your Turn";
        enableAllButtons();
        document.getElementById(data.index).disabled = true;
        document.getElementById(data.index).innerText = data.symbol;
        console.log("player turn: ", data);
      });
      socket.on("game_over", (winner_socket_id) => {
        disableAllButtons();
        if (socket.id === winner_socket_id) {
          document.getElementById("status").innerText =
            "Congratulations! You won";
          document.getElementById("winner").style.display = "block";
        } else {
          document.getElementById("status").innerText = "Sorry! You lost";
        }
        // socket.disconnect();
      });
    },
    [location.state],
    socket,
    navigate
  );

  const squareComponents = [];
  for (let index = 0; index < 9; index++) {
    squareComponents.push(
      <button
        id={index}
        disabled={false}
        className="square"
        onClick={() => handleClick(index)}
      ></button>
    );
  }
  function disableAllButtons() {
    for (let index = 0; index < 9; index++) {
      document.getElementById(index).disabled = true;
      document.getElementById(index).classList.remove("square");
      document.getElementById(index).classList.add("overlay");
      document.getElementsByClassName("gameboard").backgroundColor = "red";
    }
  }
  function enableAllButtons() {
    for (let index = 0; index < 9; index++) {
      document.getElementById(index).disabled = false;
      document.getElementById(index).classList.add("square");
      document.getElementById(index).classList.remove("overlay");
      // document.getElementsByClassName("gameboard").backgroundColor = "red";
    }
  }

  //when user clicks his/her move, this function will be called
  //it should disable all the buttons
  //it should update the status to wait for another player to move
  function sendBoardData_to_server(index) {
    socket.emit("player_move", {
      info: { socket_id: socket.id, index: index, symbol: symbol },
      roomID: roomID,
    });
  }
  function handleClick(index) {
    document.getElementById(index).disabled = true;
    document.getElementById(index).innerText = symbol;
    sendBoardData_to_server(index);
    document.getElementById("status").innerText =
      "Wait for another player to move";
    disableAllButtons();
  }

  return (
    <div>
      <div className="info">
        Hii {playerName}, You are in room {roomID}. Your symbol is {symbol}
      </div>
      <div className="gameboard ">{squareComponents}</div>
      <div id="status" className="info ">
        Please make your move
      </div>
      <div id="winner">
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
      </div>
    </div>
  );
}
export default Gameboard;
