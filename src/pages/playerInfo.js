import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/playerInfo.css"; // Import the CSS file for styling
import App from "../App";
function PlayerInfo(props) {
  const { socket } = props;
  const navigate = useNavigate();

  const [playerName, setPlayerName] = useState("");
  const [roomID, setRoomID] = useState("");
  const [symbol, setSym] = useState("");

  const handleYourSymbol = (data) => {
    console.log(typeof data);
    // Use the updated state directly here
    console.log(data);
    const userInfo = {
      playerName,
      roomID,
      symbol: data,
    };

    navigate("/gameboard", {
      state: { params: userInfo },
    });
  };

  useEffect(() => {
    const handleRoomFull = () => {
      console.log("Room full");
      navigate("/room-full");
    };

    socket.on("room_full", handleRoomFull);

    return () => {
      // Clean up event listeners
      socket.off("room_full", handleRoomFull);
    };
  }, [socket, navigate]);

  const joinRoom = () => {
    if (playerName.trim() !== "" && roomID.trim() !== "") {
      socket.emit("join_room", roomID);
      socket.on("your_symbol", handleYourSymbol);
    }
  };

  return (
    <div className="player-info-container">
      <h1>Player Info</h1>
      <h2>Enter your details</h2>
      <input
        className="info-input"
        placeholder="Enter player name"
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <input
        className="info-input"
        placeholder="Enter room ID"
        onChange={(e) => setRoomID(e.target.value)}
      />
      <button className="start-button" onClick={joinRoom}>
        Start
      </button>
    </div>
  );
}

export default PlayerInfo;
