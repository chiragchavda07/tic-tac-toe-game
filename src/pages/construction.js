// import react from "react";
import "../styles/construction.css";
import img from "../assets/IMG_9258.jpg";
function Construction() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    height: "100vh",
  };

  const divStyle1 = {
    color: "black",
    height: "100%",
    marginTop: "100px",
    fontFamily: "cursive",
    fontSize: "50px",
  };

  return (
    <div style={containerStyle}>
      <div style={divStyle1}>Under construction</div>
      <div class="loader">
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
        <div class="loader-square"></div>
      </div>
      <div style={{ height: "500px", marginTop: "100px"  }}>
        <img
          src={img}
          style={{ height: "100%", backdropFilter: "blur(100px)" }}
        />
      </div>
    </div>
  );
}

export default Construction;
