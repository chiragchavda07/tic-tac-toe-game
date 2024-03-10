// import react from "react";
import "../styles/construction.css";
function Construction() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const divStyle1 = {
    color: "white",
    height: "100%",
    marginTop: "100px",
    fontFamily: "cursive",
    fontSize: "50px",
  };

  return (
    <div style={containerStyle}>
      <div style={divStyle1}>Under construction</div>
      {/* <div style={divStyle2}>Coming soon...</div> */}
      <div class="loader">
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
