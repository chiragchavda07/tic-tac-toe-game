import io from "socket.io-client";

function WsService() {
  // return io.connect("https://tic-tac-toe-server-rouge.vercel.app/");
  // return io.connect("http://localhost:3000");
  return io.connect("https://spontaneous-rhea-daiict.koyeb.app/");
}

export default WsService;
