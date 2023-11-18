import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const Spinner = () => {
  return (
    <div>
      <div className="d-flex justify-content-center spinner">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
