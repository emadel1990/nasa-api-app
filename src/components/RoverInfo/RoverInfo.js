import React from "react";
import "./roverInfo.css";

const RoverInfo = ({ manifest }) => {
  return (
    <div className="information">
      <h2>Useful Information</h2>
      <div className="information-sections">
        <section>
          <p>{`Rover Name: ${manifest.name}`}</p>
          <p>{`Launch date: ${manifest.launch_date}`}</p>
          <p>{`Landing date: ${manifest.landing_date}`}</p>
        </section>
        <section>
          <p>{`Status: ${manifest.status}`}</p>
          <p>{`Max Sol: ${manifest.max_sol}`}</p>
          <p>{`Total photos: ${manifest.total_photos}`}</p>
        </section>
      </div>
    </div>
  );
};

export default RoverInfo;
