import "./App.css";
import { useEffect, useState } from "react";
import Gameboard from "./components/Gameboard";
import PlayerInfo from "./pages/playerInfo";
import WsService from "./services/websocket.service";
import RoomFull from "./pages/roomFull";
import io from "socket.io-client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
function App() {
  const socket = io.connect("http://localhost:3001");
  // const [socket, setSocket] = useState(io.connect("http://localhost:3001"));
  // const [message, setMessage] = useState("");
  // const [receivedMessage, setReceivedMessage] = useState([]);
  // const sendMessage = () => {
  //   socket.emit("send_message", { message });
  //   setMessage("");
  // };
  // useEffect(() => {
  //   socket.on("received_message", (data) => {
  //     setReceivedMessage((prevMessages) => [...prevMessages, data.message]);
  //   });

  //   return () => {
  //     // Clean up the event listener when the component unmounts
  //     socket.off("received_message");
  //   };
  // }, [socket]);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/service" element={<WsService />} />
          <Route path="/gameboard" element={<Gameboard socket={socket} />} />
          <Route path="/" element={<PlayerInfo socket={socket} />} />
          <Route path="*" element={<Navigate to="/service" />} />
          <Route path="/room-full" element={<RoomFull/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
