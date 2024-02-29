import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

function WsService() {
  return io.connect("http://192.168.1.135:3001");
}

export default WsService;
