// import react from "react";
import "../styles/construction.css";
import img from "../assets/IMG_9258.jpg";
function Construction() {
  return (
    <div className="containerStyle">
      <div
        style={{
          height: "1000px",
          marginTop: "50px",
          objectFit: "cover",
          filter: "blur(2px)",
        }}
      >
        <img src={img} style={{ height: "100%" }} />
      </div>
      <div className="divstyle1">Under construction</div>
      <div class="loader loaderstyle">
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
      </div>
    </div>
  );
}

export default Construction;
