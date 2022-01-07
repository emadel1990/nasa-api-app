import React from "react";
import "./mrover.css";
import "materialize-css";

const Mrover = ({ photo }) => {
  return (
    <div className="cardPhoto">
      <p>{`Camera ${photo.camera.name}`}</p>
      <img
        className="roverImg"
        src={photo.img_src}
        alt={photo.rover.name}
      ></img>
    </div>
  );
};

export default Mrover;
