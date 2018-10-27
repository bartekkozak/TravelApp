import React from "react";

const SpinnerPlane = () => {
  return (
    <div className="plane__spinner">
      <i className="fas fa-plane-departure plane__plane">
        <div className="plane__loading">
          <div />
          <div />
          <div />
          <div />
        </div>
      </i>
    </div>
  );
};

export default SpinnerPlane;
