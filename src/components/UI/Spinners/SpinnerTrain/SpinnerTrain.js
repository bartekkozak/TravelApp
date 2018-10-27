import React from "react";

const SpinnerTrain = () => {
  return (
    <div className="train__spinner">
      <i className="fas fa-subway train__train">
        <div className="train__loading">
          <div />
          <div />
          <div />
          <div />
        </div>
      </i>
    </div>
  );
};

export default SpinnerTrain;
