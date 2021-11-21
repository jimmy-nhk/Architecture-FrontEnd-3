import React from "react";
import "./style.css";

function MainBackground() {
  return (
    <div>
      <div style={{backgroundImage: "url(/images/engineering.jpg)"}} className="main-background-container">
        <div className="overlay"></div>
        <div className="text-container" data-aos="fade-down">
        <h2>Enginneering</h2>
          <p>The most innovative minds</p>
          
        </div>
      </div>
      
    </div>
  );
}

export default MainBackground;
