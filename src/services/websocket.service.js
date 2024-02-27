import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

function WsService() {
  return io.connect("http://localhost:3001");
}

export default WsService;
