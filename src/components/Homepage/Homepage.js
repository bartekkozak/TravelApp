import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const Homepage = props => {
  return (
    <div>
      HOMEPAGE
      <Link to="/flights">
        <Button color="primary">go to flights</Button>
      </Link>
    </div>
  );
};

export default Homepage;
