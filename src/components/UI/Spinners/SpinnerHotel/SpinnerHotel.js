import React from "react";

const SpinnerHotel = () => {
  return (
    <div className="hotel__spinner">
      <i className="fas fa-hotel hotel__hotel">
        <div className="hotel__loading">
          <div />
          <div />
          <div />
          <div />
        </div>
      </i>
    </div>
  );
};

export default SpinnerHotel;
