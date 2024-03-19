import io from "socket.io-client";

function WsService() {
  return io.connect("https://spontaneous-rhea-daiict.koyeb.app/");
}

export default WsService;
