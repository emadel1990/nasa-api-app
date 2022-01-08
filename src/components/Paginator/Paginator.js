import React, { useState, useEffect } from "react";
import "./paginator.css";
import { TextInput } from "react-materialize";

const Paginator = ({
  sol,
  manifest,
  pageSolComponent,
  debouncePageChange,
  setpageSolComponent,
}) => {
  const [counterSol, setCounterSol] = useState(0);
  const [maxSol, setMaxSol] = useState(0);
  const [errorSol, setErrorSol] = useState(false);

  useEffect(() => {
    setMaxSol(manifest.max_sol);
  }, [manifest]);

  useEffect(() => {
    debouncePageChange(counterSol);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counterSol]);

  const minSol = () => {
    if (counterSol > 0) {
      const newsol = counterSol - 1;
      setCounterSol(newsol);
      return;
    }
  };
  const sumSol = () => {
    console.log(counterSol);
    if (counterSol <= maxSol) {
      const newsol = counterSol + 1;
      setCounterSol(newsol);
      return;
    }
  };

  const handleSolSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value <= maxSol) {
      debouncePageChange(parseInt(e.target[0].value));
      setCounterSol(parseInt(e.target[0].value));
      e.target[0].value = "";
      setErrorSol(false);
    } else {
      setErrorSol(true);
    }
  };
  return (
    <div className="paginator">
      <div className="sol-information">
        <h1>Sol {counterSol}</h1>
      </div>
      <form onSubmit={handleSolSubmit}>
        <TextInput
          className="solInput"
          id="TextInput-31"
          label="Select a custom Sol"
          type="number"
        />
        {errorSol ? <p className="error">{`Max number is ${maxSol}`}</p> : null}
      </form>
      <div>
        <button className="solButton" onClick={minSol}>
          Prev
        </button>
        <button className="solButton" onClick={sumSol}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Paginator;
