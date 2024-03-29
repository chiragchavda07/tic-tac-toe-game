import "./App.css";
import Gameboard from "./components/Gameboard";
import PlayerInfo from "./pages/playerInfo";
import WsService from "./services/websocket.service";
import RoomFull from "./pages/roomFull";
import Construction from "./pages/construction";
// import {socket} from "./services/websocket.service";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
function App() {
  const socket = WsService();
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/construction" element={<Construction />} />
          <Route path="*" element={<Navigate to="/construction" />} />
          <Route path="/" element={<Construction />} /> */}

          <Route path="/service" element={<WsService />} />
          <Route path="/gameboard" element={<Gameboard socket={socket} />} />
          <Route path="/" element={<PlayerInfo socket={socket} />} />
          <Route path="*" element={<Navigate to="/service" />} />
          <Route path="/room-full" element={<RoomFull />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
