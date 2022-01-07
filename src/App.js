import React, { useState, useEffect } from "react";
import "./App.css";
import "materialize-css";

import MRoverList from "./components/MRoverList/MRoverList";
import SelectRover from "./components/SelectRover/SelectRover";
import { getNasaPhotos } from "./services/getNasaPhotos";
import { getNasaManifest } from "./services/getNasaManifest";

const App = () => {
  const [marsPhotos, setMarsPhotos] = useState([]);
  const [selected, setSelected] = useState("curiosity");
  const [manifest, setManifest] = useState({});
  const [camera, setCamera] = useState([]);
  const [filteredCamera, setFilteredCamera] = useState([]);
  const [page, setPage] = useState(1);
  const [sol, setSol] = useState(0);

  useEffect(() => {
    Promise.allSettled([
      getNasaManifest(selected),
      getNasaPhotos(selected, page, sol),
    ]).then((data) => {
      const [
        {
          value: { photo_manifest: manifest },
        },
        { value: photos },
      ] = data;
      setManifest(manifest);
      setMarsPhotos(photos);
      setTimeout(() => {
        if (manifest.photos?.length > 0) {
          const cameras = manifest?.photos.filter((photo) => photo.sol === sol);
          if (cameras[0] !== undefined) {
            setCamera(cameras[0].cameras);
          }
        }
      }, 1000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, page, sol]);

  return (
    <div className="app">
      <SelectRover
        setSelected={setSelected}
        setPage={setPage}
        sol={sol}
        setSol={setSol}
        camera={camera}
        setFilteredCamera={setFilteredCamera}
      />
      {marsPhotos?.photos ? (
        <MRoverList
          marsPhotos={marsPhotos}
          manifest={manifest}
          page={page}
          setPage={setPage}
          sol={sol}
          setSol={setSol}
          filteredCamera={filteredCamera}
        />
      ) : null}
    </div>
  );
};

export default App;
