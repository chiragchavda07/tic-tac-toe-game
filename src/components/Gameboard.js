import React from "react";
import "../styles/gameboard.css";
import "../styles/square.css";
import "../styles/winning_crackers.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function Gameboard(props) {
  const location = useLocation();
  const socket = props.socket;
  const symbol = location.state?.params.symbol;
  const playerName = location.state?.params.playerName;
  const roomID = location.state?.params.roomID;
  const [checkedButtons, setCheckedButtons] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const squareComponents = [];
  for (let index = 0; index < 9; index++) {
    squareComponents.push(
      <button
        id={index}
        disabled={true}
        className="overlay"
        onClick={() => handleClick(index)}
      ></button>
    );
  }

  socket.on("start_game", (inititator_socket_id) => {
    console.log("inititator_socket_id: ", inititator_socket_id);
    if (inititator_socket_id === socket.id) {
      document.getElementById("status").innerText = "Your Turn";
      enableAllButtons();
    } else {
      document.getElementById("status").innerText =
        "Wait for another player to move";
      disableAllButtons();
    }
  });
  useEffect(() => {
    document.getElementById("winner").style.display = "none";
    socket.on("player_turn", (data) => {
      document.getElementById("status").innerText = "Your Turn";
      document.getElementById(data.index).innerText = data.symbol;
      var newcheckedButtons = [...checkedButtons];
      newcheckedButtons[data.index] = true;
      setCheckedButtons(newcheckedButtons);
      enableAllButtons();
    });
    socket.on("game_over", (winner_socket_id) => {
      console.log("game over");
      disableAllButtons();
      if (socket.id === winner_socket_id) {
        document.getElementById("status").innerText =
          "Congratulations! You won";
        document.getElementById("winner").style.display = "block";
      } else {
        document.getElementById("status").innerText = "Sorry! You lost";
      }
    });
  }, [socket, checkedButtons]);

  function sendBoardData_to_server(index) {
    console.log("sendBoardData_to_server room ID: ", roomID);
    socket.emit("player_move", {
      socket_id: socket.id,
      index: index,
      symbol: symbol,
      roomID: roomID,
    });
  }
  function handleClick(event) {
    var index  =  Number(event.target.id);
    console.log(typeof index);
    var newcheckedButtons = [...checkedButtons];
    newcheckedButtons[index] = true;
    setCheckedButtons(newcheckedButtons);
    document.getElementById(index).innerText = symbol;

    document.getElementById(index).classList.remove("overlay");
    document.getElementById(index).classList.add("overlay");
    document.getElementById(index).style.cursor = "not-allowed";
    document.getElementById(index).disabled = true;

    sendBoardData_to_server(index);
    document.getElementById("status").innerText =
      "Wait for another player to move";
    disableAllButtons();
  }

  function disableAllButtons() {
    for (let index = 0; index < 9; index++) {
      document.getElementById(index).disabled = true;
      document.getElementById(index).classList.remove("square");
      document.getElementById(index).classList.add("overlay");
      document.getElementById(index).style.cursor = "not-allowed";
    }
  }
  function enableAllButtons() {
    for (let index = 0; index < 9; index++) {
      if (!checkedButtons[index]) {
        document.getElementById(index).disabled = false;
        document.getElementById(index).addEventListener("click", handleClick);
        document.getElementById(index).classList.add("square");
        document.getElementById(index).classList.remove("overlay");
        document.getElementById(index).style.cursor = "pointer";
      }
    }
  }

  return (
    <div>
      <div className="info">
        Hii {playerName}, You are in room {roomID}. Your symbol is {symbol}
      </div>
      <div className="gameboard">{squareComponents}</div>
      <div id="status" className="info">
        Waiting for opponent to join the room...
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
