import React from "react";
import "../styles/playerInfo.css"; // Import the CSS file for styling
import App from "../App";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function PlayerInfo(props) {
  const socket = props.socket;
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  const [roomID, setRoomID] = useState("");
  const [sym, setSym] = useState("");
 socket.emit("join_room", roomID);
 socket.emit("send_message", "hiii there");
 socket.on("your_symbol", (data) => {
   console.log(data);
   setSym(data);
 });
 socket.on("room_full", () => {
   console.log("room full");
   navigate("/room-full");
 });
  const userInfo = {
    playerName: playerName,
    roomID: roomID,
    sym: sym,
  };
  const joinRoom = () => {
    if (playerName !== "" && roomID !== "") {
      navigate("/gameboard", {
        state: { params: userInfo },
      });
    }
  };
  return (
    <div className="player-info-container">
      <h1>Player Info</h1>
      <h2>Enter your details</h2>
      <input
        className="info-input"
        placeholder="Enter player name"
        onChange={(e) => {
          setPlayerName(e.target.value);
        }}
      />
      <input
        className="info-input"
        placeholder="Enter room ID"
        onChange={(e) => {
          setRoomID(e.target.value);
        }}
      />
      <button className="start-button" onClick={joinRoom}>
        Start
      </button>
    </div>
  );
}

export default PlayerInfo;
