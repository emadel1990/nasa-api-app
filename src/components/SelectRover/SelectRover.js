import React, { useState, useEffect } from "react";
import "./selectRover.css";
import "materialize-css";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const optionsRovers = [
  { value: "curiosity", label: "Curiosity" },
  { value: "opportunity", label: "Opportunity" },
  { value: "spirit", label: "Spirit" },
];

const SelectRover = ({
  setSelected,
  setPage,
  sol,
  setSol,
  camera,
  setFilteredCamera,
}) => {
  const [arrx, setArr] = useState({});

  useEffect(() => {
    setFilteredCamera(arrx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrx]);

  const optionsCameras = camera?.map((cam) => ({
    value: cam,
    label: cam,
  }));

  return (
    <div className="selectRover">
      <ReactSelect
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={optionsRovers[0]}
        options={optionsRovers}
        onChange={(e) => {
          setSelected(e.value);
          setPage(1);
          setSol(0);
        }}
      ></ReactSelect>
      <ReactSelect
        className="filteredCamera"
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={optionsCameras}
        onChange={(e) => {
          setArr(e);
          setPage(1);
        }}
      ></ReactSelect>
    </div>
  );
};

export default SelectRover;
